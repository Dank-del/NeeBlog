/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
module.exports = {
  env: {
    MONGO_URI: "mongodb://0.0.0.0:27017/neeBlog",
    MASTER_KEY: "nee_sayang",
    API_ENDPOINT: "http://localhost:3000/api",
  },
}