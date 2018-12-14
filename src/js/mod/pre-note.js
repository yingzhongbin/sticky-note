let NoteManager = require('../mod/note-manager.js').NoteManager
module.exports = !function () {
  //添加note前的页面准备 imp星级计算
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
    let newNote = $(e.currentTarget).parent()
    let content = $(newNote.children()[1]).children('textarea').val()

    //清空添加便签框
    $(newNote.children()[1]).children('textarea').val('')

    //获取imp星级
    let svgs = $(newNote.children()[2]).find('svg')
    let stars = 0
    for(let i=0;i<svgs.length;i++){
      if(svgs[i].classList[1] === 'chosen'){
        svgs[i].classList.remove('chosen')
        stars++
      }
    }
    NoteManager.add({stars,content,className:'new'})

    $('#new-note-cover').css('display','none')
    $('#new-note-container').css('display','none')


  })

  // 删除新建便签*框*
  $('.note-delete').on('click',function (e) {
    //清空添加便签框
    let newNote = $(e.currentTarget).parent().parent()
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

}()