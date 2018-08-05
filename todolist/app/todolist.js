var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());

app.get('/', jsonParser, function(req, res){
    // Définition du header
    res.setHeader('Content-Type', 'text/html');

    // Création d'une variable qui récupère le cookie todolist
    var todolist = req.cookies.todolist;

    // Si aucun cookie todolist n'existe création du cookie todolist et mise à null
    if (!todolist) {
        res.cookie('todolist', []);
    }

    // Rendu de la page
    res.render('todolist/todolist.twig', {todolist: todolist})
});

app.post('/api/add', urlencodedParser, function(req, res){

    if (!req.body) {
        res.sendStatus(400)
    }

    // Récupération de la todolist depuis les cookies
    var todolist = req.cookies.todolist;
    todolist.push(req.body.newTodo);

    // Ajout de la nouvelle tache à la liste
    res.cookie('todolist', todolist);


    res.redirect(req.get('referer'));
});

app.get('/api/remove/:todo', jsonParser, function(req, res){
    // Déclaration de l'entrée à supprimer
    var toRemove = req.params.todo;

    // Récupération de la todolist depuis les cookies et supprimer l'entrée
    var todolist = req.cookies.todolist;
    todolist.splice(todolist.indexOf(toRemove), 1 );

    // Ajout de la nouvelle tache à la liste
    res.cookie('todolist', todolist);

    //Redirige vers la page d'ou provient la requête intial
    res.redirect(req.get('referer'));
});

app.listen(8080);