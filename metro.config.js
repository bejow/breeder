const path = require("path");
const { getDefaultConfig} = require("expo/metro-config");


const defaultConfig = getDefaultConfig(__dirname, {isCSSEnabled: true});
const { resolver: { sourceExts, assetExts }  } = defaultConfig;


/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,
  transformerPath: require.resolve("./transform-worker.js"),
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-sass-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: assetExts.filter((ext) => ext !== "svg" ||ext !== "scss"),
    sourceExts: [...sourceExts, "svg", "scss", "sass"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
  },
  watchFolders: [...defaultConfig.watchFolders, path.resolve(__dirname, "../")],
};

module.exports = config