let NoteManager = require('../mod/note-manager.js').NoteManager
module.exports = !function () {
  //nav点击设置


  //nav-all设置  全部
  $('#nav-all').on('click',(e)=>{
    if(!$('#nav-all').hasClass('active')){
      document.getElementById('content').innerHTML = "";
      $('#nav-all').addClass('active')
      $('#nav-no-over').removeClass('active')
      $('#nav-over').removeClass('active')
      NoteManager.load()
    }
  })
  //nav-no-over设置 未完成 0
  $('#nav-no-over').on('click',()=>{
    if(!$('#nav-no-over').hasClass('active')) {
      document.getElementById('content').innerHTML = "";
      $('#nav-no-over').addClass('active')
      $('#nav-over').removeClass('active')
      $('#nav-all').removeClass('active')
      NoteManager.load(0)
    }
  })
  //nav-over设置 已完成 1
  $('#nav-over').on('click',()=>{
    if(!$('#nav-over').hasClass('active')) {
      document.getElementById('content').innerHTML = "";
      $('#nav-over').addClass('active')
      $('#nav-no-over').removeClass('active')
      $('#nav-all').removeClass('active')
      NoteManager.load(1)
    }
  })

  // 范围选择
  $('#scope').find('li').on('click',function (e) {
    // $('#scope').find('span').html(e.currentTarget.innerHTML)
    let text = e.currentTarget.innerHTML
    $(e.currentTarget).addClass('chosen').siblings().removeClass('chosen')
    if(text === '全部'){

    }else if(text === '未完成'){

    }else if(text === '已完成'){

    }
  })
}()