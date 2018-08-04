// Chargement du module express
var express = require('express');

// Chargement des middleware
var morgan = require('morgan');
var favicon = require('serve-favicon');

// Création de notre application
var app = express();

// Activation du milddleware de logging
app.use(morgan('combined'))

.use(express.static(__dirname +'/public'))
.use(favicon(__dirname + '/public/favicon.ico'))
.use(function(req, res) {
   res.send('Hello')
});

// Gestion des différentes routes de l'application
app.get('/:nombres', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
   var noms = ['Robert', 'Jean', 'Eren', 'Mikasa'];

   noms = noms[Math.round(Math.random() * (noms.length -1))];

   res.render('home.twig', {name: noms, nombres: req.params.nombres});
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('C\'est ici que ca code dur !');
});

app.get('/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hey mais que voilààààà !');
});

app.get('/etage/:etagenum', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    // Gestion de l'erreur dans le cas ou l'étage n'est pas un number
    if (!isNaN(req.params.etagenum)) {
        res.render('etage.html.twig', {etage: req.params.etagenum});
    } else {
        res.status(404).send(req.params.etagenum +' ?? Ce  n\'est pas un étage ça !');
    }


});

// Gestion des pages d'erreurs
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Cette page n\'existe pas !');
});


app.listen(8080);