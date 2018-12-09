require('less/index.less');
require('../lib/font.js')
let Toast = require('../mod/toast.js').Toast
let Event = require('../mod/event.js')
let Waterfall = require('../mod/waterfall.js')

let Note = require('../mod/note.js').Note
// new Note({context:"fuck"})



//跳转到note前的页面准备
$('.add-note').on('click', function(){
  if(localStorage.getItem('login') === 'false'){
    Toast('请先登录')
  }else{
    $('#new-note-cover').css('display','block')
    $('#new-note-container').css('display','flex')
  }
})

//添加note前的页面准备
$('.new-note-imp-stars svg')
    .on('mouseover',function(e) {
  e.currentTarget.classList.add('imp')
  for(let i=0;i<$(e.currentTarget).prevAll('svg').length;i++){
    $(e.currentTarget).prevAll()[i].classList.add('imp')
  }
})
    .on('click',function(e) {
  e.currentTarget.classList.add('chosen')
  for(let i=0;i<$(e.currentTarget).prevAll('svg').length;i++){
    $(e.currentTarget).prevAll()[i].classList.add('chosen')
  }
  for(let i=0;i<$(e.currentTarget).nextAll('svg').length;i++){
    $(e.currentTarget).nextAll()[i].classList.remove('chosen')
  }
})
    .on('mouseout',function(e) {
  e.currentTarget.classList.remove('imp')
  for(let i=0;i<$(e.currentTarget).prevAll('svg').length;i++){
    $(e.currentTarget).prevAll()[i].classList.remove('imp')
  }
})


// 添加一条note储存到数据库
$('#add-new-note').on('click', (e) => {
  console.log(e);
  let newNote = $(e.currentTarget).parent()
  let content = $(newNote.children()[1]).children('textarea').val()

  //清空添加便签框
  $(newNote.children()[1]).children('textarea').val('')

  let svgs = $(newNote.children()[2]).find('svg')
  let stars = 0
  for(let i=0;i<svgs.length;i++){
    if(svgs[i].classList[1] === 'chosen'){
      svgs[i].classList.remove('chosen')
      stars++
    }
  }
  console.log('清空添加便签框');
  NoteManager.add({stars,content})

  $('#new-note-cover').css('display','none')
  $('#new-note-container').css('display','none')


})

// 删除新建便签框
$('.note-delete').on('click',function (e) {
  console.log(e);
  console.log('deletexxxxx');
  //清空添加便签框
  let newNote = $(e.currentTarget).parent().parent()
  console.log(newNote);
  console.log((newNote.children()[1]));
  $(newNote.children()[1]).children('textarea').val('')

  let svgs = $(newNote.children()[2]).find('svg')
  let stars = 0
  for(let i=0;i<svgs.length;i++){
    if(svgs[i].classList[1] === 'chosen'){
      svgs[i].classList.remove('chosen')
      stars++
    }
  }
  $('#new-note-cover').css('display','none')
  $('#new-note-container').css('display','none')
})

//页面载入
let NoteManager = require('../mod/note-manager.js').NoteManager
NoteManager.load()


//瀑布流布局
Event.on('waterfall',function(){
  Waterfall.init('#content')
})

// 设定音乐
$('#play').on('click',function () {
  $('audio')[0].play()
})

