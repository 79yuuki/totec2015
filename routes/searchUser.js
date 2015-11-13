var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var _ = require('lodash');

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
  
  if (findByUserId) {
    _.assign(mongoQuery, {userId: findByUserId});
  }
  if (findByUserPublicScoreGTE) {
    _.assign(mongoQuery, {userPublicScore: {$gte: Number(findByUserPublicScoreGTE)}});
  }
  if (findByUserPublicScoreLTE) {
    _.assign(mongoQuery, {userPublicScore: {$lte: Number(findByUserPublicScoreLTE)}});
  }
  if (findByUserFriendsNumberGTE) {
    // 友達の数をデータ長(１人８文字+カンマ)に変換
    var friendLength = Number(findByUserFriendsNumberGTE) * 9 - 1;
    _.assign(mongoQuery, {"$where": "this.userFriends.length >= " + friendLength});
  }/*
  if (findByUserFriendsNumberLTE) {
    _.assign(mongoQuery, {userFriends: {"$gte": findByUserFriendsNumberLTE.split(',').length}});
  }
  if (findByUserFriendsIncludeUserIds) {
    //_.assign(mongoQuery, {userFriends: {$in: }});
  }*/


  var limit = query.limit;
console.log('mongo query ===', mongoQuery);
  mongo.find('user', mongoQuery, {}, limit, function(result){
    // console.log(result);
    
    _.map(result, function(r){
      r.userFriends = r.userFriends.split(',')
    });

    res.json({result: true, data: result});
  });
});

module.exports = router;
