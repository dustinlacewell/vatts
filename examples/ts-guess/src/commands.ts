export function parseArgs(text: string): string[] {
    /* return an array of `text` split on whitespace */
    const args = [];
    for (const [arg] of string.gmatch(text, "%S+")) {
        args.push(arg);
    }
    return args;
}

/** @tupleReturn */
export function parseMessage(message: string): [string, string[]] {
    /* get the command and any arge from `message` */
    const [command] = string.match(message, "^%.(%w+)");

    if (command == null) {
        return;
    }

    let args: string[] = [];
    let [argstr] = string.match(message, "^%.%w+%s+(.+)");

    if (argstr) {
        args = parseArgs(argstr);
    }

    return [command, args]
}

export function handlerForCommand(command: string) {
    const command_name = command[0].toUpperCase() + command.slice(1);
    const handler_name = `do${command_name}`;
    return _G[handler_name];
}

export function handleMessage(message: string, sender: any, default_handler: any) {
    const [command, args] = parseMessage(message);

    if (!command) {
        default_handler(message, sender);
        return;
    }

    const handler = handlerForCommand(command);

    if (!handler) {
        default_handler(message, sender);
        return;
    }

    if (args) {
        handler(sender, ...args);
    } else {
        handler(sender);
    }
}