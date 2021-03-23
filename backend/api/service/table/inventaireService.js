const connect = require('../../../connection')

const getAllInventaire = (req, res) => {
    connect.pool.query('SELECT reference_inventaire, nom_conteneur, date_inventaire FROM inventaire i JOIN conteneur c ON i.code_conteneur = c.code_conteneur',
     (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Il n'y aucun inventaire trouvé")
        }
        else
            res.status(200).json(results.rows)
    })
}

// RECHECHE D'INVENTAIRE PAR REFERENCE
const getInventaireByReference = (req, res) => {
    var reference = req.params.reference
    reference = reference.toUpperCase()

    connect.pool.query('SELECT reference_inventaire, nom_conteneur, date_inventaire FROM inventaire i JOIN conteneur c ON i.code_conteneur = c.code_conteneur WHERE reference_inventaire = $1', [reference], (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Désolé, aucun inventaire ne possède cette reference")
        }
        else
            res.status(200).json(results.rows)
    })
}


// RECHERCHE D'INVENTAIRE PAR CONTENEUR
const getInventaireByConteneur = (req, res) => {
    const conteneur = req.params.conteneur

    connect.pool.query('SELECT reference_inventaire, nom_conteneur, date_inventaire FROM inventaire i JOIN conteneur c ON i.code_conteneur = c.code_conteneur WHERE i.code_conteneur = $1', [conteneur], (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Désolé, aucun inventaire n'est fait sur ce conteneur")
        }
        else
            res.status(200).json(results.rows)
    })
}

// RECHERCHE PAR DATE
const getInvetaireByDate = (req, res) => {
    const date = req.params.date

    connect.pool.query('SELECT reference_inventaire, nom_conteneur, date_inventaire FROM inventaire i JOIN conteneur c ON i.code_conteneur = c.code_conteneur WHERE date_inventaire = $1', [date], (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Aucun inventaire n'est trouvé à cette date")
        }
        else
        res.status(200).json(results.rows)
    })
}

// AJOUTER UN NOUVEAU INVENTAIRE
const addInventaire = (req, res) => {
    var {reference, conteneur, date} = req.body
    reference = reference.toUpperCase()
    // ON VERIFIE SI LA REFERENCE EST DEJA PRESENT DANS LA BASE
    connect.pool.query('SELECT * FROM inventaire WHERE reference_inventaire = $1', [reference], (error, results) => {
        if(error || results.rows.length > 0) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Impossible d'ajouter cette reference car elle existe déjà")
        }
        else
            // SI ELLE N'Y EST PAS, ON FAIT L'INSERTION EN VERIFIANT QUE LE CONTENEUR EXISTE
            connect.pool.query('INSERT INTO inventaire VALUES ($1, $2, $3)', [reference, conteneur, date], (error, results) => {
                if(error || results.rowCount < 1) {
                    if(error)
                        console.error(error.stack)
                    sendMessage(res, 0, "L'ajout a échoué, veuillez vérifier que ce conteneur est present dans la base de données et que la date est au bon format")
                }
                else
                    sendMessage(res, 1, "L'ajout a été éffectué avec succès")
            })
    })
}

// MODIFIER UN INVENTAIRE
const updateInventaire = (req, res) => {
    var reference = req.params.reference
    reference = reference.toUpperCase()
    const {ref, conteneur, date} = req.body
    // ON CHERCHE LA REFERENCE AVANT DE PROCEDER A LA MODIFICATION
    connect.pool.query('SELECT * FROM inventaire WHERE reference_inventaire = $1', [reference], (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Impossible de faire la modification car cette reference est introuvable")
        }
        else
            connect.pool.query('UPDATE inventaire SET code_conteneur = $1, date_inventaire = $2 WHERE reference_inventaire = $3',
                [conteneur, date, reference], (err, result) => {
                    if(err || result.rowCount < 1) {
                        if(err)
                            console.error(err.stack)
                        sendMessage(res, 0, "La modification a échoué, veuillez vérifier les données que vous avez saisi")
                    }
                    else
                        sendMessage(res, 1, "La modification a été éffectué avec succès")
            })
    })
}

// SUPPRIMER UN INVENTAIRE
const deleteInventaire = (req, res) => {
    var reference = req.params.reference
    reference = reference.toUpperCase()

    connect.pool.query('SELECT * FROM inventaire WHERE reference_inventaire = $1', [reference], (error, results) => {
        if(error || results.rows.length < 1) {
            if(error)
                console.error(error.stack)
            sendMessage(res, 0, "Impossible de faire la suppression car cette reference est introuvable")
        }
        else
        connect.pool.query('DELETE FROM inventaire WHERE reference_inventaire = $1', [reference], (err, result) => {
            if(err || result.rowCount < 1) {
                if(err)
                    console.error(err.stack)
                sendMessage(res, 0, "La suppression a échoué")
            }
            else
                sendMessage(res, 1, "La suppression a été éffectué avec succès")
        })
    })
}


module.exports = {
    getAllInventaire,
    getInventaireByReference,
    getInventaireByConteneur,
    getInvetaireByDate,
    addInventaire,
    updateInventaire,
    deleteInventaire
}


const sendMessage = (res, id, message) => {
    res.json({
        id : id,
        message : message
    })
}