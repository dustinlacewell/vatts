import * as fs from 'fs';
import * as net from 'net';
import * as ps from 'promise-socket';
import { ExtensionContext } from 'vscode';

import * as utils from '../utils';

export async function sendMessage(text: string) {
    const port = 39999;
    const host = 'localhost';
    const socket = new net.Socket();
    const psocket = new ps.PromiseSocket(socket);

    await psocket.connect(port, host);
    await psocket.write(text);
}

export function updateGame(mapping: {[key: string]: string}) {
    const workspace_root = utils.getWorkspaceRoot();

    if (!workspace_root) {
        utils.showError('Requires an open workspace.');
        return;
    }
    process.chdir(workspace_root);

    const states: {[key: string]: string}[] = [];

    for (let key in mapping) {
        const val: string = mapping[key];

        if (key === 'global') {
            key = '-1';
        }

        if (!val) {
            continue;
        }

        const script = fs.readFileSync(val, 'utf-8');
        const state: {[key: string]: string} = {
            guid: key,
            script: script,
            ui: ''
        };

        states.push(state);

        return sendMessage(JSON.stringify({
            messageID: 1,
            scriptStates: states
        }));
    }
    return utils.showError('No configured game objects.');
}

export function sendScriptAndXml(script: string, xml = '') {
    return sendMessage(JSON.stringify({
        messageID: 1,
        scriptStates: [
            {
                guid: '-1',
                script: script,
                ui: xml
            }
        ]
    }));
}

export function uploadScriptAndXml(script: string, xml?: string, context?: ExtensionContext) {
    if (context) {
        context.workspaceState.update('last-game-script', script);
        context.workspaceState.update('last-game-xml', xml);

    }
    let xml_text = '';
    const script_text = fs.readFileSync(script, 'utf-8');
    if (xml) {
        xml_text = fs.readFileSync(xml, 'utf-8');
    }
    return sendScriptAndXml(script_text, xml_text);
}

export function evaluateLua(script: string) {
    return sendMessage(JSON.stringify({
        messageID: 3,
        guid: '-1',
        script: script
    }));
}

export function sendCustomMessage(json: string) {
    return sendMessage(JSON.stringify({
        messageID: 2,
        customMessage: JSON.parse(json)
    }));
}