--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local commands = require("src.commands");
local logic = require("src.logic");
local game = logic.GuessingGame.new();
doStart = function(sender, lower, upper)
    game:start(sender, lower, upper);
end;
doEnd = function(sender)
    game:terminate(sender);
end;
defaultHandler = function(message, sender)
    game:guess(message, sender);
end;
onChat = function(message, sender)
    Wait:frames(function()
        return commands.handleMessage(message, sender, defaultHandler);
    end, 1);
end;
