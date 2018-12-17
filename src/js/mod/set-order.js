let Waterfall = require('../mod/waterfall.js')
module.exports = !function () {
  $('#asc-order').on('click',function () {
    $('#asc-order').addClass('chosen')
    $('#des-order').removeClass('chosen')
    localStorage.setItem('sort',true)
    Waterfall.init('#content')
  })
  $('#des-order').on('click',function () {
    $('#asc-order').removeClass('chosen')
    $('#des-order').addClass('chosen')
    localStorage.setItem('sort',false)
    Waterfall.init('#content')
  })
}()