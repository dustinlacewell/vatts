import * as tts from '../server';

function stopServer() {
    try {
        tts.stopServer();
    } catch (e) {
        console.error(`Caught error: ${e}`);
        console.error(e.message);
    }
}

export default stopServer;