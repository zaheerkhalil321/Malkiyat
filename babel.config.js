// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: ["react-native-reanimated/plugin"],
// };

module.exports = (api) => {
  const babelEnv = api.env();
  const plugins = [];
  plugins.push("react-native-reanimated/plugin");
  plugins.push([
    "module:react-native-dotenv",
    {
      envName: "APP_ENV",
      moduleName: "@env",
      path: ".env",
      blocklist: null,
      allowlist: null,
      blacklist: null, // DEPRECATED
      whitelist: null, // DEPRECATED
      safe: false,
      allowUndefined: false,
      verbose: false,
    },
  ]);
  plugins.push([
    "module-resolver",
    {
      extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
      alias: {
        "@src": "./src",
      },
    },
  ]);

  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins,
  };
};
