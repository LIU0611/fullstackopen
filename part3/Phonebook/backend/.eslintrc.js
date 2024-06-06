module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "overrides": [
        {
            "files": [".eslintrc.{js,cjs}"],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
}
