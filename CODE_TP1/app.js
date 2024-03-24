// affiche hello world sur la page

// importation de la librairie express
const express = require('express');
// création de l'application express
const app = express();
// définition du port d'écoute
const port = 3000;
// définition de la variable name
const name = 'baptiste';
// définition de la variable json
const json = {
    '/': 0,
    '/welcome': 0,
    '/secret': 0,
    '/error': 0,
    '/img': 0,
    '/redirectMe': 0,
    '/users/:name': 0,
    '/somme': 0,
    '/metrics': 0
};

// Objets app.use et next
app.use((req, res, next) => {
    console.log(new Date().toISOString() + ': ' + req.path);
    if (json.hasOwnProperty(req.path)) {
        json[req.path] += 1;
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Objet app.get et res
app.get('/welcome', (req, res) => {
    res.send('Bienvenue sur le TP 1 du cours d\'architecture logicielle');
    });

app.get('/secret', (req, res) => {
    res.status(401)
    res.send('Vous ne possédez pas les droits pour accéder à ma page secrète');
    });

app.get('/error', (req, res) => {
    res.status(500).json({message: 'Erreur'});
    });

app.get('/img', (req, res) => {
    res.download('./img.jpg');
    });

app.get('/redirectMe', (req, res) => {
    res.redirect('https://www.iut-littoral.fr/');
    });

// L'objet req
app.get('/users/:name', (req, res) => {
    res.send('Bienvenue sur la page de ' + req.params.name);
    });

app.get('/somme', (req, res) => {
    res.send('La somme de ' + req.query.a + ' et ' + req.query.b + ' est égale à ' + (parseInt(req.query.a) + parseInt(req.query.b)));
    });

app.get('/metrics', (req, res) => {
    console.log(new Date().toISOString() + ': /metrics');
    const uptimeInSeconds = process.uptime();
    console.log(json);
    const metrics = {
        status: 'healthy',
        json: json,
        uptime: uptimeInSeconds
    };
    res.json(metrics);
});

app.use((req, res, next) => {
    res.status(404).send('Cette page n\'existe pas!');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

