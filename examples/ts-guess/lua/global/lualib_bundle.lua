--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayConcat = function(arr1, ...)
    local args = ({...});
    local out = {};
    for ____TS_index = 1, #arr1 do
        local val = arr1[____TS_index];
        out[(#out) + 1] = val;
    end
    for ____TS_index = 1, #args do
        local arg = args[____TS_index];
        if pcall(function()
            return #(arg);
        end) and (type(arg) ~= "string") then
            local argAsArray = (arg);
            for ____TS_index = 1, #argAsArray do
                local val = argAsArray[____TS_index];
                out[(#out) + 1] = val;
            end
        else
            out[(#out) + 1] = arg;
        end
    end
    return out;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayEvery = function(arr, callbackfn)
    local i = 0;
    while i < (#arr) do
        if not callbackfn(arr[i + 1], i, arr) then
            return false;
        end
        i = i + 1;
    end
    return true;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayFilter = function(arr, callbackfn)
    local result = {};
    local i = 0;
    while i < (#arr) do
        if callbackfn(arr[i + 1], i, arr) then
            result[(#result) + 1] = arr[i + 1];
        end
        i = i + 1;
    end
    return result;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayForEach = function(arr, callbackFn)
    local i = 0;
    while i < (#arr) do
        callbackFn(arr[i + 1], i, arr);
        i = i + 1;
    end
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayIndexOf = function(arr, searchElement, fromIndex)
    local len = #arr;
    if len == 0 then
        return -1;
    end
    local n = 0;
    if fromIndex then
        n = fromIndex;
    end
    if n >= len then
        return -1;
    end
    local k;
    if n >= 0 then
        k = n;
    else
        k = len + n;
        if k < 0 then
            k = 0;
        end
    end
    local i = k;
    while i < len do
        if arr[i + 1] == searchElement then
            return i;
        end
        i = i + 1;
    end
    return -1;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayMap = function(arr, callbackfn)
    local newArray = {};
    local i = 0;
    while i < (#arr) do
        newArray[i + 1] = callbackfn(arr[i + 1], i, arr);
        i = i + 1;
    end
    return newArray;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayPush = function(arr, ...)
    local items = ({...});
    for ____TS_index = 1, #items do
        local item = items[____TS_index];
        arr[(#arr) + 1] = item;
    end
    return #arr;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayReverse = function(arr)
    local i = 0;
    local j = (#arr) - 1;
    while i < j do
        local temp = arr[j + 1];
        arr[j + 1] = arr[i + 1];
        arr[i + 1] = temp;
        i = i + 1;
        j = j - 1;
    end
    return arr;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayShift = function(arr)
    return table.remove(arr, 1);
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArrayUnshift = function(arr, ...)
    local items = ({...});
    local i = (#items) - 1;
    while i >= 0 do
        table.insert(arr, 1, items[i + 1]);
        i = i - 1;
    end
    return #arr;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArraySort = function(arr, compareFn)
    table.sort(arr, compareFn);
    return arr;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArraySlice = function(list, first, last)
    local len = #list;
    local k;
    if first < 0 then
        k = math.max(len + first, 0);
    else
        k = math.min(first, len);
    end
    local relativeEnd = last;
    if last == nil then
        relativeEnd = len;
    end
    local final;
    if relativeEnd < 0 then
        final = math.max(len + relativeEnd, 0);
    else
        final = math.min(relativeEnd, len);
    end
    local out = {};
    local n = 0;
    while k < final do
        out[n + 1] = list[k + 1];
        k = k + 1;
        n = n + 1;
    end
    return out;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArraySome = function(arr, callbackfn)
    local i = 0;
    while i < (#arr) do
        if callbackfn(arr[i + 1], i, arr) then
            return true;
        end
        i = i + 1;
    end
    return false;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__ArraySplice = function(list, start, deleteCount, ...)
    local items = ({...});
    local len = #list;
    local actualStart;
    if start < 0 then
        actualStart = math.max(len + start, 0);
    else
        actualStart = math.min(start, len);
    end
    local itemCount = #items;
    local actualDeleteCount;
    if not start then
        actualDeleteCount = 0;
    elseif not deleteCount then
        actualDeleteCount = len - actualStart;
    else
        actualDeleteCount = math.min(math.max(deleteCount, 0), len - actualStart);
    end
    local out = {};
    local k = 0;
    while k < actualDeleteCount do
        local from = actualStart + k;
        if list[from + 1] then
            out[k + 1] = list[from + 1];
        end
        k = k + 1;
    end
    if itemCount < actualDeleteCount then
        local k = actualStart;
        while k < (len - actualDeleteCount) do
            local from = k + actualDeleteCount;
            local to = k + itemCount;
            if list[from + 1] then
                list[to + 1] = list[from + 1];
            else
                list[to + 1] = nil;
            end
            k = k + 1;
        end
        local k = len;
        while k > ((len - actualDeleteCount) + itemCount) do
            list[(k - 1) + 1] = nil;
            k = k - 1;
        end
    elseif itemCount > actualDeleteCount then
        local k = len - actualDeleteCount;
        while k > actualStart do
            local from = (k + actualDeleteCount) - 1;
            local to = (k + itemCount) - 1;
            if list[from + 1] then
                list[to + 1] = list[from + 1];
            else
                list[to + 1] = nil;
            end
            k = k - 1;
        end
    end
    local j = actualStart;
    for ____TS_index = 1, #items do
        local e = items[____TS_index];
        list[j + 1] = e;
        j = j + 1;
    end
    local k = (#list) - 1;
    while k >= ((len - actualDeleteCount) + itemCount) do
        list[k + 1] = nil;
        k = k - 1;
    end
    return out;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__FunctionApply = function(fn, thisArg, argsArray)
    if argsArray then
        return fn(thisArg, (unpack or table.unpack)(argsArray));
    else
        return fn(thisArg);
    end
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__FunctionBind = function(fn, thisArg, ...)
    local boundArgs = ({...});
    return function(...)
        local argArray = ({...});
        local i = 0;
        while i < (#boundArgs) do
            table.insert(argArray, i + 1, boundArgs[i + 1]);
            i = i + 1;
        end
        return fn(thisArg, (unpack or table.unpack)(argArray));
    end;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__FunctionCall = function(fn, thisArg, ...)
    local args = ({...});
    return fn(thisArg, (unpack or table.unpack)(args));
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__InstanceOf = function(obj, classTbl)
    if obj ~= nil then
        local luaClass = obj.constructor;
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true;
            end
            luaClass = luaClass.____super;
        end
    end
    return false;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
Symbol = {iterator = {}};

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__Iterator = function(iterable)
    local iterator = iterable[Symbol.iterator](iterable);
    return function()
        local result = iterator:next();
        if not result.done then
            return result.value;
        else
            return nil;
        end
    end;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
Map = Map or {};
Map.__index = Map;
Map.prototype = Map.prototype or {};
Map.prototype.__index = Map.prototype;
Map.prototype.constructor = Map;
Map.new = function(...)
    local self = setmetatable({}, Map.prototype);
    self:____constructor(...);
    return self;
end;
Map.prototype.____constructor = function(self, other)
    self.items = {};
    self.size = 0;
    if other then
        local iterable = other;
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable);
            while true do
                local result = iterator:next();
                if result.done then
                    break;
                end
                local value = result.value;
                self:set(value[0 + 1], value[1 + 1]);
            end
        else
            local arr = other;
            self.size = #arr;
            for ____TS_index = 1, #arr do
                local kvp = arr[____TS_index];
                self.items[kvp[0 + 1]] = kvp[1 + 1];
            end
        end
    end
end;
Map.prototype.clear = function(self)
    self.items = {};
    self.size = 0;
    return;
end;
Map.prototype.delete = function(self, key)
    local contains = self:has(key);
    if contains then
        self.size = self.size - 1;
    end
    self.items[key] = nil;
    return contains;
end;
Map.prototype[Symbol.iterator] = function(self)
    return self:entries();
end;
Map.prototype.entries = function(self)
    local items = self.items;
    local key;
    local value;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key, value = next(items, key);
        return {done = not key, value = {key, value}};
    end};
end;
Map.prototype.forEach = function(self, callback)
    for key in pairs(self.items) do
        callback(self.items[key], key, self);
    end
    return;
end;
Map.prototype.get = function(self, key)
    return self.items[key];
end;
Map.prototype.has = function(self, key)
    return self.items[key] ~= nil;
end;
Map.prototype.keys = function(self)
    local items = self.items;
    local key;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key = next(items, key);
        return {done = not key, value = key};
    end};
end;
Map.prototype.set = function(self, key, value)
    if not self:has(key) then
        self.size = self.size + 1;
    end
    self.items[key] = value;
    return self;
end;
Map.prototype.values = function(self)
    local items = self.items;
    local key;
    local value;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key, value = next(items, key);
        return {done = not key, value = value};
    end};
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
Set = Set or {};
Set.__index = Set;
Set.prototype = Set.prototype or {};
Set.prototype.__index = Set.prototype;
Set.prototype.constructor = Set;
Set.new = function(...)
    local self = setmetatable({}, Set.prototype);
    self:____constructor(...);
    return self;
end;
Set.prototype.____constructor = function(self, other)
    self.items = {};
    self.size = 0;
    if other then
        local iterable = other;
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable);
            while true do
                local result = iterator:next();
                if result.done then
                    break;
                end
                self:add(result.value);
            end
        else
            local arr = other;
            self.size = #arr;
            for ____TS_index = 1, #arr do
                local value = arr[____TS_index];
                self.items[value] = true;
            end
        end
    end
end;
Set.prototype.add = function(self, value)
    if not self:has(value) then
        self.size = self.size + 1;
    end
    self.items[value] = true;
    return self;
end;
Set.prototype.clear = function(self)
    self.items = {};
    self.size = 0;
    return;
end;
Set.prototype.delete = function(self, value)
    local contains = self:has(value);
    if contains then
        self.size = self.size - 1;
    end
    self.items[value] = nil;
    return contains;
end;
Set.prototype[Symbol.iterator] = function(self)
    return self:values();
end;
Set.prototype.entries = function(self)
    local items = self.items;
    local key;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key = next(items, key);
        return {done = not key, value = {key, key}};
    end};
end;
Set.prototype.forEach = function(self, callback)
    for key in pairs(self.items) do
        callback(key, key, self);
    end
    return;
end;
Set.prototype.has = function(self, value)
    return self.items[value] == true;
end;
Set.prototype.keys = function(self)
    local items = self.items;
    local key;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key = next(items, key);
        return {done = not key, value = key};
    end};
end;
Set.prototype.values = function(self)
    local items = self.items;
    local key;
    return {[Symbol.iterator] = function(self)
        return self;
    end, next = function(self)
        key = next(items, key);
        return {done = not key, value = key};
    end};
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__StringReplace = function(source, searchValue, replaceValue)
    return ({string.gsub(source, searchValue, replaceValue)})[0 + 1];
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__StringSplit = function(source, separator, limit)
    if limit == nil then
        limit = 4294967295;
    end
    if limit == 0 then
        return {};
    end
    local out = {};
    local index = 0;
    local count = 0;
    if (separator == nil) or (separator == "") then
        while (index < ((#source) - 1)) and (count < limit) do
            out[count + 1] = string.sub(source, index + 1, index + 1);
            count = count + 1;
            index = index + 1;
        end
    else
        local separatorLength = #separator;
        local nextIndex = (string.find(source, separator) or 0) - 1;
        while (nextIndex >= 0) and (count < limit) do
            out[count + 1] = string.sub(source, index + 1, nextIndex);
            count = count + 1;
            index = nextIndex + separatorLength;
            nextIndex = (string.find(source, separator, index + 1, true) or 0) - 1;
        end
    end
    if count < limit then
        out[count + 1] = string.sub(source, index + 1);
    end
    return out;
end;

--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
__TS__StringConcat = function(str1, ...)
    local args = ({...});
    local out = str1;
    for ____TS_index = 1, #args do
        local arg = args[____TS_index];
        out = out .. arg;
    end
    return out;
end;

