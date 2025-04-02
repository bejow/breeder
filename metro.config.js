const path = require("path");
const { mergeConfig } = require("@react-native/metro-config");
const { getDefaultConfig} = require("expo/metro-config");


const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { sourceExts, assetExts } } = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-sass-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg" ||ext !== "scss"),
    sourceExts: [...sourceExts, "svg", "scss", "sass"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
  },
  watchFolders: [path.resolve(__dirname, "../")],
};

module.exports = mergeConfig(defaultConfig, config);