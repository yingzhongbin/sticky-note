var Toast = require('./toast').Toast
var Note = require('./note').Note
var Waterfall = require('./waterfall')

var NoteManager = (function(){
  function load(choose = 2){
    $.get('api/notes')
        .done(function(res){
          if(res.status === 0){
            if(choose === 2){
              $.each(res.data, function (index, value) {
                console.log(value);
                let options = Object.assign({},value)
                new Note(options)
              })
            }else if(choose === 1){//over
              $.each(res.data, function (index, value) {
                let options = Object.assign({},value)
                if(options.over == 1){
                  new Note(options)
                }
              })
            }else{
              $.each(res.data, function (index, value) {
                let options = Object.assign({},value)
                if(options.over == 0){
                  new Note(options)
                }
              })
            }
            Waterfall.init('#content')
            localStorage.setItem('login',true)
          }else{
            Toast(res.errorMsg)
            console.log('api/notes false');
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
    console.log('NoteManager');
    Waterfall.init('#content')
    window.scrollTo(0,document.body.scrollHeight);

  }
  return {
    add,
    load
  }
})()
module.exports.NoteManager = NoteManager