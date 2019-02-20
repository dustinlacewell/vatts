import * as nj from 'nunjucks';

const template = `
local __modules = {}

local require = function(filename)
    if package.loaded[filename] then
        return package.loaded[filename]
    end

    if not __modules[filename] then
        error('No module named ' .. tostring(filename) .. ' found', 2)
    end

    local result = __modules[filename]()
    package.loaded[filename] = result or true
    return package.loaded[filename]
end

{% for _, module in modules %}
__modules['{{ module.safename }}'] = function()

    local require = function(path)
        local modules = {
            {%- for path, filename in module.dependencies %}
            ["{{ path|safe }}"] = "{{ filename|safe }}",
            {%- endfor %}
        }
        if modules then
            local filename = modules[path]
            return require(filename or path)
        end
    end

    {% if debug -%}
    -- '{{ module.filename }}' STARTS HERE
    {%- endif %}
    {{ module.text|safe|indent }}
    {%- if debug %}
    -- '{{ module.filename }}' ENDS HERE
    {%- endif %}

end
{%- endfor %}

require("{{ entrypoint }}")
`;

interface IContext {
    [key: string]: any;
}

export function render(context: any, _template= template) {
    return nj.renderString(_template, context as IContext);
}