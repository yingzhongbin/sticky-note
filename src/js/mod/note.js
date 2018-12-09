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
    console.log('createNote');
    console.log(options);
    console.log(tempOptions);
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

    $('#content').append(this.$note)

    // 点击完成
    // console.log(this.$note);
    // console.log(this.$note.find('.done'));
    //     .on('click',function () {
    //   let doneTemp = '<span class>已完成</span>'
    //   console.log(this.$note.find('.done'));
    //   // .empty().append($(doneTemp))
    // })

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
    this.$note.find('.delete').on('click',()=>{
      this.delete()
    })
    this.$note.find('.note-content').on('blur',()=>{
      let content = this.$note.find('.note-content').html()
      if(this.$note.hasClass('new-note')){
        console.log('wozaizili');
        this.add(content)
      }else{
        console.log('wozaizili22222');
        this.update(content,this.$note.attr('data-id'))
      }
    })
    this.$note.find('.note-head').on('mousedown',(e)=>{
      this.$note.addClass('draggable')//便利贴变暗
      // 设定鼠标到便利贴的位置数据
      let x = e.pageX - this.$note.offset().left
      let y = e.pageY - this.$note.offset().top
      this.$note.data('relativePosition',{x,y})
    }).on('mouseup',()=>{
      this.$note.removeClass('draggable')//便利贴变亮
    })
    $('body').on('mousemove',(e)=>{
      if(this.$note.hasClass('draggable')){
        console.log(e.pageX, e.pageY);
        this.$note.offset({
          left:e.pageX - this.$note.data('relativePosition').x,
          top:e.pageY - this.$note.data('relativePosition').y
        })
      }
    })

    //点击实现完成
    this.$note.find('.done.over').on('click', () => {
      let doneTemp = '<span class>已完成</span>'
      this.$note.find('.done.over').empty().append($(doneTemp))
          .removeClass('over')
    })

  },

  delete(){
    $.post('/api/notes/delete',{id:this.$note.attr('data-id')})
        .done((res)=>{
          console.log('删除成功');
          console.log(res);
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
    console.log('add');
    console.log(options);
    console.log(typeof options.stars);
    $.post('/api/notes/add',options)
        .done((res)=>{
          console.log(res);
          if(res.status === 0){
            Toast('xxx添加成功')
            console.log('success');
            console.log(res.data);
            console.log($('#content').find('.note.new-note'));
            $('.note.new-note').attr('data-id',res.data.id)
            $('.note.new-note').removeClass('new-note')
            console.log('success');
            Event.emit("waterfall")
          }else{
            console.log('xxx');
            Toast(res.errorMsg)
          }
        })
  },

  update(content,id){
    console.log('update');
    console.log(content);
    console.log(id);
    $.post('/api/notes/update',{content,id})
        .done((res)=>{
          if(res.status === 0){
            Toast('更新成功')
            console.log('update success');
            Event.emit("waterfall")
          }else{
            Toast(res.errorMsg)
          }
        })
  }
}

module.exports.Note = Note
