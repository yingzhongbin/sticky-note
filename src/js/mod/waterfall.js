let orderNotes = require('./order-notes').orderNotes
let Waterfall = (function(){
  let $content
  let items
  function min(arr){
    let minIndex = 0
    let minHeight = arr[minIndex]
    for(let i = 0; i<arr.length; i++){
      if(minHeight > arr[i]){
        minHeight = arr[i]
        minIndex = i
      }
    }
    return {
      minHeight,
      minIndex
    }
  }
  function render(content){
    // notes排序
    orderNotes()

    $content = $(content)
    items = $content.children()
    // 各列宽度
    let itemWidth = $(items[0]).outerWidth(true)-1
    // 共几列
    let columnNum = Math.floor(980/itemWidth)
    // 各列高度数组
    let colHeights = []
    // 初始化高度数组
    for(let i = 0; i<columnNum; i++){
      colHeights.push(0)
    }
    let {minHeight, minIndex} = min(colHeights)


    for(let i = 0; i<items.length;i++){
      $(items[i]).css({
        left:itemWidth*minIndex,
        top:colHeights[minIndex]
      })
      let fakeItems = $([items[i]])
      colHeights[minIndex] += fakeItems.outerHeight(true)
      minHeight = min(colHeights).minHeight
      minIndex = min(colHeights).minIndex
    }
  }
  // $(window).on('resize',function() {
  //   render($content[0])
  // })
  return {
    init: render
  }
})()
// Waterfall.init('#container')

module.exports = Waterfall