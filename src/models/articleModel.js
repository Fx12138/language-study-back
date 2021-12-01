const mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
    title: {
        type: String,
        default: "无"
    },
    id: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: "什么也没写哦!"
    },
    categoryCode: {
        type: Number,
        default: 0
    },
    publishTime: String,
    modifyTime: String
})

//将文档结构发布为模型
module.exports = Article = mongoose.model('Article', articleSchema, 'articles');