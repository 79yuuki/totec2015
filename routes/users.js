var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var async = require('neo-async');
var _ = require('lodash');

function si(userId, callback) {
  var limit = 8;
  mongo.find('post', {postUserId: userId }, {}, limit, function(results){
    var parallels = [];

    // 8件のデータから画像パスとる
    var itemIds = [];
    results.forEach(function(result){
      itemIds.push(result.postItemId);
    });

    mongo.find('item', {itemId: {$in: itemIds}}, {}, 8, function(itemres){
      var i = [];
      itemres.forEach(function(item){
        i.push(item.itemImage);
      });
      return callback(i);
    });

  });
};

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  mongo.find('user', {userId: userId}, {userId: true, userPublicScore: true, userImage: true, userFriends: true}, undefined, function(result){
    // console.log(result);
    var r = result[0];
    var parallels = [];
    parallels.push(
      function(done) {
        si(userId, done);
      }
    );

    // TODO sp

    async.parallel(parallels, function(result){

      var user = {
        userId: r.userId,
        userPublicScore: r.userPublicScore,
        userImage: r.userImage,
        userFriends: r.userFriends.split(',')
      };
console.log('search============', result);
      res.render('user', {user: user, searchItem: result});
    });
  });
});

module.exports = router;
