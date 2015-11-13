var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var async = require('neo-async');

/* GET users listing. */
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;
  mongo.find('post', {postId: postId}, {postId: true, postItemId: true, postUserId: true, postDateTime: true, postItemScore: true, postItemState: true, postLikeUsers: true}, function(result){
    var r = result[0];
    var d = new Date(r.postDateTime * 1000);
    var date = d.getYear() + "年" + (d.getMonth() + 1) + '月' + d.getDate() + "日 " 
    + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    var parallels = [];
    parallels.push(function (done){
      mongo.find('item', {itemId: r.postItemId}, {itemId: true, itemImage: true, itemSupplier:true, itemSoldQuantity:true, itemSalePrice: true, itemTags: true}, function(itemResult){
        done({item: itemResult[0]});
      });
    });
    parallels.push(function (done){
      mongo.find('user', {userId: r.postUserId}, {userImage: true}, function(userResult){
        done(userResult[0].userImage);
      });
    });
    async.parallel(parallels, function(pararesult){
      var post = {
        postId: r.postId,
        postItem: pararesult.item,
        postUserId: r.postUserId,
        postUserImage: pararesult.userImage,
        postDateTime: date,
        postItemScore: r.postItemScore,
        postItemState: r.postItemState,
        postLikeUsers: r.postLikeUsers.split(',')
      };
      res.render('post', {post: post, item: pararesult.item, userImage: pararesult.userImage});
    });
  });
});

module.exports = router;
