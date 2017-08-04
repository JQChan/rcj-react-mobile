module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-import')(),
    require('postcss-cssnext')(),
    require('autoprefixer')(),
    require('cssnano')({
      autoprefixer: true
    })
  ]
}