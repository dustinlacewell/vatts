import * as utils from '../../utils';
import * as compilation from '../compilation';

async function compile() {
    const workspace_root = utils.getWorkspaceRoot();
    const output_path = utils.getConfig<string>('vatts.compiler', 'output-dir');
    const input_files = utils.getConfig<string[]>('vatts.compiler', 'input-files');

    if (!workspace_root) {
        utils.showWarn('Compilation requires an open workspace.');
        return;
    }

    if (!output_path) {
        utils.showError(`No configured output path: vatts.compiler.output-dir`);
        return;
    }

    if (!input_files) {
        utils.showError(`No configured input files: vatts.compiler.input-files`);
        return;
    }

    for (const filename of input_files) {
        compilation.compile(workspace_root, output_path, filename);
    }

    utils.showInfo('Compilation finished.');
}

export default compile;