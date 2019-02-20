import * as fs from 'fs';
import * as path from 'path';

import rimraf = require('rimraf');

import * as utils from '../../utils';

async function cleanLua() {
    const workspace_root = utils.getWorkspaceRoot();

    if (!workspace_root) {
        utils.showWarn('No workspace is open.');
        return;
    }

    const output_dir = utils.getConfig<string>('vatts.compiler', 'output-dir');

    if (!output_dir) {
        utils.showWarn('No lua output path configured: vatts.compiler.output-dir');
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

export default cleanLua;