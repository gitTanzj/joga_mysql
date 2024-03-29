const articleDbModel = require('../models/article')
const articleModel = new articleDbModel()

class articleController {
    constructor () {
        this.articles = []
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.status(200).json({articles:articles})
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).json({article:article})
    }

    async createNewArticle(req, res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with id ${articleId}`,
            article: {id: articleId, ...newArticle}
        })
    }
    async editArticle(req, res) {
        const editedArticle = {
            name: req.body.name,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
        const newArticle = await articleModel.updateOne(req.params.id, editedArticle)
        res.status(201).json({
            message: `edited article with id ${newArticle}`,
            article: {id: newArticle, ...editedArticle}
        })
    }

    async deleteArticle(req, res) {
        const deletedArticle = await articleModel.deleteOne(req.params.id)
        res.status(201).json({
            message: `deleted article with id ${req.params.id}`
        })
    }
}

module.exports = articleController
