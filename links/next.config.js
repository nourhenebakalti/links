const path = require("path");

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/home6-dark',
        permanent: true,
        basePath: false,
      },
    ]
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "css")],
  },
  trailingSlash: true,
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};