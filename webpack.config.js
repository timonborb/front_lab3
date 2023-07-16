const path = require('path')
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

const webpackConfig = {
	mode: 'production',
	entry: {
		main: path.resolve(__dirname, './src/index.js')
	},

	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	performance: {
		maxAssetSize: 2000000,
	},
	plugins: [
		new CleanWebpackPlugin(),

		new CopyPlugin({
			patterns: [
				{
					from: './src/assets/images',
					to: 'assets/images'
				}
			]
		}),

		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack Boilerplate',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: 'template.html', // ім'я вихідного файлу
		}),
		...glob.sync('./src/pages/**/*.html').map((filePath) => {
			const fileName = path.basename(filePath);
			return new HtmlWebpackPlugin({
				filename: fileName,
				template: filePath,
				inject: true,
				chunks: ['main'],
			});
		}),
	]
}

module.exports = webpackConfig
