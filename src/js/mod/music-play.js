module.exports = !function () {
  // 设定音乐
  let audio = document.getElementById("music");
  $('#music-open').on('click',function () {
    console.log('music-open');
    audio.play();
    $('#music-open').addClass('chosen')
    $('#music-close').removeClass('chosen')
  })
  $('#music-close').on('click',function () {
    console.log('music-close');
    audio.pause();
    $('#music-close').addClass('chosen')
    $('#music-open').removeClass('chosen')
  })
}()