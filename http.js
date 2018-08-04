// Création de la variable utile à l'initialisation pour init le serveur
var http = require('http');

// Création de la variable utile à la récupération de l'url
var url = require('url');

// Création de la variable utile à la récupération des params passé à l'url
var querystring = require('querystring');

// Création du server avec req (request) et res (response) en param de la fonction de callback
var server = http.createServer(function(req, res) {
    // Récupération des params de l'url
    var params = querystring.parse(url.parse(req.url).query);

    // Récupération de l'url
    // var page = url.parse(req.url).pathname;

    //Ecriture de l'entête HTTP
    res.writeHead(200, {"Content-Type": "text/html"});


    //res.write est utilisé renvoyer le contenu de la response

    // Condition pour la gestion du routing
    // if (page === '/') {
    //     res.write('coucou');
    // } else if (page === '/sous-sol') {
    //     res.write('coucousol');
    // } else {
    //     res.writeHead(404, {"Content-Type": "text/html"});
    //     res.write('404 mon gars !');
    //     res.end();
    // }

    // Condition pour le test des params passé dans l'url
    if ('prenom' in params && 'nom'in params) {
        res.write('Vous vous appelez '+ params['prenom'] + ' ' + params['nom']);
    }else {
        res.write('Je ne vous connais pas');
    }

    // Fin de la response
    res.end();
});

server.listen(8080);
