
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    if (env === 'development') {
      if (!process.env.HOST || !process.env.PORT) {
        throw Error('config-overrides: HOST and PORT have to be defined');
      }
      config.output.filename = 'static/js/[name].js'
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
  },

  // https://github.com/timarney/react-app-rewired#extended-configuration-options
  devServer: function(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.devMiddleware = {
        writeToDisk: false
      }

      return config;
    };
  },
}
