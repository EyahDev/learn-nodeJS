var cookieSession = require('cookie-session');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieSession({
    name: 'session',
    keys: ['unchainedecaracterepoursignerlecookie'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.get('/', jsonParser, function(req, res){
    // Définition du header
    res.setHeader('Content-Type', 'text/html');

    // Création du tableau qui va contenir la todolist si elle n'existe pas déjà
    if (!req.session.todolist) {
        req.session.todolist = [];
    }

    // Rendu de la page
    res.render('todolist/todolist.twig', {todolist: req.session.todolist})
});

app.post('/api/add', urlencodedParser, function(req, res){

    if (!req.body) {
        res.sendStatus(400)
    }

    // Push de la nouvelle chose à faire dans la liste
    var list = req.session.todolist;
    list.push(req.body.newTodo);

    // Set de session modifié
    req.session.todolist = list;

    // Redirige vers la liste
    res.redirect(req.get('referer'));
});

app.get('/api/remove/:todo', urlencodedParser, function(req, res){
    // Déclaration de l'entrée à supprimer
    var toRemove = req.params.todo;

    // Récupération de la todolist depuis la session et supprime l'entrée
    var list = req.session.todolist;
    list.splice(list.indexOf(toRemove), 1 );

    // Set de session modifié
    req.session.todolist = list;

    //Redirige vers la page d'ou provient la requête intial
    res.redirect(req.get('referer'));
});

app.listen(8080);