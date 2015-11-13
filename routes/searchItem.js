var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');
var _ = require('lodash');

/* GET items listing. */
router.get('/', function(req, res, next) {
  var query = req.query;
  // test1
  var findByItemId = query.findByItemId;
  var findByItemSupplier = decodeURIComponent(query.findByItemSupplier);
  var findByItemSoldQuantityGTE = query.findByItemSoldQuantityGTE;
  var findByItemSoldQuantityLTE = query.findByItemSoldQuantityLTE;
  var findByItemSalePriceGTE = query.findByItemSalePriceGTE;
  var findByItemSalePriceLTE = query.findByItemSalePriceLTE;
  var findByItemTagsIncludeAll = query.findByItemTagsIncludeAll;
  var findByItemTagsIncludeAny = query.findByItemTagsIncludeAny;

  var mongoQuery = {};
  
  if (findByItemId) {
    _.assign(mongoQuery, {itemId: findByItemId});
  }

  if (findByItemSupplier) {
    _.assign(mongoQuery, {itemNo: findByItemSupplier});
  }

  if (findByItemSoldQuantityGTE) {
    _.assign(mongoQuery, {itemSoldQuantity: {$gte: Number(findByItemSoldQuantityGTE)}});
  }

  if (findByItemSoldQuantityLTE) {
    _.assign(mongoQuery, {itemSoldQuantity: {$lte: Number(findByItemSoldQuantityLTE)}});
  }

  if (findByItemSalePriceGTE) {
    _.assign(mongoQuery, {itemSalePrice: {$gte: Number(findByItemSalePriceGTE)}});
  }

  if (findByItemSalePriceLTE) {
    _.assign(mongoQuery, {itemSalePrice: {$lte: Number(findByItemSalePriceLTE)}});
  }

  // TODO: findByItemTagsIncludeAll
  // TODO: findByItemTagsIncludeAny

  var limit = query.limit;
console.log('mongo query ===', mongoQuery);
  mongo.find('item', mongoQuery, {}, limit, function(result){
    // console.log(result);
    _.map(result, function(r){
      r.itemTags = r.itemTags.split(',')
    });

    res.json({result: true, data: result});
  });
});

module.exports = router;
