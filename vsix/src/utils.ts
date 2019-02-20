import * as fs from 'fs';
import * as path from 'path';

import * as mkdirp from 'mkdirp';
import * as vscode from 'vscode';

export function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}

export function ensureFile(filename: string) {
    if (!fs.existsSync(filename)) {
        ensureDir(path.dirname(filename));
        fs.openSync(filename, 'w');
    }
}

export function noExt(filename: string) {
    const extname = path.extname(filename);
    return filename.slice(0, -extname.length);
}

export function basenameNoExt(filename: string) {
    const basename = path.basename(filename);
    return noExt(basename);
}

export function replaceExt(filename: string) {
    const lua_filename = path.basename(filename, `${path.extname(filename)}.lua`);
    return path.join(path.dirname(filename), lua_filename);
}

export function getHomeDir() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

export function expandHomeDir(dir: string): string {
    const homedir = getHomeDir();
    if (!homedir) {
        throw Error('Couldn\'t find home directory.');
    }
    if (!dir) { return dir; }
    if (dir === '~') { return homedir; }
    if (dir.slice(0, 2) !== '~/') { return dir; }
    return path.join(homedir, dir.slice(2));
}

export function getWorkspaceRoot() {
    const workspace_folders = vscode.workspace.workspaceFolders;

    if (!workspace_folders) {
        return;
    }
    return workspace_folders[0].uri.fsPath;
}

export function makeWorkspacePath(filename: string) {
    const workspace_root = getWorkspaceRoot();
    if (!workspace_root) {
        return filename;
    }
    return path.join(workspace_root, filename);
}

export function showInfo(msg: string, ...actions: string[]) {
    return vscode.window.showInformationMessage(msg, ...actions);
}

export function showWarn(msg: string, ...actions: string[]) {
    return vscode.window.showWarningMessage(msg, ...actions);
}

export function showError(msg: string, ...actions: string[]) {
    return vscode.window.showErrorMessage(msg, ...actions);
}

export async function showJumpableError(filename: string, line: number, column: number, stack: any) {
    const message = `${filename} (${line},${column})\n${stack}`;
    console.error(message);
    const choice = await showError(message, 'Jump to Error');
    if (choice != 'Jump to Error') {
        return;
    }
    const editor = await showFile(filename);
    await revealLine(editor, line);
}

export function getConfig<T>(section: string, attribute: string) {
    return vscode.workspace.getConfiguration(section).get<T>(attribute);
}

type CommandHandler = (ctx: vscode.ExtensionContext) => any;

export function registerCommand(context: vscode.ExtensionContext, slot: string, callable: CommandHandler) {
    const disposable = vscode.commands.registerCommand(slot, () => callable(context));
    context.subscriptions.push(disposable);
}

export function executeCommand(name: string, ...rest: any[]) {
    return vscode.commands.executeCommand(`vatts.${name}`, ...rest);
}

export async function showUri(uri: vscode.Uri) {
    const document = await vscode.workspace.openTextDocument(uri);
    return vscode.window.showTextDocument(document, 1, false);
}

export function showFile(filename: string) {
    ensureFile(filename);
    const uri = vscode.Uri.file(filename);
    return showUri(uri);
}

export async function setText(editor: vscode.TextEditor, text: string) {
    const last_line = editor.document.lineCount;
    const first = new vscode.Position(0, 0);
    const last = new vscode.Position(last_line, 9999);
    const selection = new vscode.Selection(first, last);
    return editor.edit(edit => {
        edit.delete(selection);
        edit.insert(new vscode.Position(0, 0), text);
        return editor;
    });
}

export function positionsForLine(lineno: number) {
    return [
        new vscode.Position(lineno, 0),
        new vscode.Position(lineno, 999999)
    ];
}

export function selectionForLine(lineno: number) {
    const [start, end] = positionsForLine(lineno);
    return new vscode.Selection(start, end);
}

export function rangeForLine(lineno: number) {
    const [start, end] = positionsForLine(lineno);
    return new vscode.Range(start, end);
}

export function getLineText(editor: vscode.TextEditor, lineno: number) {
    const range = rangeForLine(lineno);
    return editor.document.getText(range);
}

export async function revealLine(editor: vscode.TextEditor, lineno: number) {
    editor.selection = selectionForLine(lineno);
    editor.revealRange(rangeForLine(lineno),
                       vscode.TextEditorRevealType.InCenter);
}

export function selectionText(editor: vscode.TextEditor) {
    const range = new vscode.Range(
        editor.selection.start,
        editor.selection.end);
    return editor.document.getText(range);
}

export function selectFile(filters?: { [name: string]: string[] }) {
    return vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: filters
    });
}

export function unresolvePath(root: string, pathname: string) {
    const abs_root = path.resolve(root);
    const abs_pathname = path.resolve(pathname);
    return abs_pathname.replace(abs_root, '');
}

export function expandPath(pathname: string) {
    return path.resolve(expandHomeDir(pathname));
}