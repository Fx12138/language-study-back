var express = require('express')
var router = express.Router()
var resJson = require('../../doc/resJson')

const Article = require('../../models/articleModel')

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

//根据文章id获取文章
router.get('/getArticlesById', (req, res) => {

    Article.findOne({ _id: req.query.articleId }).then((article) => {
        if (article) {
            return res.json(resJson(article, '获取成功', 200))
        } else {
            return res.json({ msg: "无" })
        }

    })
})

//根据文章id添加评论
router.post('/comment', (req, res) => {
    let articleId = req.body.articleId;
    let commentContent = req.body.commentContent;
    // let commentUserId = req.body.commentUserId;
    let commentDate = (new Date()).toDateString;

    Article.findOne({ _id: articleId }).then(article => {
        if (article) {
            let comment = article.comment;
            let newcomment = {
                content: commentContent,
                time: commentDate
            }
            comment.push(newcomment)

            // 更新数据的条件查询
            var wherestr = { '_id': articleId };
            // 执行更新数据
            var updatestr = { 'comment': comment };

            Article.findOneAndUpdate(wherestr, updatestr, (err, result) => {
                Article.findOne({ _id: articleId }).then((article) => {
                    return res.json(resJson(article.comment, '评论成功', 200))
                })
                // return res.json(resJson(result, '加入房间成功', 200))
            })
        }
    })
})

module.exports = router