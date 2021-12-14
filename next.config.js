module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/room',
        permanent: true,
      },
    ];
  },
};
