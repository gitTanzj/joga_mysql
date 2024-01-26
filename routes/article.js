const express = require('express');

const router = express.Router();

const articleControllerClass = require('../controllers/article');
const articleController = new articleControllerClass();



router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/:slug', (req,res) => articleController.getArticleBySlug(req, res))
router.post('/create', (req, res) => articleController.createNewArticle(req, res))
router.post('/edit/:id', (req, res) => articleController.editArticle(req, res))
router.delete('/delete/:id', (req, res) => articleController.deleteArticle(req, res))

module.exports = router;