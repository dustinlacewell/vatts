import * as fs from 'fs';

import * as ttsapi from '../../tts/api';
import * as utils from '../../utils';

async function evalFileAsLua() {

    const files = await utils.selectFile({Lua: ['lua']});

    if (!files) { return; }

    try {
        const path = files[0].fsPath;
        const text = fs.readFileSync(path, 'utf-8');
        return ttsapi.evaluateLua(text);
    } catch (e) {
        return utils.showError(e.message);
    }
}

export default evalFileAsLua;