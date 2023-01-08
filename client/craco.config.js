const CracoLessPlugin = require("craco-less");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888,
        openAnalyzer: true, // 构建完打开浏览器
        reportFilename: path.resolve(__dirname, `analyzer/index.html`),
      }),
    ],
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {
          base: {
            // 基本框架
            chunks: "all",
            test: /(react|react-dom|react-dom-router)/,
            name: "base",
            priority: 100,
          },
          jsoneditor: {
            test: /jsoneditor/,
            name: "jsoneditor",
            priority: 100,
          },
          echarts: {
            test: /(echarts)/,
            name: "echarts",
            priority: 100,
          },
          bizcharts: {
            test: /(bizcharts)/,
            name: "bizcharts",
            priority: 100,
          },
          g2: {
            test: /@antv/,
            name: "g2",
            priority: 100,
          },
          turf: {
            test: /@turf/,
            name: "turf",
            priority: 100,
          },
          dataset: {
            test: /(data-set.js)/,
            name: "dataset",
            priority: 100,
          },
          biz: {
            test: /@bizcharts\/umd/,
            name: "biz",
            priority: 100,
          },
          commons: {
            chunks: "all",
            // 将两个以上的chunk所共享的模块打包至commons组。
            minChunks: 2,
            name: "commons",
            priority: 80,
          },
        },
      };
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      [
        // antd 的按需加载用和自动引入样式文件
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true,
        },
      ]
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#41b883" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
