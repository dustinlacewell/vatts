--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
-- Lua Library inline imports
--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayPush = function(arr, ...)
    local items = ({...});
    for ____TS_index = 1, #items do
        local item = items[____TS_index];
        arr[(#arr) + 1] = item;
    end
    return #arr;
end;

local exports = exports or {};
exports.parseArgs = function(text)
    local args = {};
    for arg in string.gmatch(text, "%S+") do
        do
            __TS__ArrayPush(args, arg);
        end
        ::__continue2::
    end
    return args;
end;
exports.parseMessage = function(message)
    local command = string.match(message, "^%.(%w+)");
    if command == nil then
        return;
    end
    local args = {};
    local argstr = string.match(message, "^%.%w+%s+(.+)");
    if argstr then
        args = exports.parseArgs(argstr);
    end
    return command, args;
end;
exports.handlerForCommand = function(command)
    local command_name = string.upper(string.sub(command, 0 + 1, 0 + 1)) .. string.sub(command, 1 + 1);
    local handler_name = "do" .. (tostring(command_name) .. "");
    return _G[handler_name];
end;
exports.handleMessage = function(message, sender, default_handler)
    local command, args = exports.parseMessage(message);
    if not command then
        default_handler(message, sender);
        return;
    end
    local handler = exports.handlerForCommand(command);
    if not handler then
        default_handler(message, sender);
        return;
    end
    if args then
        handler(sender, table.unpack(args));
    else
        handler(sender);
    end
end;
return exports;
