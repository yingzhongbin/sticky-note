require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');

function Note(options){
  this.createNote(options)
  this.bindEvents()
}
Note.prototype = {

  defaultOptions:{
    id: '',   //Note的 id
    content: 'input here',  //Note 的内容
    over:false,
  },

  createNote(options){
    let tempOptions = {}
    Object.assign(tempOptions,this.defaultOptions,options)
    let tpl =  `
      <div class="note">
        <div class="note-title">
          <div class="note-time">${this.getTime(tempOptions.updatedAt)}</div>
          <div class="note-delete">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cha"></use>
            </svg>
          </div>
        </div>
        <div class="note-content" contenteditable="true">
        </div>
        <div class="note-imp-stars">
          <svg class="imp icon" aria-hidden="true">
            <use xlink:href="#icon-star"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-star"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
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
        </div>
      </div>
    `;
    this.$note = $(tpl)
    this.$note.attr('data-id',tempOptions.id)
    this.$note.find('.note-content').html(tempOptions.content)

    // 设定完成.done内容
    let doneTemp
    if(tempOptions.over){
      doneTemp = '<span class>已完成</span>'
      this.$note.find('.done').append($(doneTemp))
    }else{
      doneTemp = `
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duigou"></use>
          </svg>`
      this.$note.find('.done')[0].classList.add('over');
      this.$note.find('.done').append($(doneTemp))
    }

    //设定stars
    for(let i=0;i<tempOptions.stars;i++){
      this.$note.find('.note-imp-stars').children()[i].classList.add('imp')
    }

    // add的 添加className
    if(tempOptions.className === 'new'){
      this.$note[0].classList.add(tempOptions.className)
    }
    this.state = tempOptions
    $('#content').append(this.$note)

  },

  getTime(time){
    var date
    if(time){
      // 获取当前日期
      date = new Date(time);
    }else{
      date = new Date();
    }
    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    var nowDate = date.getFullYear() + '年' + nowMonth + '月' + strDate + '日';
    return nowDate
  },

  bindEvents(){
    // 点击删除
    this.$note.find('.note-delete').on('click',()=>{
      this.delete()
    })

    // 移出更新
    this.$note.on('mouseleave',()=>{
      //获取imp星级
      let svgs = this.$note.find('.note-imp-stars').find('svg')
      let stars = 0
      for(let i=0;i<svgs.length;i++){
        if(svgs[i].classList[1] === 'imp' || svgs[i].classList[0] === 'imp'){
          stars++
        }
      }
      // 获取note content
      let content = this.$note.find('.note-content').html()

      //获取是否完成
      let over = 0
      if(this.$note.find('.done.over').html() === undefined){
        over = 1
      }
      let nowState = {
        content,
        stars,
        over
      }
      'content over stars'.split(' ').forEach((item)=>{
        if(this.state[item] !== nowState[item]){
          this.state[item] = nowState[item]
          let opt = {
            content,
            stars,
            id:this.$note.attr('data-id'),
            over
          }
          this.update(opt)
        }
      })


    })

    //点击实现完成
    this.$note.find('.done.over').on('click', () => {
      let doneTemp = '<span class>已完成</span>'
      this.$note.find('.done.over').empty().append($(doneTemp))
          .removeClass('over')
    })

    //imp星级改变
    this.$note.find('.note-imp-stars').find('svg')
        .on('click',function(e) {
          e.currentTarget.classList.add('imp')
          for(let i=0;i<$(e.currentTarget).prevAll('svg').length;i++){
            $(e.currentTarget).prevAll()[i].classList.add('imp')
          }
          for(let i=0;i<$(e.currentTarget).nextAll('svg').length;i++){
            $(e.currentTarget).nextAll()[i].classList.remove('imp')
          }
        })

  },

  delete(){
    $.post('/api/notes/delete',{id:this.$note.attr('data-id')})
        .done((res)=>{
          if(res.status === 0){
            Toast('删除成功')
            this.$note.remove()
            Event.emit("waterfall")

          }else{
            Toast(res.errorMsg)
          }
        })
  },

  add(options){
    $.post('/api/notes/add',options)
        .done((res)=>{
          if(res.status === 0){
            Toast('添加成功')
            $('.note.new').attr('data-id',res.data.id)
            $('.note.new').removeClass('new')
            Event.emit("waterfall")
          }else{
            Toast(res.errorMsg)
          }
        })
  },

  update(options){
    $.post('/api/notes/update',options)
        .done((res)=>{
          if(res.status === 0){
            Toast('更新成功')
            Event.emit("waterfall")
          }else{
            Toast(res.errorMsg)
          }
        })
  }
}

module.exports.Note = Note
