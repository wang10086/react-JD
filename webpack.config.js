var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./index.jsx' // Your appʼs entry point
	],
	//生成的sourcemap的方式
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx','.json'] //表示这几个文件的后缀可以省略不写
		/*alias: { //表示别名
			'@': path.join(__dirname,'./server') //这样@即表示项目根目录中 server这一层目录
		}*/
	},
	module: { //所有第三方 模块的配置规则
		loaders: loaders
	},
	devServer: {
		contentBase: "./build", //静态资源的目录
			noInfo: true, //  --no-info option
			hot: true,   //自动刷新
			inline: true
		},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env':{
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
		new CopyWebpackPlugin([
			{from: './index.html'}
		])
	]
};
