const express = require("express");
const {checkLoggedIn} = require("../../middleware/auth");
const {grantAccess} = require("../../middleware/roles");
const {Article} = require("../../models/article_model");
const {Category} = require("../../models/category_model");
const {sortArgsHelper} = require("../../config/helpers");
let router = express.Router();

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

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
            console.log(req.body)
            const article = await Article.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        ...req.body,
                        score: parseInt(req.body.score)
                    }
                }, {
                    new: true,
                    runValidators: false,
                }
            )
            if (!article) return res.status(400).json({message: "Article not found."})
            res.json(article)
        } catch (e) {
            res.status(400).json({message: 'Invalid article.', error: e})
            console.log(e)
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


router.route('/load_more').post(async (req, res) => {
    try {
        const {sortBy, order, limit, skip} = sortArgsHelper(req.body);
        const articles = await Article.find({status: 'public'})
            .populate('category')
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
            let aggQuery;
            if (req.body.keywords && req.body.keywords!=='') {
                const re = new RegExp(escapeRegExp(req.body.keywords),'gi')
                aggQuery = Article.aggregate([
                    {$match: {title: {$regex: re }}}
                ]);
                //console.log(req.body.keywords)
            } else {
                //console.log('empty')
                aggQuery = Article.aggregate();
            }

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

router.route("/categories")
    .get(async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({message: "Error getting categories", error})
        }
    })
    .post(checkLoggedIn, grantAccess('createAny', 'categories'), async (req, res) => {
        try {
            const category = new Category(req.body);
            await category.save()
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message)
            res.status(400).json({message: "Error adding categories", error})
        }
    });

router.route('/id/:id').get(async (req, res) => {
    try {
        const article = await Article.find({_id: req.params.id, status: 'public'})
            .populate('category')
        if (!article || article.length === 0) return res.status(400).json({message: "Article not found."})
        res.json(article)
    } catch (e) {
        res.status(400).json({message: 'Error fetching articles.', error: e})
    }
})

router.route('/search')
    .get(async (req, res) => {
        try {
            const keywords = req.query.keywords;

            if (keywords === '') res.status(400).json({message: 'Empty search.', error: e})
            const limit = req.query.limit ? req.query.limit : 5;
            const page = req.query.page ? req.query.page : 0;



            const re = new RegExp(escapeRegExp(keywords), 'gi');

            const aggQuery = Article.aggregate(
                [
                    {$match: {status: 'public'}},
                    {$match: {title: {$regex: re}}}
                ]
            );
            const options = {
                limit: limit,
                page: page,
                sort: {"_id": "desc"},
            }
            const articles = await Article.aggregatePaginate(aggQuery, options)
            res.json(articles)
        } catch (e) {
            res.status(400).json({message: 'Error fetching articles.', error: e})
        }
    })

module.exports = router
