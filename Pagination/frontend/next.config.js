/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig


module.exports ={
  publicRuntimeConfig: {
      APP_NAME: 'Pagination',
      API_DEVELOPMENT: 'http://localhost:8000/api',
      TRY_h: 'http://localhost:8000',
      PRODUCTION: false
  }
}
