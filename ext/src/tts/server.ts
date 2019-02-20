import * as net from 'net';
import * as path from 'path';
import * as vscode from 'vscode';

import * as utils from '../utils';

let server: net.Server | undefined;

const enum TTSMSG {
    NONE           = -1,
    NEW_OBJECTS,
    NEW_GAME,
    PRINT,
    ERROR,
    CUSTOM,
    RETURN,
    GAME_SAVED,
    OBJECT_CREATED
}

export function startServer(port: number, host: string) {
    const newServer = net.createServer((client) => {
        client.setEncoding('utf-8');
        client.setTimeout(5000);

        client.on('data', async (data) => {
            const object = JSON.parse(data.toString());
            switch (object.messageID) {
                case TTSMSG.NEW_OBJECTS:
                    utils.showInfo('New objects were created.');
                    break;
                case TTSMSG.NEW_GAME:
                    utils.showInfo('New game was loaded.');
                    break;
                case TTSMSG.PRINT:
                    utils.showInfo(object.message);
                    break;
                case TTSMSG.ERROR:
                    let detail = `GUID: ${object.guid}`;
                    if (object.guid == "-1") {
                        object.guid = "global";
                    }
                    const scripts = utils.getConfig("vatts.tts", "game-scripts") as {[key: string]: string};
                    const filename = scripts[object.guid];
                    const line_string = object.error.match(/:\(([0-9]*),[^\)]+\):/);

                    if (!line_string) {
                        return;
                    }
                    const line = parseInt(line_string[1], 10) - 1;
                    detail += `\nLine: ${line}`;
                    if (vscode.workspace.workspaceFolders) {
                        utils.showJumpableError(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, filename), line, 0, detail);
                    } else {
                        utils.showError(detail);
                    }
                    break;
                default:
            }
        });
    });

    newServer.listen(port, host, () => {
        utils.showInfo(`Listening to TTS...`);
        newServer.on('error', error => {
            utils.showError('TTS communication error:');
            utils.showError(JSON.stringify(error));
        });
    });
    server = newServer;
}

export function stopServer(cb?: Function) {
    if (server) {
        server.close(cb);
        server = undefined;
    }
    utils.showInfo('Stopped listening to TTS.');
}