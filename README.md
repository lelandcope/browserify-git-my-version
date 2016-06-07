# browserify-git-my-version

Browserify transform to replace `__GIT_MY_VERSION__` with your package version - git hash (1.0.0-1dde980)

---

## Usage

**Commandline**

    browserify -t browserify-git-my-version

**json**

    {
        "browserify": {
            "transform": [
                "browserify-git-my-version"
            ]
        }
    }

---

## Test

    npm test

NOTE: This test doesnt run through a test suite. It will just run `browserify ./test-file/index.js -t ./index.js --bare` so you can see the output in the commandline. In the future I would like to write a real test.
