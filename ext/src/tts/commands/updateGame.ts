import * as utils from '../../utils';
import * as ttsapi from '../api';

async function updateGame() {

    const game_scripts = utils.getConfig<{[key: string]: string}>('vatts.tts', 'game-scripts');

    if (!game_scripts) {
        utils.showError('No configured scripts: vatts.tts.game-scripts');
        return;
    }

    return ttsapi.updateGame(game_scripts);

}

export default updateGame;