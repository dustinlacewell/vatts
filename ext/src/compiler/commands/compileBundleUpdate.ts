import * as utils from '../../utils';

async function compileBundleUpdate() {
    await utils.executeCommand('compiler.compile');
    await utils.executeCommand('bundler.bundle');
    await utils.executeCommand('tts.updateGame');
}

export default compileBundleUpdate;