module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        require.resolve("expo/node_modules/babel-preset-expo"),
        {
          reanimated: false,
          web: {
            reanimated: false
          },
          native: {
            reanimated: false
          }
        }
      ]
    ]
  };
};
