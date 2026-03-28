/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/tutor_deu.html',
        destination: 'https://project-tngig.vercel.app/',
        permanent: true,
      },
      {
        source: '/tutor_deu',
        destination: 'https://project-tngig.vercel.app/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
