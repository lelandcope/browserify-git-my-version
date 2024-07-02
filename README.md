# DEPRECATED DO NOT USE

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

    cd working_directory

    npm i

    npm test
