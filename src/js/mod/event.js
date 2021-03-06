let EventCenter = (function(){
  let center = {}
  function on(event,handler){
    center[event] = center[event] || []
    center[event].push({handler})
  }
  function emit(event,arg){
    if(!center[event]){
      return
    }else{
      for(let i=0;i<center[event].length;i++){
        center[event][i].handler(arg)
      }
    }
  }
  return {
    on:on,
    emit:emit
  }
})()
module.exports = EventCenter
