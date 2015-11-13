var express = require('express');
var router = express.Router();
var mongo = require('../lib/mongo.js');

/* GET users listing. */
router.get('/:itemId', function(req, res, next) {
  var itemId = req.params.itemId;
  mongo.find('item', {itemId: itemId}, {itemId: true, itemImage: true, itemSupplier: true, itemSolidQuantity: true, itemSalePrice: true, itemTags: true}, undefined, function(result){
    // console.log(result);
    var r = result[0];
    var item = {
      itemId: r.itemId,
      itemImage: r.itemImage,
      itemSupplier: r.itemSupplier,
      itemSolidQuantity: r.itemSolidQuantity,
      itemSalePrice: r.itemSalePrice,
      itemTags: r.itemTags.split(',')
    };
    res.render('item', {item: item});
  });
});

module.exports = router;
