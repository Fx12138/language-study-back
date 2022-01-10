const mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
    content: {
        type: String,
        default: "什么也没写哦!"
    },
    articleId: {
        type: String,
        required: true,
        default: '61a7392e48d9098f252b7ec0'
    },
    fromUser: {
        id: {
            type: Number,
            default: 0
        },
        username: {
            type: String,
            default: "等待玩家"
        },
        avatar: {
            type: String,
            default: "https://pics2.baidu.com/feed/d439b6003af33a87d09366a244ca5f3e5243b52c.jpeg?token=19c07c3198e503f6ef6eda74ad4be6d2&s=50B00C734B5172D44F8051EC0300E023"
        },
    },
    date: String,
})

//将文档结构发布为模型
module.exports = Comment = mongoose.model('Comment', commentSchema, 'comments');