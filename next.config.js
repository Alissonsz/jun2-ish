module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mainPage',
        permanent: false,
      },
    ];
  },
};
