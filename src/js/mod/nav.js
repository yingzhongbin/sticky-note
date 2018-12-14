let NoteManager = require('../mod/note-manager.js').NoteManager
module.exports = !function () {
  //nav点击设置
//nav-all设置
  $('#nav-all').on('click',(e)=>{
    if(!$('#nav-all').hasClass('active')){
      console.log(document.getElementById('content').innerHTML);
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
      console.log(document.getElementById('content').innerHTML);
      document.getElementById('content').innerHTML = "";
      $('#nav-no-over').addClass('active')
      $('#nav-over').removeClass('active')
      $('#nav-all').removeClass('active')
      NoteManager.load(0)
    }
  })
//nav-over设置 完成 1
  $('#nav-over').on('click',()=>{
    if(!$('#nav-over').hasClass('active')) {
      console.log(document.getElementById('content').innerHTML);
      document.getElementById('content').innerHTML = "";
      $('#nav-over').addClass('active')
      $('#nav-no-over').removeClass('active')
      $('#nav-all').removeClass('active')
      NoteManager.load(1)
    }
  })
}()