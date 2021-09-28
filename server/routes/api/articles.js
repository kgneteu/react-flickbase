const express = require("express");
const {checkLoggedIn} = require("../../middleware/auth");
const {grantAccess} = require("../../middleware/roles");
const {Article} = require("../../models/article_model");
const {sortArgsHelper} = require("../../config/helpers");
let router = express.Router();

router.route('/admin/add_article')
    .post(checkLoggedIn, grantAccess('createAny', 'article'), async (req, res) => {
        try {
            const article = new Article({
                ...req.body,
                score: parseInt(req.body.score)
            })
            const doc = await article.save()
            res.json(doc)
        } catch (e) {
            res.status(400).json({message: 'Error adding article.', error: e})
        }
    })

router.route('/admin/:id')
    .get(checkLoggedIn, grantAccess('readAny', 'article'), async (req, res) => {
        try {
            const article = await Article.findById(req.params.id)
            if (!article || article.length === 0) return res.status(400).json({message: "Article not found."})
            res.json(article)
        } catch (e) {
            res.status(400).json({message: 'Invalid article.', error: e})
        }
    })
    .patch(checkLoggedIn, grantAccess('updateAny', 'article'), async (req, res) => {
        try {
            const article = await Article.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        ...req.body,
                        score: parseInt(req.body.score)
                    }
                }, {
                    new: true,
                    runValidators: true,
                }
            )
            if (!article) return res.status(400).json({message: "Article not found."})
            res.json(article)
        } catch (e) {
            res.status(400).json({message: 'Invalid article.', error: e})
        }
    })
    .delete(checkLoggedIn, grantAccess('deleteAny', 'article'), async (req, res) => {
        try {
            const article = await Article.findByIdAndDelete(req.params.id)
            if (!article) return res.status(400).json({message: "Article not found."})
            res.json({_id: article._id})
        } catch (e) {
            res.status(400).json({message: 'Invalid article.', error: e})
        }
    })

router.route('/:id').get(async (req, res) => {
    try {
        console.log(req.params.id)
        const article = await Article.find({_id: req.params.id, status: 'public'})
        if (!article || article.length === 0) return res.status(400).json({message: "Article not found."})
        res.json(article)
    } catch (e) {
        res.status(400).json({message: 'Error fetching articles.', error: e})
    }
})

router.route('/load_more').post(async (req, res) => {
    try {
        const {sortBy, order, limit, skip} = sortArgsHelper(req.body);
        const articles = await Article.find({status: 'public'})
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
        res.json(articles)
    } catch (e) {
        res.status(400).json({message: 'Error while fetching articles.', error: e})
    }
})

router.route('/admin/paginate')
    .post(checkLoggedIn, grantAccess('readAny', 'articles'), async (req, res) => {
        try {
            const limit = req.body.limit ? req.body.limit : 5;
            const aggQuery = Article.aggregate();
            // Search example
            // const aggQuery = Article.aggregate([
            //     {$match: {status: 'public'}},
            //     {$match: {title: {$regex: /^pulp/i }}}
            // ]);
            const options = {
                limit: limit,
                page: req.body.page,
                sort: {"_id": "desc"}
            }
            //const {docs, total, page, pages} = await Article.aggregatePaginate(aggQuery, options)
            const articles = await Article.aggregatePaginate(aggQuery, options)
            //console.log(docs, total, page, pages)
            //res.json({docs, total, page, pages})
            res.json(articles)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Invalid article.', error: e})
        }
    })
module.exports = router
