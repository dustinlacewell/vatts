import * as utils from '../../utils';

async function bundleUpdate() {
    await utils.executeCommand('bundler.bundle');
    await utils.executeCommand('tts.updateGame');
}

export default bundleUpdate;