local logic = {}

-- functions for game logic
function logic.start(who, new_lower, new_upper)
    upper = new_upper or 100
    lower = new_lower or 1
    target = math.random(lower, upper)
    print("Guess a number between " .. lower .. " and " .. upper .. " (inclusive!)")
end

function logic.finish(who)
    print(who.steam_name .. " won the game!")
    target = nil
end

function logic.terminate(who)
    print(who.steam_name .. " terminated the game :(")
    target = nil
end

function logic.handleGuess(message, sender)
    -- ignore messages when there's no active game
    if target == nil then
        return
    end

    -- check `message` as `guess` against `target`
    local guess = tonumber(message)

    -- ignore non-numeric messages
    if guess == nil then
        return
    end

    -- respond to the player
    if guess == target then
        logic.finish(sender)
    elseif guess < target then
        print("Higher!")
    else
        print("Lower!")
    end
end

return logic