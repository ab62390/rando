module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        linux: {
          icon: './src/assets/logo.png',
        },
        win: {
          icon: './src/assets/logo.png',
        },
      },
    },
  },
  transpileDependencies: ['vuetify'],
};
