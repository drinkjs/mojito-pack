module.exports = {
	entry: "./src/*.vue",
	externals: {
		// react: ['https://unpkg.com/react@18/umd/react.production.min.js', 'react'],
		// "react-dom": ['https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'react-dom'],
		// "echarts": ['https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.2/echarts.min.js', 'echarts'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					{
						loader: "css-loader",
						options: { importLoaders: 1 },
					},
					"postcss-loader",
				],
			},
		],
	},
};
