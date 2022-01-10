var express = require('express')
var router = express.Router()
var resJson = require('../../doc/resJson')

const Comment = require('../../models/commentModel')


//根据文章id获得评论
router.get('/comment', (req, res) => {

    Comment.find({ articleId: req.query.articleId }).then((comments) => {
        if (comments) {
            return res.json(resJson(comments, '获取成功', 200))
        } else {
            return res.json({ msg: "不存在" })
        }
    })
})

//根据文章id添加评论
router.post('/comment', (req, res) => {
    let articleId = req.body.articleId;
    let content = req.body.content;
    let fromUser = req.body.fromUser;
    let date = getFullTime()
    const newComment = new Comment({
        content: content,
        articleId: articleId,
        fromUser: fromUser,
        date: date
    })
    newComment.save().then(() => {
        res.send('发表成功')
    })

})

function getFullTime() {
    let date = new Date(),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
        h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
        m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    return `${Y}年${M}月${D}日 ${h}:${m} `
}

module.exports = router