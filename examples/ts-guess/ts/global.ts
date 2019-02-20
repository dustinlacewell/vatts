import * as commands from './commands';
import * as logic from './logic';

const game = new logic.GuessingGame();

function doStart(sender: any, lower?: number, upper?: number) {
    game.start(sender, lower, upper);
}

function doEnd(sender: any) {
    game.terminate(sender);
}

function defaultHandler(message: string, sender: any) {
    game.guess(message, sender);
}

function onChat(message: string, sender: any) {
    Wait.frames(() => commands.handleMessage(message, sender, defaultHandler), 1)
}