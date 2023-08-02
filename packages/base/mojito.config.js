module.exports = {
  entry: "./src/*.tsx",
  output:{
    publicPath:"/public",
  },
  externals: {
    // react: ['https://unpkg.com/react@18/umd/react.production.min.js', "React"],
    // "react-dom": ['https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', "ReactDOM"],
    // "antd": ['https://cdn.jsdelivr.net/npm/antd@5.7.0/dist/antd.min.js'],
  },
}