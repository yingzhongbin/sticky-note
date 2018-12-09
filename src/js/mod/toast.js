require('../../less/toast.less')
function toast(msg, time){
  this.msg = msg
  this.time = time
  this.createToast()
  this.showToast()
}
toast.prototype = {
  createToast(){
    let template = `<div class="toast">${this.msg}</div>`
    this.$toast = $(template)
    $('body').append(this.$toast)
  },
  showToast(){
    let self = this
    this.$toast.fadeIn(600,function(){
      setTimeout(function () {
        self.$toast.fadeOut(600,function(){
          self.$toast.remove()
        })
      },self.time)
    })
  }
}
function Toast(msg,time) {
  return new toast(msg,time)
}
window.Toast = Toast
module.exports.Toast = Toast