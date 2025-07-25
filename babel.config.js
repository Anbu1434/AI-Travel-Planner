module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@components": "./components",
          "@screens": "./screens",
          "@assets": "./assets",
          "@configs": "./app/configs" // ✅ Updated alias path
        },
      },
    ],
  ],
};
