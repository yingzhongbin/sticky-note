var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //   http://localhost:3000/?name=xxxx
  //  console.log(req.query);
  console.log(req.session);
  if(req.session.user){
    res.render('index', {
      isLogin:true,
      user:req.session.user
    });
  }else{
    res.render('index', {
      isLogin:false
    });
  }
});

module.exports = router;
