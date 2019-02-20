import * as tts from '../server';

function startServer() {
    try {
        tts.startServer(39998, '127.0.0.1');
    } catch (e) {
        console.error(`Caught error: ${e}`);
        console.error(e.message);
    }
}

export default startServer;