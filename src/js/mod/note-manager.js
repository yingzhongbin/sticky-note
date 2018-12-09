var Toast = require('./toast').Toast
var Note = require('./note').Note
var Waterfall = require('./waterfall')

var NoteManager = (function(){
  function load(){
    $.get('api/notes')
        .done(function(res){
          if(res.status === 0){
            $.each(res.data, function (index, value) {
              let options = Object.assign({},value)
              new Note(options)
              Waterfall.init('#content')
            })
            console.log('api/notes true');
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
    console.log(typeof options.stars);
    // Waterfall.init('#content')
  }
  return {
    add,
    load
  }
})()
module.exports.NoteManager = NoteManager