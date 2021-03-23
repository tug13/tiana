const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/* **************** APPEL DES ROUTES **************** */
/* ****************la récuperation du token toujour prioritaire ******************** */
var utilisateur = require('./api/routes/utilisateurRoute')
var naissance = require('./api/routes/naissanceRoute')
var deces = require('./api/routes/decesRoute')
var stat = require('./api/routes/statRoute')


/* *************** ASSIGNATION DE APP DANS LES ROUTES ******************* */
utilisateur(app)
naissance(app)
deces(app)
stat(app)

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// use morgan to log requests to the console
app.use(morgan('dev'))

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})