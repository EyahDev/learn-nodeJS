// Importation du module
var politesse = require('./modules/politesse');

// utilisation des fonctions du module
politesse.bonjour();
politesse.aurevoir();

// Utilisatation du module installé markdown
var markdown =  require('markdown').markdown;

console.log(markdown.toHTML('Du texte en **markdown**'));