// 静态代码检查
// eslint-disable-next-line
/* eslint-disable */ 
var $editor = (function() {
  //绘制编辑区DOM结构
  var $DOM = $(''+'<div class="notepad-editor">'+'<textarea spellcheck="false" auto-size="none"></textarea>'+'</div>');

  var $textArea = $DOM.find('textarea');
  var cfg = {
    contentHandler: null,
    wrap: false
  };

  //调整大小
  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  //获得焦点
  function focus() {
    $textArea.focus();
  }
  $textArea.keyup(function() {
    cfg.contentHandler($textArea.val() !== '');
  });

  //编辑区自动换行
  function setWrap(bWrap) {
    if(bWrap) {
      $textArea.attr('wrap', 'soft');
      $textArea.css({'overflow-x': 'hidden'});
    } else {
      $textArea.attr('wrap', 'off');
      $textArea.css({'overflow-x': 'scroll'});
    }
  }
  //设置字体
  function setFont(e) {
    $textArea.css({'font-family': e.family, 'font-size': e.size + 'pt'});
    if(e.style === '斜体') {
      $textArea.css({'font-style': 'italic'});
      return;
    }
    if(e.style === '粗体') {
      $textArea.css({'font-weight': 'bold'});
      return;
    }
    if(e.style === '粗偏斜体') {
      $textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }
  //显示
  function show(conf) {
    $.extend(cfg, conf);
    $('body').append($DOM);
    $textArea.trigger('focus');
    setWrap(cfg.wrap);
  }

  return {
    show: show,
    resize: resize,
    focus: focus,
    setWrap: setWrap,
    setFont: setFont
  };
}());
