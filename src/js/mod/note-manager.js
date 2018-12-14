var Toast = require('./toast').Toast
var Note = require('./note').Note
var Waterfall = require('./waterfall')

var NoteManager = (function(){
  function load(choose = 2){
    $.get('api/notes')
        .done(function(res){
          if(res.status === 0){
            if(choose === 2 && res.data[0] !== undefined){
              $.each(res.data, function (index, value) {
                let options = Object.assign({},value)
                new Note(options)
              })
            }else if(choose === 1 && res.data[0] !== undefined){//over
              console.log(res.data[0]);
              $.each(res.data, function (index, value) {
                let options = Object.assign({},value)
                if(options.over == 1){
                  new Note(options)
                }
              })
            }else if(res.data[0] !== undefined){
              console.log(res.data[0]);
              $.each(res.data, function (index, value) {
                let options = Object.assign({},value)
                if(options.over == 0){
                  new Note(options)
                }
              })
            }
            let welcome = `
            <div class="note welcome">
              <div class="note-title">
                <div class="note-time">xxxx年x月xx日</div>
                <div class="note-delete">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-cha"></use>
                  </svg>
                </div>
              </div>
              <div class="note-content">
                欢迎使用FDonkey在线便利贴！
              </div>
              <div class="note-imp-stars">
                <svg class="imp icon" aria-hidden="true">
                  <use xlink:href="#icon-star"></use>
                </svg>
                <svg class="imp icon" aria-hidden="true">
                  <use xlink:href="#icon-star"></use>
                </svg>
                <svg class="imp icon" aria-hidden="true">
                  <use xlink:href="#icon-star"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-star"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-star"></use>
                </svg>
              </div>
              <div class="done">
                已完成
              </div>
            </div>
            `
            $('#content').prepend($(welcome))
            Waterfall.init('#content')
            localStorage.setItem('login',true)
          }else{
            Toast(res.errorMsg)
            localStorage.setItem('login',false)
          }
        })
        .fail(function(){
          Toast('请先登录')
        })
  }
  function add(options){
    let newNote = new Note(options)
    options = Object.assign({},options,{over:false})
    newNote.add(options)
    Waterfall.init('#content')
    window.scrollTo(0,document.body.scrollHeight);

  }
  return {
    add,
    load
  }
})()
module.exports.NoteManager = NoteManager