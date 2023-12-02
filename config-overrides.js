
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    if (env === 'development') {
      if (!process.env.HOST || !process.env.PORT) {
        throw Error('config-overrides: HOST and PORT have to be defined');
      }
      config.output.publicPath = `https://${process.env.HOST}:${process.env.PORT}/`;

      return config;
    }

    // https://github.com/facebook/create-react-app/issues/5306#issuecomment-434164820
    // disable splitChunks - in order to have a single output file
    config.optimization.runtimeChunk = false
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    }

    // https://stackoverflow.com/a/70575990
    // Get rid of hash for js files
    config.output.filename = 'static/js/[name].js'
    // chunkFilename should not be used since splitChunks is disabled

    // Get rid of hash for css files
    const miniCssExtractPlugin = config.plugins.find(
      (element) => element.constructor.name === 'MiniCssExtractPlugin'
    )
    miniCssExtractPlugin.options.filename = 'static/css/[name].css'

    // Get rid of hash for media files
    config.module.rules[1].oneOf.forEach((oneOf) => {
      if (
        !oneOf.options ||
        oneOf.options.name !== 'static/media/[name].[hash:8].[ext]'
      ) {
        return
      }
      oneOf.options.name = 'static/media/[name].[ext]'
    })

    return config
  }
}
