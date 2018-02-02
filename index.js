var fs = require('fs');
var p = require('path');

module.exports = function (root, ignores) {
    ignores = !ignores ? [] :
        Array.isArray(ignores) ? ignores :
            [ignores];

    var directories = ['.'];
    var directory;
    var files = [];

    while (directories.length) {
        directory = directories.pop();
        fs
            .readdirSync(directory)
            .filter(filter)
            .forEach(dispatch);
    }

    return files;

    function filter(path) {
        return !ignores.length || !ignores.some(function (pattern) {
            return isIgnored(pattern, path);
        });
    }

    function dispatch(name) {
        var path = p.join(directory, name);
        var fullPath = p.join(root, path);
        if (fs
            .statSync(fullPath)
            .isDirectory()
        ) {
            directories.push(path);
        } else {
            files.push(path);
        }
    }
}

function isIgnored(pattern, path) {
    if (pattern instanceof Function) return pattern(path);
    if (pattern instanceof RegExp) return pattern.test(path);
    if (typeof pattern === 'string') return path.indexOf(pattern) !== -1;

    console.warn(
        'Invalid ignore pattern : ' +
        'expect a function/regular expression/string but found',
        pattern
    );
}

