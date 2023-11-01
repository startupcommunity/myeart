// add config para vue 2
module.exports = {
    // preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.jsx?$": "babel-jest",
    },
};
