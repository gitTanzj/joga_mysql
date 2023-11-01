const con = require('../utils/db');

const getAllArticles = ('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) {
            throw err
        } else {
            articles = result
            res.render('index',{ articles: articles });
        }
    })
})

const getArticleBySlug = ('/article/:slug', (req, res) => {
    let query = `SELECT author.name AS author, author_id AS author_id, article.image AS image, article.published AS published, article.name AS name, article.body AS body FROM article JOIN author ON article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article = [];
    con.query(query, [req.params.slug], (err, result) => {
        if (err) throw err
        article = result
        res.render('article',{ article: article });
    })
})

const getArticlesByAuthor = ('/author/:id', (req, res) => {
    let query = `SELECT author.name AS author, article.image AS image, article.name AS name, article.slug AS slug FROM article JOIN author ON article.author_id = author.id WHERE author_id = "${req.params.id}";`
    let articles = [];
    con.query(query, [req.params.id], (err, result) => {
        if (err) throw err
        articles = result
        author = result[0].author
        res.render('author',{ author: author, articles: articles });
    })
})

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticlesByAuthor
}

