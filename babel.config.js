module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          esmodules: true, // Target modern browsers that support ES modules
        },
      },
    ],
  ],
};