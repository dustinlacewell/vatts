import * as vscode from 'vscode';

import * as utils from './utils';

import cleanLua from './compiler/commands/cleanLua';
import cleanLuaAndBundles from './compiler/commands/cleanLuaAndBundles';
import compile from './compiler/commands/compile';
import compileBundle from './compiler/commands/compileBundle';
import compileBundleUpdate from './compiler/commands/compileBundleUpdate';

import bundle from './bundler/commands/bundle';
import bundleUpdate from './bundler/commands/bundleUpdate';
import cleanBundles from './bundler/commands/cleanBundles';
import showOriginal from './bundler/commands/showOriginal';

import evalBufferAsLua from './tts/commands/evalBufferAsLua';
import evalFileAsLua from './tts/commands/evalFileAsLua';
import evalSelectionAsLua from './tts/commands/evalSelectionAsLua';
import sendBufferAsJSON from './tts/commands/sendBufferAsJSON';
import sendFileAsJSON from './tts/commands/sendFileAsJSON';
import sendSelectionAsJSON from './tts/commands/sendSelectionAsJSON';
import startServer from './tts/commands/startServer';
import stopServer from './tts/commands/stopServer';
import updateGame from './tts/commands/updateGame';

export function activate(context: vscode.ExtensionContext) {
    const commands: [string, any][] = [
        ['vatts.compiler.cleanLua', cleanLua],
        ['vatts.compiler.cleanLuaAndBundles', cleanLuaAndBundles],
        ['vatts.compiler.compile', compile],
        ['vatts.compiler.compileBundle', compileBundle],
        ['vatts.compiler.compileBundleUpdate', compileBundleUpdate],

        ['vatts.bundler.bundle', bundle],
        ['vatts.bundler.bundleUpdate', bundleUpdate],
        ['vatts.bundler.cleanBundles', cleanBundles],
        ['vatts.bundler.showOriginal', showOriginal],

        ['vatts.tts.evalBufferAsLua', evalBufferAsLua],
        ['vatts.tts.evalFileAsLua', evalFileAsLua],
        ['vatts.tts.evalSelectionAsLua', evalSelectionAsLua],
        ['vatts.tts.sendBufferAsJSON', sendBufferAsJSON],
        ['vatts.tts.sendFileAsJSON', sendFileAsJSON],
        ['vatts.tts.sendSelectionAsJSON', sendSelectionAsJSON],
        ['vatts.tts.startServer', startServer],
        ['vatts.tts.stopServer', stopServer],
        ['vatts.tts.updateGame', updateGame]
    ];

    commands.forEach(ele => {
        utils.registerCommand(context, ele[0], ele[1]);
    });

    if (utils.getConfig<Boolean>('vatts.tts', 'auto-listen')) {
        vscode.commands.executeCommand('vatts.tts.startServer');
    }
}

export function deactivate() {
    vscode.commands.executeCommand('vatts.tts.stopServer');
}