var express = require('express')
var router = express.Router()
var resJson = require('../doc/resJson')

const Article = require('../models/articleModel')

//发布文章
router.post('/publish', (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save().then(() => {
        res.send('发表成功')
    })
})

//获取所有文章
router.get('/getArticles', (req, res) => {

    Article.find({ categoryCode: req.query.categoryCode }).then((articles) => {
        if (articles) {
            return res.json(resJson(articles, '获取成功', 200))
        } else {
            return res.json({ msg: "用户不存在" })
        }

    })


})

module.exports = router