import * as fs from 'fs';
import * as path from 'path';

import * as rimraf from 'rimraf';

import * as utils from '../../utils';

async function cleanBundles() {
    const workspace_root = utils.getWorkspaceRoot();

    if (!workspace_root) {
        utils.showWarn('No workspace is open.');
        return;
    }

    const output_dir = utils.getConfig<string>('vatts.bundler', 'output-dir');

    if (!output_dir) {
        utils.showWarn('No bundle output path configured: vatts.bundler.output-dir');
        return;
    }

    const full_path = path.join(workspace_root, output_dir);

    if (fs.existsSync(full_path)) {
        rimraf.sync(full_path);
        utils.showWarn(`Deleted: ${full_path}`);
    } else {
        utils.showWarn(`Nothing to delete: ${full_path}`);
    }
}

export default cleanBundles;