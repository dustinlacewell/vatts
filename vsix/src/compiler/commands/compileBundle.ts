import * as utils from '../../utils';

async function compileBundle() {
    await utils.executeCommand('compiler.compile');
    await utils.executeCommand('bundler.bundle');
}

export default compileBundle;