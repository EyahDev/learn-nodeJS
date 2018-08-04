// Création de la variable utile à l'initialisation du serveur
var http = require('http');

// Création de la variable utile à la soumission d'événement
var eventEmitter = require('events').EventEmitter;

// Déclaration de mon nouvel soumetteur d'événement
var jeu = new eventEmitter();

// Création de mon événement nommé gameover
jeu.on('gameover', function(message)  {
    console.log(message);
});

// Lors que mon événement 'gameover' est trigger il affichera le message passé en param
jeu.emit('gameover', 'vous avez perdu');

// Init du serveur
var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Bin le bonjour !')
});

// Création de l'événement lié à la fermeture du serveur
server.on('close', function () {
    console.log('Au revoir serveur !')
});

// Fermeture du serveur et donc déclenchement de l'événement précédement déclenché
// server.close()