var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  mongo.find('user', {userId: userId}, {userId: true, userPublicScore: true, userImage: true, userFriends: true}, function(result){
    // console.log(result);
    var r = result[0];
    var user = {
      userId: r.userId,
      userPublicScore: r.userPublicScore,
      userImage: r.userImage,
      userFriends: r.userFriends.split(',');
    };
    res.render('user', user);
  });
});

module.exports = router;
