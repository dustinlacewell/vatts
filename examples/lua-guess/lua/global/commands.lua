local commands = {}

-- functions to parse commands
function commands.parseArgs(text)
    -- return an array of `text` split on whitespace
    local args = {}

    for arg in string.gmatch(text, "%S+") do
      table.insert(args, arg)
    end

    return args
end

function commands.parseMessage(message)
    -- get the command and any args from `message`
    local command = string.match(message, "^.(%w+)")

    if command == nil then
        return
    end

    local args = string.match(message, "^.%w+%s+(.+)")

    if args ~= nil then
        args = commands.parseArgs(args)
    end

    return command, args
end

function commands.handlerForCommand(command)
    -- lookup handler for `command` from global namespace
    local command_name = string.gsub(command, "^%a", string.upper)
    return _G["do" .. command_name]
end

function commands.handleMessage(message, sender, default_handler)
    -- call function based on command with sender and args extracted from `message`
    local command, args = commands.parseMessage(message)

    if command == nil then
        default_handler(message, sender)
        return
    end

    local handler = commands.handlerForCommand(command)

    if handler == nil then
        default_handler(message, sender)
        return
    end

    if args then
        handler(sender, table.unpack(args))
    else
        handler(sender)
    end
end

return commands