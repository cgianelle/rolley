module.exports = {  
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "node": true,
    "es6":   true
  },
  // "extends": "eslint:recommended",
  "rules": {
    "indent": [ 2, 4 ],
    "eqeqeq": [2,"smart"],
    "curly": 2,
    "linebreak-style": [ 2, "unix" ],
    "semi": [ 2, "always" ],
    "semi-spacing": 2,
    "block-scoped-var": 2,
    "brace-style": [2, "1tbs"],
    "camelcase": 0,
    "eol-last": 2,
    "eqeqeq": [2, "smart"],
    "max-depth": [1, 5],
    "max-statements": [1, 20],
    "new-cap": 0,
    "no-extend-native": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-trailing-spaces": 2,
    "no-multi-spaces": 2,
    "no-use-before-define": [2, "nofunc"],
    "quotes": [0, "single", "avoid-escape"],
    "space-unary-ops": 2,
    "keyword-spacing": 1,
    "space-before-function-paren": 0,
    "space-in-parens": 2,
    "strict": [0],
    "no-underscore-dangle": 0
  }
};
