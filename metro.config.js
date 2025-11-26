const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  // Configuración de SVG
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    // Bloquea carpetas grandes para evitar EMFILE
    blockList: exclusionList([
      /android\/app\/build\/.*/,
      /android\/build\/.*/,
      /ios\/build\/.*/,
      /.*\/\.expo\/.*/,
      /.*\/\.expo-shared\/.*/
    ])
  };

  return config;
})();
