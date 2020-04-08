// 静态代码检查
// eslint-disable-next-line
/* eslint-disable */ 
var np = {};

np.config = {
    'appContainer': '.notepad-app'
};

np.fontFamily     = 'Arial'; // 默认字体
np.fontStype      = '常规';  // 默认字体样式
np.fontSize       = '16';    // 默认字体大小：16pt

np.fontHandler = function(e) {
  np.fontFamily = e.family;
  np.fontStype = e.style;
  np.fontSize = e.size;
  $editor.setFont(e);
};

// 静态代码检查
/* global $menubar $editor : true */
$(function() {
  $menubar.show(np.menuData);//初始化显示菜单栏
  $editor.show({//初始化显示编辑框
      contentHandler: function(isEmpty) {
          $menubar.enabled(1, 6, isEmpty);
      }
  });
  $editor.setFont({//设置字体
      family: np.fontFamily,
      style: np.fontStype,
      size: np.fontSize
  });
  var $app = $('body');
  $app.click(function() {//点击事件 隐藏菜单栏并且编辑框获得焦点
      $menubar.hideMenu();
      $editor.focus();
  });
});
