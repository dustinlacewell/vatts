import * as fs from 'fs';
import * as path from 'path';

import * as utils from '../utils';
import * as modules from './modules';
import * as templating from './templating';

export class Bundle {
    entrypoint: string;
    paths: string[];
    extensions: string[];
    modules: Map<string, modules.Module>;

    constructor(entrypoint: string, paths?: string[], extensions = ['lua']) {
        this.entrypoint = path.resolve(entrypoint);
        this.paths = this.setupPaths(paths || []);
        this.extensions = extensions;
        this.modules = new Map<string, modules.Module> ();
        this.bundle();
    }

    render(debug = false) {
        return templating.render({
            modules: this.modules,
            entrypoint: this.entrypoint.replace(/\\/g, '/'),
            debug: debug
        });
    }

    private setupPaths(paths: string[]) {
        // add the path of the entrypoint file
        return [path.dirname(this.entrypoint)]
            .concat(paths)
            .map(utils.expandPath);
    }

    private checkFile(current_module: modules.Module, requirement: string, file: string) {
        if (file === current_module.filename) {
            console.warn(`Module "${file}" imports itself.`);
        }

        if (!fs.existsSync(file)) {
            return;
        }

        current_module.dependencies.set(requirement, file);

        if (!this.modules.has(file)) {
            const newmod = this.bundleFilename(file);
            current_module.dependencies.set(requirement, newmod.safename);
        } else {
            const depmod = this.modules.get(file);
            if (depmod) {
                current_module.dependencies.set(requirement, depmod.safename);
            }
        }
    }

    private checkPath(current_module: modules.Module, requirement: string, _path: string) {
        const requirement_path = requirement.replace(/\./g, path.sep);
        const fullpath = path.join(_path, requirement_path);

        for (const extension of this.extensions) {
            const filename = `${fullpath}.${extension}`;
            this.checkFile(current_module, requirement, filename);
            if (current_module.dependencies.has(requirement)) {
                break;
            }
        }
    }

    private resolveRequirement(current_module: modules.Module, paths: string[], requirement: string) {
        console.log(`Resolving requirement: ${requirement}`);
        for (const p of paths) {
            this.checkPath(current_module, requirement, p);
            if (current_module.dependencies.has(requirement)) {
                break;
            }
        }
    }

    private resolveModule(current_module: modules.Module) {
        console.log(`Resolving module: ${current_module.filename}`);
        const paths = [current_module.dirname, path.join(current_module.dirname, '..')].concat(this.paths);
        for (const requirement of current_module.requires) {
            this.resolveRequirement(current_module, paths, requirement);
            if (!current_module.dependencies.has(requirement)) {
                console.error(`Couldn't find "${requirement}" in ${current_module.filename}`);
            }
        }
    }

    private bundleFilename(filename: string) {
        console.log(`Bundling ${filename}`);
        const current_module = new modules.Module(path.resolve(filename));
        this.modules.set(filename, current_module);
        this.resolveModule(current_module);
        return current_module;
    }

    private bundle() {
        this.bundleFilename(this.entrypoint);
    }
}

function bundleFilename(output_path: string, filename: string) {
    const dirname = path.dirname(filename);
    const basename = path.basename(dirname);
    return path.join(output_path, `${basename}.ttslua`);
}

export function bundle(root: string, output_path: string, filename: string, paths?: string[], debug = false) {
    process.chdir(root);

    const new_bundle = new Bundle(filename, paths);
    const bundle_filename = bundleFilename(output_path, filename);
    const full_path = path.resolve(bundle_filename);

    utils.ensureDir(path.dirname(bundle_filename));

    if (full_path) {
        fs.writeFileSync(full_path, new_bundle.render(debug));
        if (fs.existsSync(full_path)) {
            return utils.showFile(full_path);
        }
    }
    return Promise.reject('Couldn\'t create bundle.');
}
