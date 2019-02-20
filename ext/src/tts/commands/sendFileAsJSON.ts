import * as fs from 'fs';

import * as ttsapi from '../../tts/api';
import * as utils from '../../utils';

async function sendFileAsJSON() {

    const files = await utils.selectFile({JSON: ['json']});

    if (!files) { return; }

    try {
        const path = files[0].fsPath;
        const text = fs.readFileSync(path, 'utf-8');
        return ttsapi.sendCustomMessage(text);
    } catch (e) {
        return utils.showError(e.message);
    }
}

export default sendFileAsJSON;