// 静态代码检查
// eslint-disable-next-line
/* eslint-disable */ 
var $menubar = (function() {
  var $bar = $('<div class="notepad-menubar"></div>');
  var menuData;//所有菜单数据数组
  var menus = [];//下拉菜单对象
  var active = -1;//默认下拉菜单没有展开

  function createMenuTitle() {//创建菜单栏
    var $titles = $('<ul class="menu-title"></ul>');//获取
    //赋值
    for(var i=0; i<menuData.length; i++) {
      var $title = $('<li class="title"></li>');

      $title.html(menuData[i].title);
      $title.attr('data-id', i);
      $titles.append($title);

      $title.click(function(e) {//菜单栏的点击事件
        var i = Number(this.dataset.id);
        if(active === -1) {//没有点击时
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else if(active !== i) {//点击第几个
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else {
          menus[active].css({ display: 'none' });
          active = -1;
        }
        e.stopPropagation();
      });

      $title.hover(function() {//滑动时
        if(active !== -1) {
          var i = Number(this.dataset.id);
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        }
      });
    }
    $bar.append($titles);
  }

  function createMenus() {//创建下拉菜单
    for(var i=0; i<menuData.length; i++) {//行
      var $menus = $('<ul class="menus"></ul>');
      var items = menuData[i].menuItems;

      for(var j=0; j<items.length; j++) {//列
        if(items[j].title === 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
          continue;
        }

        var $menu = $('<li class="menu-item"></li>');//每个单元内容
        $menu.html(items[j].title);
        $menu.attr('data-x', i);
        $menu.attr('data-y', j);

        if(items[j].shortcut !== '') {
          var $shorcut = $('<span class="shortcut"></span>');
          $shorcut.html(items[j].shortcut);
          $menu.append($shorcut);
        }

        if(!items[j].enabled){
          $menu.addClass('disabled');
        }
        $menus.append($menu);

        $menu.click(function(e) {//内容点击事件
          e.stopPropagation();
          if($(this).hasClass('disabled')) {    
            return;
          }
          var i = this.dataset.x;
          var j = this.dataset.y;
          menus[i].css({display: 'none'});
          active = -1;
          menuData[i].menuItems[j].handler();
        });
      }
      $menus.css({
        width: menuData[i].width,
        left: menuData[i].left,
        display: 'none'
      });
      $bar.append($menus);
      menus.push($menus);
    }
  }

 
  function enabled(row, col, isEnabled) {//菜单栏是否禁用
    var menuItem = menus[row].find('.menu-item')[col];
    if(isEnabled) {//启用
      $(menuItem).removeClass('disabled');
    } else {//禁用
      $(menuItem).addClass('disabled');
    }
  }

  function hideMenu() {//隐藏菜单栏
    if(active === -1){
      return;
    }
    menus[active].css({display: 'none'});
    active = -1;
  }

  function init() {//初始化
    createMenuTitle();//创建菜单栏
    createMenus();//创建下拉菜单
    $('body').append($bar);
  }

  function show(data) {//显示
    menuData = data;//赋值
    init();//初始化
  }

  return {
    show: show,
    enabled: enabled,
    hideMenu: hideMenu
  };
}());
