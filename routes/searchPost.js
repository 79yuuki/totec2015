var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var _ = require('lodash');

/* GET posts listing. */
router.get('/', searchPost);
function searchPost(req, res, next) {
  var query = req.query;
  // test1
  var findByPostId = query.findByPostId;
  var findByPostDateTimeGTE = query.findByPostDateTimeGTE;
  var findByPostDateTimeLTE = query.findByPostDateTimeLTE;
  var findByPostUserId = query.findByPostUserId;
  var findByPostItemId = query.findByPostItemId;
  var findByPostItemScoreGTE = query.findByPostItemScoreGTE;
  var findByPostItemScoreLTE = query.findByPostItemScoreLTE;

  // 
  var findByPostItemState = decodeURIComponent(query.findByPostItemState || '');
  var findByPostItemStateNotEQ = decodeURIComponent(query.findByPostItemStateNotEQ || '');

  //
  var mongoQuery = {};
  
  if (findByPostId) {
    _.assign(mongoQuery, {postId: findByPostId});
  }

  if (findByPostDateTimeGTE) {
    _.assign(mongoQuery, {postDateTime: {$gte: Number(findByPostDateTimeGTE)}});
  }

  if (findByPostDateTimeLTE) {
    _.assign(mongoQuery, {postDateTime: {$lte: Number(findByPostDateTimeLTE)}});
  }

  if (findByPostUserId) {
    _.assign(mongoQuery, {postUserId: findByPostUserId});
  }

  if (findByPostUserId) {
    _.assign(mongoQuery, {postUserId: findByPostUserId});
  }

  if (findByPostItemId) {
    _.assign(mongoQuery, {postItemId: findByPostItemId});
  }

  if (findByPostItemScoreGTE) {
    _.assign(mongoQuery, {postItemScore: {$gte: Number(findByPostItemScoreGTE)}});
  }

  if (findByPostItemScoreLTE) {
    _.assign(mongoQuery, {postItemScore: {$lte: Number(findByPostItemScoreLTE)}});
  }

  if (findByPostItemState) {
    _.assign(mongoQuery, {postItemState: findByPostItemState});
  }

  if (findByPostItemStateNotEQ) {
    _.assign(mongoQuery, {postItemState: {$ne: findByPostItemStateNotEQ}});
  }

  var limit = query.limit;
  console.log('mongo query ===', mongoQuery);
  mongo.find('post', mongoQuery, {}, limit, function(result){
    // console.log(result);
    _.map(result, function(r){
      r.postLikeUsers = r.postLikeUsers.split(',')
      r.postTags = r.postTags.split(',')
    });

    res.json({result: true, data: result});
  });
};

module.exports = router;
