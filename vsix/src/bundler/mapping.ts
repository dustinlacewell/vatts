import { TextEditor } from 'vscode';

import * as utils from '../utils';

function getStartAndEndMarkers(): [string, string] {
    return [
        utils.getConfig<string>('vatts.bundler', 'module-start-marker') || '',
        utils.getConfig<string>('vatts.bundler', 'module-end-marker') || ''
    ];
}

function matchLine(text: string) {
    const [start_marker, end_marker] = getStartAndEndMarkers();
    const start_match = text.match(start_marker);
    const end_match = text.match(end_marker);
    return [start_match, end_match];
}

export function scanForMatch(editor: TextEditor, line: number): [string, number] | undefined {
    let current_line = line;
    while (true) {
        const line_text = utils.getLineText(editor, current_line);
        const [start_match, end_match] = matchLine(line_text);

        if (end_match || (start_match && current_line === line || current_line <= 0)) {
            return;
        }

        if (start_match) {
            return [start_match[1], line - current_line - 1];
        }

        current_line -= 1;
    }
}