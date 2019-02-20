import * as vscode from 'vscode';

import * as utils from '../../utils';
import * as mapping from '../mapping';

async function showOriginal() {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
        utils.showWarn('No document is open.');
        return;
    }

    const line = editor.selection.active.line;
    const scan = mapping.scanForMatch(editor, line);

    if (scan === undefined) {
        utils.showError('Line is part of bundle boilerplate.');
    } else {
        editor = await utils.showFile(scan[0]);
        await utils.revealLine(editor, scan[1]);
    }
}

export default showOriginal;