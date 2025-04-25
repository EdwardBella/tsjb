const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const aliasConfig = require("./alias.config");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const packageInfo = require("./package.json");
// const StringReplacePlugin = require("string-replace-webpack-plugin");

const projectName = packageInfo.name;

module.exports = {
	// 基本路径
	publicPath: "./",
	// 输出文件目录
	outputDir: `./dist`,
	// webpack-dev-server 相关配置
	productionSourceMap: false,
	transpileDependencies: ["js-base64"],
	devServer: {
		open: true,
		disableHostCheck: true,
		port: 7806,
		https: false,
		hotOnly: false,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			['/dev-api']: {
				target: `http://192.168.0.175:9982`,
				// target: `http://192.168.1.107:9982`,
				changeOrigin: false,
				pathRewrite: {
					['^' + '/dev-api']: ''
				}
			},
		}
	},
	lintOnSave: false,
	configureWebpack: (config) => {
		const plugins = [];

		if (process.env.NODE_ENV === "production") {
			plugins.push(
				new CompressionWebpackPlugin({
					filename: "[path].gz[query]",
					algorithm: "gzip",
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8,
				})
			);

			plugins.push(
				new FileManagerPlugin({
					events: {
						onStart: {
							mkdir: [`./${projectName}`],
						},
						onEnd: {
							copy: [{
								source: `./dist`,
								destination: `./${projectName}/`
							}],
							archive: [{
								source: path.join(__dirname, `./${projectName}`),
								destination: path.join(__dirname, `./${projectName}.zip`),
							}, ],
							delete: [`./${projectName}`],
						},
					},
				})
			);
		}

		// 将所有插件添加到 Webpack 配置
		config.plugins = [...config.plugins, ...plugins];
	},
	pluginOptions: {
		pwa: {
			iconPaths: {
				favicon32: "./favicon.ico",
				favicon16: "./favicon.ico",
				appleTouchIcon: "./favicon.ico",
				maskIcon: "./favicon.ico",
				msTileImage: "./favicon.ico",
			},
		},
	},
	chainWebpack: (config) => {
		config.entry("main").add("babel-polyfill");

		const alias = aliasConfig.resolve.alias;
		for (const key in alias) {
			config.resolve.alias.set(key, alias[key]);
		}
	},
	css: {
		loaderOptions: {
			less: {
				globalVars: {
					hack: `true; @import '~@/assets/css/common/variable.less';`,
				},
			},
		},
	},
};