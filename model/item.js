/**
 * Created by LINMA3 on 11/10/2015.
 */

var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var itemScheMa = new Schema({
	//"_id" : {type: String}
     "item_product_id":{type: String}
    "item_product_name" : {type: String}
    "item_shop_name" : {type: String}
    "item_brand" : {type: String}
    "item_price" : {type: String}
    "item_comment_count" : {type: String}
    "item_url": { type: String}
    "update_time" : {type: String}
});
exports.item = mongoose.model('item_detail', itemScheMa);
