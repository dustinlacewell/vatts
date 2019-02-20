import * as vscode from 'vscode';

import * as utils from '../../utils';
import * as ttsapi from '../api';

async function evaluateSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.selection.isEmpty) {
        utils.showError('The selection is empty.');
        return;
    }

    const code = utils.selectionText(editor);
    try {
        await ttsapi.evaluateLua(code);
        utils.showInfo('Sent selection as Lua to TTS.');
    } catch (e) {
        utils.showError(e.message);
    }

}

export default evaluateSelection;