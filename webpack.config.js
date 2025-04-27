const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const HtmlWebpackPlugin = require("html-webpack-plugin"); вставить в плагин new HtmlWebpackPlugin({template: "index.html",})

module.exports = {
	entry: path.resolve(__dirname, 'js/index.js'),
	output: {
		path: path.resolve(__dirname, 'output'),
		filename: 'main.js',
	},
	mode: 'development',
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin()],
		minimize: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, ''), // если пусто то берет из корня
		},
		port: 3001,
		hot: true,
	},
	stats: {
		children: false,
		modulesSpace: 0,
	},
};
