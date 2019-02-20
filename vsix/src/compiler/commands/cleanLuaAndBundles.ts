import * as utils from '../../utils';

async function cleanLua() {
    await utils.executeCommand('compiler.cleanLua');
    await utils.executeCommand('bundler.cleanBundles');
}

export default cleanLua;