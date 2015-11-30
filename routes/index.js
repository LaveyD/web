var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    //  创建模型
var itemScheMa = new Schema({
    "item_product_id":{type: String},
    "item_product_name" : {type: String},
    "item_shop_name" : {type: String},
    "item_brand" : {type: String},
    "item_price" : {type: String},
    "item_comment_count" : {type: String},
    "item_url": {type: String},
    "update_time" : {type: String}
},{collection: "item_detail"});
var item = mongoose.model('item_detail', itemScheMa);
mongoose.connect('mongodb://10.222.49.44:27017/JDITEMS');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//get data from mogodb
router.get('/item', function(req, res, next) {
//    item.find({}, function(err, doc){
//                if (err) {
//                    console.log('FATAL '+ err);
//                    done(err, null);
//                }else {
//                    console.log(doc);
//                    res.json(doc);
//                }
//            }).limit(2);
    var result=item.find({});
    result.exec(function (err, docs) {
    	//console.log(docs);
    	var arr2 = new Array();
    	for (var i = 0; i <= docs.length - 1; i++) {
    		var arr1 = new Array(8);
    		arr1[0]=docs[i].item_product_id;
    		arr1[1]=docs[i].item_product_name;
    		arr1[2]=docs[i].item_shop_name;
    		arr1[3]=docs[i].item_brand;
    		arr1[4]=docs[i].item_price;
    		arr1[5]=docs[i].item_comment_count;
            arr1[6]=docs[i].item_url;
    		arr1[7]=docs[i].update_time;

    		arr2[i]=arr1;
    	};
    	//var str = JSON.stringify(docs);
    	//str = str.substring(1,str.length-1);
    	//console.log(arr2);
        //res.json(eval("(" + str + ")"));
        res.json({"aaData":arr2})
    });
});

router.get('/chart/',function(req,res,next){
    /*************find by item_product_id*************/
    console.log("I'm here test");
    var product_Id = req.query.id; 
    // find by id
    var result=item.find({item_product_id:product_Id}); 
    result.exec(function (err, docs) {
      var itemMap={};
        for (var i = 0; i <= docs.length - 1; i++) {
             var price=new Array(2);
             var date=new Date(docs[i].update_time);
             price[0]=date.getTime();
             price[1]=Number(docs[i].item_price);
            if(itemMap[docs[i].item_product_id]==undefined){
                var temp=[];
                temp.push(price);
                itemMap[docs[i].item_product_id]=temp;         
            }else{
                itemMap[docs[i].item_product_id].push(price);
            }
        };
        res.json({"chart_price":itemMap})
         });
});
router.get('/charts',function(req,res,next){
    //find all the items out
    var result=item.find({});
    result.exec(function (err, docs) {
      var itemMap={};
        for (var i = 0; i <= docs.length - 1; i++) {
             var price=new Array(2);
             var date=new Date(docs[i].update_time);
             price[0]=date.getTime();
             price[1]=Number(docs[i].item_price);
            if(itemMap[docs[i].item_product_id]==undefined){
                var temp=[];
                temp.push(price);
                itemMap[docs[i].item_product_id]=temp;         
            }else{
                itemMap[docs[i].item_product_id].push(price);
            }
        };
        res.json({"chart_price":itemMap})
         });
});
module.exports = router;
