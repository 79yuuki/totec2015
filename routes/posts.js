var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var async = require('neo-async');

/* GET users listing. */
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;
/*  mongo.find('post', {postId: postId}, {postId: true, postItemId: true, postUserId: true, postDateTime: true, postItemScore: true, postItemState: true, postLikeUsers: true}, function(result){
    // console.log(result);
    var r = result[0];
    var d = new Date(postDateTime * 1000);
    var date = d.getYear() + "年" + (d.getMonth() + 1) + '月' + d.getDate() + "日 " 
    + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    parallels.push(function (done){
      mongo.find('item', {itemId: r.postItemId}, {itemId: true, itemImage: true, itemSupplier:true, itemSolidQuantity:true, itemSalePrice: true, itemTags: true}, function(itemResult){
        var item = itemResult[0];

        mongo.find('user', {});

        var user = {
          postId: r.postId,
          postItem: item,
          postUserId: r.postUserId,
          postDateTime: date,
          postItemScore: r.postItemScore,
          postItemState: r.postItemState,
          postLikeUsers: r.postLikeUsers
        };
        res.render('user', {user: user});
      });
    });
    parallels.push();
    async.parallel([parallels]);
  });*/
 res.render('post');
});

module.exports = router;
