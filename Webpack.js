module.exports = {
  // ... outras configurações ...

  module: {
    rules: [
      // ... outras regras ...

      {
        test: /\.node$/,
        use: 'canvas-loader',
      },
    ],
  },
}
