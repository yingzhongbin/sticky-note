module.exports = !function () {
  // 设定音乐
  let audio = document.getElementById("music");
  $('#music-open').on('click',function () {
    console.log('music-open');
    audio.play();
    $('#music-open').hide()
    $('#music-close').show()
  })
  $('#music-close').on('click',function () {
    console.log('music-close');
    audio.pause();
    $('#music-close').hide()
    $('#music-open').show()
  })
}()