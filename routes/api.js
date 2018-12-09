var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

router.get('/notes', function(req, res, next) {
  var opts = {raw:true}
  if(req.session && req.session.user){
    console.log(req.session.user.id);
    opts.where = {
      uid:req.session.user.id
    }
  }
  else{
    return res.send({ status: 1,errorMsg: '请登录'});
  }
  Note.findAll(opts).then(data => {
    console.log(data);
    res.send({status: 0, data: data});
  }).catch(function(e){
    res.send({ status: 1,errorMsg: 'xxxx数据库异常'});
  });
});
router.post('/notes/add', function(req, res, next) {
  console.log('/notes/add');
  console.log('stars',req.body);
  console.log('stars',req.body.stars);
  console.log('over',req.body.over);
  console.log(typeof req.body.stars);
  console.log(typeof req.body.over);
  if(req.session.user){
    Note.create({
      content: req.body.content,
      uid:req.session.user.id,
      stars:req.body.stars,
      over:req.body.over
    }).then(data => {
      res.send({status: 0, data: data});
    }).catch(function(){
      res.send({ status: 1,errorMsg: '数据库异常'});
    });
  }else{
    res.send({ status: 1,errorMsg: '请先登录'});
  }

});
router.post('/notes/update', function(req, res, next) {
  console.log(req.session.user.id);
  Note.update({
    content: req.body.content
  }, {
    where: {
      id: req.body.id,
      uid:req.session.user.id
    }
  }).then(data => {
    res.send({status: 0, data: data});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '更新失败'});
  });

});
router.post('/notes/delete', function(req, res, next) {
  console.log('delete');
  console.log(req.body.id);
  console.log(req.session.user.id);
  Note.destroy({
    where: {
      id: req.body.id,
      uid:req.session.user.id
    },
  }).then(data => {
    res.send({status: 0, data: data});
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});


module.exports = router;
