let NoteManager = require('../mod/note-manager.js').NoteManager
let Event = require('../mod/event.js')
let Waterfall = require('../mod/waterfall.js')
module.exports = !function () {
  //页面载入
  NoteManager.load()

  //瀑布流布局
  Event.on('waterfall',function(){
    Waterfall.init('#content')
  })
}()