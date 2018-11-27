var express = require('express');
var router = express.Router();

router.use('/:id', function(req, res, next) {
  //   http://localhost:3000/xxx/111asddasdasda success
  res.send(req.params.id);
});
module.exports = router;
