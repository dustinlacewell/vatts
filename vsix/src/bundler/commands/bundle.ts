import * as utils from '../../utils';
import * as bundling from '../bundling';

async function bundle(debug = false) {
    const root_dir = utils.getWorkspaceRoot();
    const input_files = utils.getConfig<string[]>('vatts.bundler', 'input-files') || [];
    const search_paths = utils.getConfig<string[]>('vatts.bundler', 'search-dirs') || [];
    const output_dir = utils.getConfig<string>('vatts.bundler', 'output-dir');

    if (!root_dir) {
        utils.showWarn('Compilation requires an open workspace.');
        return;
    }

    if (!output_dir) {
        utils.showError('No configured output dir: vatts.bundler.output-dir');
        return;
    }

    if (!input_files) {
        utils.showError('No configured input files: vatts.bundler.input-files');
        return;
    }

    for (const file of input_files) {
        await bundling.bundle(root_dir, output_dir, file, search_paths, debug);
    }

    utils.showInfo(`Finished bundling!`);
}

export default bundle;
