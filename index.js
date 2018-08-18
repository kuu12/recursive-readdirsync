var fs = require('fs');
var p = require('path');

/**
 * @param   {string}  root      Directory path you want to read.
 * @param   {Array}   excludes  Exlude rules. A rule can be a regular expression / string / function.
 * @returns {Array}             Paths of files.
 */
module.exports = function (root, excludes) {
    excludes = [].concat(excludes).filter(Boolean);

    var dirList = ['.'];
    var dir;
    var fileList = [];

    while (dir = dirList.pop()) fs
        .readdirSync(p.join(root, dir))
        .filter(filter)
        .forEach(dispatch);

    return fileList;

    function filter(path) {
        return excludes.every(function (rule) {
            return !isExclude(rule, path);
        });
    }

    function dispatch(name) {
        var path = p.join(dir, name);
        if (fs
            .statSync(p.join(root, path))
            .isDirectory()
        )
            dirList.push(path);
        else
            fileList.push(path);
    }
}

function isExclude(rule, path) {
    if (rule instanceof Function) return rule(path);
    if (rule instanceof RegExp) return rule.test(path);
    if (typeof rule === 'string') return path.indexOf(rule) !== -1;

    console.error(
        'Invalid exclude rule : ' +
        'expect a regular expression/string/function but found',
        rule
    );
}
