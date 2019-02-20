import * as vscode from 'vscode';

import * as ttsapi from '../../tts/api';
import * as utils from '../../utils';

async function evalBufferAsLua() {

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        utils.showInfo('No buffer is currently open.');
        return;
    }

    if (editor.document.languageId !== 'lua') {
        utils.showWarn('Warning: Buffer language is not Lua.');
    }

    let text = editor.document.getText();

    if (!text) {
        utils.showWarn('There is no text in the current buffer.');
        return
    }

    try {
        return ttsapi.evaluateLua(text);
    } catch (e) {
        utils.showError(`Couldn't send Lua to TTS:\n${e.message}`);
    }
}

export default evalBufferAsLua;