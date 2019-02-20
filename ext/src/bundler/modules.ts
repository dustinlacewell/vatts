import * as fs from 'fs';
import * as path from 'path';

function scanLiterals(line: string): string[] {
    const literals: string[] = [];
    const regexp = new RegExp(/[=\s]*require\s*[(\s]['"]([^'"]+)/, 'g');
    const results = regexp.exec(line) || [];

    for (let _i = 1; _i < results.length; _i += 2) {
        const lit = results[_i];
        console.log(`Found lit: ${lit}`);
        literals.push(lit);
    }
    return literals;
}

function scan(target_module: Module): string[] {
    let reqs: string[] = [];
    const lines = target_module.text.split('\n');
    for (const line of lines) {
        reqs = reqs.concat(scanLiterals(line));
    }
    return reqs;
}

export class Module {
    filename: string;
    safename: string;
    dirname: string;
    requires: string[];
    dependencies: Map<string, string>;

    constructor(filename: string) {
        this.filename = filename;
        this.safename = this.filename.replace(/\\/g, '/');
        this.dirname = path.dirname(filename);
        this.requires = scan(this);
        this.dependencies = new Map<string, string>();
    }

    get text(): string {
        const lines = fs.readFileSync(this.filename, 'utf-8').split("\n").filter(l =>
            l.search(/Perryvw\/TypescriptToLua/) == -1
        );

        return lines.join("\n");
    }
}