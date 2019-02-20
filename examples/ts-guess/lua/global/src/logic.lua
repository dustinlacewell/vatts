--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local exports = exports or {};
exports.GuessingGame = exports.GuessingGame or {};
exports.GuessingGame.__index = exports.GuessingGame;
exports.GuessingGame.prototype = exports.GuessingGame.prototype or {};
exports.GuessingGame.prototype.__index = exports.GuessingGame.prototype;
exports.GuessingGame.prototype.constructor = exports.GuessingGame;
exports.GuessingGame.new = function(...)
    local self = setmetatable({}, exports.GuessingGame.prototype);
    self:____constructor(...);
    return self;
end;
exports.GuessingGame.prototype.____constructor = function(self, lower, upper)
    if lower == nil then
        lower = 1;
    end
    if upper == nil then
        upper = 100;
    end
    self.lower = lower;
    self.upper = upper;
    self.target = nil;
end;
exports.GuessingGame.prototype.start = function(self, who, lower, upper)
    self.lower = lower or self.lower;
    self.upper = upper or self.upper;
    self.target = math.random(self.lower, self.upper);
    print(("Guess a number between " .. (tostring(self.lower) .. " and ")) .. (tostring(self.upper) .. " (inclusive!)"));
end;
exports.GuessingGame.prototype.finish = function(self, who)
    print("" .. (tostring(who.steam_name) .. " won the game!"));
    self.target = nil;
end;
exports.GuessingGame.prototype.terminate = function(self, who)
    print("" .. (tostring(who.steam_name) .. " terminated the game :("));
    self.target = nil;
end;
exports.GuessingGame.prototype.guess = function(self, message, who)
    if self.target == nil then
        return;
    end
    local guess = tonumber(message);
    if guess == nil then
        return;
    end
    if guess == self.target then
        self:finish(who);
    elseif guess < self.target then
        print("Higher!");
    else
        print("Lower!");
    end
end;
return exports;
