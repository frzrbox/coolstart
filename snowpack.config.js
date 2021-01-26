// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    dist: {
      url: '/',
      static: true,
    },
  },
  plugins: [
    ['@snowpack/plugin-webpack', { htmlMinifierOptions: true }],
    ['@snowpack/plugin-run-script', { cmd: 'eleventy', watch: '$1 --watch' }],
    [
      '@snowpack/plugin-run-script',
      { cmd: 'postcss src/css/out --dir dist/css', watch: '$1 --watch' },
    ],
    [
      '@snowpack/plugin-run-script',
      {
        cmd:
          'babel --presets @babel/preset-typescript --extensions ".ts" ./src/js --out-dir ./dist/js',
        watch: '$1 --watch',
      },
    ],
  ],
  installOptions: {},
  devOptions: {
    port: 3000,
  },
};
