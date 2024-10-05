module.exports = {
  plugins: [
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    }),
    require('postcss-each-variables'),
    require('postcss-nested')
  ]
};
