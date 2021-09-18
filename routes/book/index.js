var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/book', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
  res.send("asdaas")
});
router.get('/book/index', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;