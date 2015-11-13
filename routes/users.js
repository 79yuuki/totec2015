var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  mongo.find('user', {userId: userId}, {userId: true, userPublicScore: true, userImage: true}, function(result){
    console.log(result);
    res.render('user', {user: result[0]});
  });
});

module.exports = router;
