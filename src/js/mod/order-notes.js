function orderNotes () {
  // if($('#content').children('.note').length>0){
  //   $('#content')[0].innerHTML = ''
  // }
  let $notes = $('#content').children('.note')
  let sort = localStorage.getItem('sort')
  console.log('sort',sort);
  console.log(typeof $notes);
  if(sort === null || sort === 'false'){
    $notes.sort(function(a, b) {
      console.log(a);
      console.log(b);
      var starsA = $(a).find('.note-imp-stars').find('.imp.icon').length
      var starsB = $(b).find('.note-imp-stars').find('.imp.icon').length
      if (starsA > starsB) {
        return -1;
      }
      if (starsA < starsB) {
        return 1;
      }
      return 0;
    });
  }else{
    $notes.sort(function(a, b) {
      console.log(a);
      console.log(b);
      var starsA = $(a).find('.note-imp-stars').find('.imp.icon').length
      var starsB = $(b).find('.note-imp-stars').find('.imp.icon').length
      if (starsA < starsB) {
        return -1;
      }
      if (starsA > starsB) {
        return 1;
      }
      return 0;
    });
  }
  console.log($notes);
  $('#content').append($notes)
}
module.exports.orderNotes = orderNotes