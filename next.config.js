/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/lecturers',
        destination: '/lecturers/1',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
