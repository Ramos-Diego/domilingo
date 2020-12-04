const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = {
  async redirects() {
    return [
      {
        source: '/#',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
  },
})
