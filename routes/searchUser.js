var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = req.query;
  // test1
  var findByUserId = query.findByUserId;
  var findByUserPublicScoreGTE = query.findByUserPublicScoreGTE;
  var findByUserPublicScoreLTE = query.findByUserPublicScoreLTE;
  var findByUserFriendsNumberGTE = query.findByUserFriendsNumberGTE;
  var findByUserFriendsNumberLTE = query.findByUserFriendsNumberLTE;
  var findByUserFriendsIncludeUserIds = query.findByUserFriendsIncludeUserIds;
  var findByUserFriendsNotIncludeUserIds = query.findByUserFriendsNotIncludeUserIds;

  var mongoQuery = {};

  mongo.find('user', {userId: findByUserId}, {userId: true, userPublicScore: true, userFriends: true}, function(result){
    // console.log(result);
    var r = result[0];

    if (findByUserPublicScoreGTE) {
      if (findByUserPublicScoreGTE < r.userPublicScore) {
        res.json();
      }
    }

    var user = {
      userId: r.userId,
      userPublicScore: r.userPublicScore,
      userImage: r.userImage,
      userFriends: r.userFriends.split(',')
    };
    res.json(r);
  });
});

module.exports = router;
