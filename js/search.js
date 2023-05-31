// 获取搜索框元素并添加点击事件监听器
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('click', function() {
  // 打开新的浏览器页面
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(searchBox.value));
});
