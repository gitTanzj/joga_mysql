const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}))

app.use(express.static('public'));

const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});

app.get('/', function(req, res) {
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


app.get('/article/:slug', (req, res) => {
    let query = `SELECT author.name AS author, article.image AS image, article.published AS published, article.name AS name, article.body AS body FROM article JOIN author ON article.author_id = author.id WHERE slug = "${req.params.slug}";`
    let article = [];
    con.query(query, [req.params.slug], (err, result) => {
        if (err) throw err
        article = result
        res.render('article',{ article: article });
    })
})

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});