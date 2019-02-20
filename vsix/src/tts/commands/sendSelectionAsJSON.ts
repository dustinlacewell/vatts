import * as vscode from 'vscode';

import * as ttsapi from '../../tts/api';
import * as utils from '../../utils';

async function sendSelectionAsJSON() {

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        utils.showInfo('No buffer is currently open.');
        return;
    }

    const text = utils.selectionText(editor);

    try {
        JSON.parse(text);
    } catch (e) {
        utils.showInfo(`Couldn't parse selection content as JSON:\n${e.message}`);
        return;
    }

    try {
        return ttsapi.sendCustomMessage(text);
    } catch (e) {
        utils.showError(`Couldn't send JSON to TTS:\n${e.message}`);
    }
}

export default sendSelectionAsJSON;