import * as fs from 'fs';
import * as path from 'path';

import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

import * as utils from '../utils';

export function getCompilerOptions(rootDir: string, outDir: string): tstl.CompilerOptions {
    return {
        rootDir: rootDir,
        outDir: outDir,
        luaLibImport: tstl.LuaLibImportKind.Inline,
        luaTarget: tstl.LuaTarget.Lua52,
        typeRoots: ['node_modules/@types']
    };
}

function makeLuaPath(pathname: string) {
    return utils.noExt(pathname)
        .replace(/^\\/, '')
        .replace(/\\/g, '.');
}

function makeBootloaderPath(root: string, target: string) {
    const relative_path = utils.unresolvePath(root, target);
    return makeLuaPath(relative_path);
}

function emitBootloader(root: string, dest: string, target: string) {
    const target_filename = path.join(root, dest, 'index.lua');
    const require_path = makeBootloaderPath(root, target);
    const bootloader = `require("lualib_bundle")\nrequire("${require_path}")`;
    fs.writeFileSync(target_filename, bootloader);
}

function makeProgram(root: string, dest: string, file: string) {
    const options = getCompilerOptions(root, dest);
    return ts.createProgram([file], options);
}

function emitSourceFile(options: ts.CompilerOptions, filename: string, content: string): void {
    if (options.rootDir && options.outDir && options.outDir !== options.rootDir) {
        const relativeSourcePath = path.resolve(filename).replace(path.resolve(options.rootDir), "");
        filename = path.join(options.outDir, relativeSourcePath);
    }

    // change extension or rename to outFile
    if (options.outFile && path.isAbsolute(options.outFile)) {
            filename = options.outFile;
    } else if (options.outFile && options.outDir) {
        // append to workingDir or outDir
        filename = path.resolve(options.outDir, options.outFile);
    } else {
        const filenameLua = path.basename(filename, path.extname(filename)) + ".lua";
        filename = path.join(path.dirname(filename), filenameLua);
    }

    // Write output
    ts.sys.writeFile(filename, content);
}

export async function compile(root: string, dest: string, file: string) {
    process.chdir(root);

    const guid = utils.basenameNoExt(file);
    const full_dest = path.join(dest, guid);
    const program = makeProgram(root, full_dest, file);
    const options = program.getCompilerOptions();
    const transpiler = new tstl.LuaTranspiler(program);
    const files = program.getSourceFiles();

    utils.ensureDir(full_dest);
    transpiler.emitLuaLib();
    emitBootloader(root, full_dest, file);

    for (const file of files) {
        if (!file.isDeclarationFile) {
            try {
                const lua = transpiler.transpileSourceFile(file);
                emitSourceFile(options, file.fileName, lua);
            } catch (exception) {
                /* istanbul ignore else: Testing else part would require to add a bug/exception to our code */
                if (exception.node) {
                    const pos = ts.getLineAndCharacterOfPosition(file, exception.node.pos);
                    // Graciously handle transpilation errors
                    return utils.showJumpableError(file.fileName, pos.line, pos.character, exception.stack)
                } else {
                    throw exception;
                }
            }
        }
    }
}
