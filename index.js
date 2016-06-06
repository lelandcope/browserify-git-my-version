// Node modules
var path = require('path');
var through = require('through2');
var findRoot = require('find-root');
var gitRev = require('git-rev');

/*
Goes through your file and replaces all __GIT_MY_VERSION__ with the
package.json version number plus the git hash.

Ex. 1.0.0-1dde980
*/
function gitMyVersion(file) {
    var PLACEHOLDER = '__GIT_MY_VERSION__';
    var root = findRoot(file);
    var commitHash = null;
    var packageVersion = require(path.join(root, 'package.json')).version
    var regex = new RegExp(PLACEHOLDER, 'g');

    return through.obj(function fileStream(chunk, enc, cb) {
        if(commitHash) {
            cb(null, replaceChunk(chunk, regex, packageVersion + '-' + commitHash));
        } else {
            gitRev.short(function getShortCommitHash(hash) {
                commitHash = hash;

                cb(null, replaceChunk(chunk, regex, packageVersion + '-' + commitHash));
            });
        }
    });
}

function replaceChunk(chunk, regex, version) {
    return chunk.toString().replace(regex, version);
}

module.exports = gitMyVersion;
