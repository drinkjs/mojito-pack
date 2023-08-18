module.exports = {
  entry: "./src/components/**/*.tsx",
  output:{
    publicPath:"/public",
  },
  externals: {
    "echarts": ['http://cdn.staticfile.org/echarts/5.4.3/echarts.min.js', 'echarts'],
  },
}