// 解释routes下的路由，生成懒加载的路由规则
module.exports = function (content, map, meta) {
  console.log(map)
  const { isVue } = this.getOptions()
  return content
};
