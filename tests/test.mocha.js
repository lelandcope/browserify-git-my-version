// Node Modules
var assert = require('chai').assert;
var StreamTest = require('streamtest');
var gitMyVersion = require('../index');
var gitRev = require('git-rev');
var packageVersion = require('../package.json').version;

describe('Git My Version', function () {
    StreamTest.versions.forEach(function (version) {
        describe('for ' + version + ' streams', function () {
            it('should replace __GIT_MY_VERSION__ with the package.json version - git commit ex. (1.0.0-1dde980)', function (done) {
                gitRev.short(function (commitHash) {
                    StreamTest[version].fromChunks(["__GIT_MY_VERSION__"])
                        .pipe(gitMyVersion())
                        .pipe(StreamTest[version].toText(function (err, text) {
                            if(err) {
                                done(err);
                            }

                            assert.equal(text, packageVersion + '-' + commitHash);

                            done();
                        }));
                });
            });
        });
    });
});
