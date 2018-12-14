module.exports = !function(){

  //设置fix-container随页面滚动而滚动
  $('#fix-container').css('top',(window.scrollY+window.innerHeight-200)+'px')
  $(window).on('scroll',()=>{
    $('#fix-container').css('top',(window.scrollY+window.innerHeight-200)+'px')
  })

  //回到顶部
  $('#up-icon').on('click',()=>{
    // Setup the animation loop.
    const TWEEN = require('@tweenjs/tween.js');
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    var coords = { y: scrollY }; // Start at (0, 0)
    var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({ y: 0 }, 500) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
        .onUpdate(function(e) { // Called after tween.js updates 'coords'.
          window.scrollTo(0, coords.y);
          $('#fix-container').css('top',(coords.y+window.innerHeight-200)+'px')
        })
        .start(); // Start the tween immediately.
  })

  //跳转到note前的页面准备
  $('.add-note').on('click', function(){
    if(localStorage.getItem('login') === 'false'){
      Toast('请先登录')
    }else{
      $('#new-note-cover').css('display','block')
      $('#new-note-container').css('display','flex')
    }
  })
}()
