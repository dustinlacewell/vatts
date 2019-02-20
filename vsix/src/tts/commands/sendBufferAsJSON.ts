import * as vscode from 'vscode';

import * as ttsapi from '../../tts/api';
import * as utils from '../../utils';

async function sendBufferAsJSON() {

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        utils.showInfo('No buffer is currently open.');
        return;
    }

    let text: string;

    try {
        text = editor.document.getText();
        JSON.parse(text);
    } catch (e) {
        utils.showInfo(`Couldn't parse buffer content as JSON:\n${e.message}`);
        return;
    }

    try {
        return ttsapi.sendCustomMessage(text);
    } catch (e) {
        utils.showError(`Couldn't send JSON to TTS:\n${e.message}`);
    }
}

export default sendBufferAsJSON;