local commands = require("./commands")
local logic = require("./logic")

-- command handlers
function doEnd(who)
    if target then
        logic.terminate(who)
    end
end

function doStart(who, lower, upper)
    if target == nil then
        logic.start(who, lower, upper)
    end
end

-- actual TTS event handler
function onChat(message, sender)
    -- so our response always appears after the chat we're responding to
    Wait.frames(function() commands.handleMessage(message, sender, logic.handleGuess) end, 1)
end