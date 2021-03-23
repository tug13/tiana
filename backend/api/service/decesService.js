var connect = require('../../connection')
var alasql = require('alasql')


const getDeces = (req, res) => {
    connect.pool.query('SELECT nom_enfant, num_ordre_declarant, causes, \
    to_char(date_naissance_declarant, \'DD/MM/YYYY\') as  date_naissance_declarant,to_char(date_naissance_declarant, \'DD/MM/YYYY\') as  date_naissance_declarant_to_gasy, \
    profession, lieu_naissance, adresse_enfant_deces, adresse_declarant, lieu_deces_enfant, lieu_naissance_declarant, \
    num_ordre, heure_deces, to_char(date_defunt, \'DD/MM/YYYY\') as date_defunt, to_char(date_defunt, \'DD/MM/YYYY\') as date_defunt_to_gasy, sexe_defunt, nom_pere_defunt, nom_mere_defunt, \
    date_naissance_defunt, date_naissance_defunt as date_naissance_defunt_to_gasy FROM public.deces',
        (error, results) => {
            if (error)
                console.error(error)
            else
                res.status(200).json(results.rows)
        })
}

const addDeces = (req, res) => {
    const {
        nom_enfant,
        num_ordre_declarant,
        causes,
        date_naissance_declarant,
        profession,
        lieu_naissance,
        adresse_enfant_deces,
        adresse_declarant,
        lieu_deces_enfant,
        lieu_naissance_declarant,
        num_ordre,
        heure_deces,
        date_defunt,
        sexe_defunt,
        nom_pere_defunt,
        nom_mere_defunt,
        date_naissance_defunt
    } = req.body
    var date_split = date_defunt.split('-')
    date_split = date_split[0]
    console.log(date_split)
    console.log(num_ordre + "/" + nom_enfant)
    connect.pool.query('INSERT INTO public.deces(\
        nom_enfant, num_ordre_declarant, causes, date_naissance_declarant, profession, lieu_naissance, adresse_enfant_deces, \
        adresse_declarant, lieu_deces_enfant, lieu_naissance_declarant, num_ordre, heure_deces, date_defunt, sexe_defunt, \
        nom_pere_defunt, nom_mere_defunt, date_naissance_defunt, date_split)\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [
        nom_enfant, num_ordre_declarant, causes, date_naissance_declarant, profession,
        lieu_naissance, adresse_enfant_deces, adresse_declarant, lieu_deces_enfant, lieu_naissance_declarant,
        num_ordre, heure_deces, date_defunt, sexe_defunt, nom_pere_defunt, nom_mere_defunt, date_naissance_defunt, date_split
    ], (err, result) => {
        if (err) res.send(err.stack)

        if (result) {
            var val = 0
            console.log(val)
            connect.pool.query('UPDATE public.naissance SET status=$1 WHERE num_ordre=$2', [val, num_ordre], (err, result) => {
                if (err) res.send(err.stack)

                sendMessage(res, 1, "L'ajout a été éffectué avec succès")

            })
        } else {
            sendMessage(res, 0, "Erreur d'ajout")
        }
        // res.send('Ajouter avec success')

    })

}


const updateDeces = (req, res) => {
    const { num_ordre } = req.params
    console.log(num_ordre)
    const {
        nom_enfant,
        num_ordre_declarant,
        causes,
        date_naissance_declarant,
        profession,
        lieu_naissance,
        adresse_enfant_deces,
        adresse_declarant,
        lieu_deces_enfant,
        lieu_naissance_declarant,
        heure_deces,
        date_defunt,
        sexe_defunt,
        nom_pere_defunt,
        nom_mere_defunt,
        date_naissance_defunt
    } = req.body
    var date_split = date_defunt.split('/')
    date_split = date_split[2]
    console.log(date_split)
    connect.pool.query('UPDATE public.deces\
    SET nom_enfant=$1, num_ordre_declarant=$2, causes=$3, date_naissance_declarant=$4, profession=$5, lieu_naissance=$6, \
    adresse_enfant_deces=$7, adresse_declarant=$8, lieu_deces_enfant=$9, lieu_naissance_declarant=$10, \
    heure_deces=$11, date_defunt=$12, sexe_defunt=$13, nom_pere_defunt=$14, nom_mere_defunt=$15, date_naissance_defunt=$16, date_split=$17\
	WHERE num_ordre= $18', [
        nom_enfant,
        num_ordre_declarant,
        causes,
        date_naissance_declarant,
        profession,
        lieu_naissance,
        adresse_enfant_deces,
        adresse_declarant,
        lieu_deces_enfant,
        lieu_naissance_declarant,
        heure_deces,
        date_defunt,
        sexe_defunt,
        nom_pere_defunt,
        nom_mere_defunt,
        date_naissance_defunt,
        date_split,
        num_ordre
    ], (err, result) => {
        if (err) res.send(err.stack)

        // res.send("update avec sucess")
        sendMessage(res, 1, "modification a été éffectué avec succès")
    })

}

const deleteDeces = (req, res) => {
    const { num_ordre } = req.params
    connect.pool.query('DELETE FROM public.deces WHERE num_ordre=$1', [num_ordre], (err, result) => {
        if (err) res.send(err.stack)

        if (result) {
            connect.pool.query('DELETE FROM public.naissance WHERE num_ordre=$1', [num_ordre], (err, result) => {
                sendMessage(res, 1, "La suppression a été éffectué avec succès")
            })
        } else {
            sendMessage(res, 0, "Erreur de la suppression")
        }
    })
}


const getOnlyDate = (req, res) => {
    connect.pool.query('select count(num_ordre) as dates, date_split from deces \
    group by date_split order by date_split asc', (err, results) => {
        var tab = []
        if (err) res.send(err.stack)

        for (var i = 0; i < results.rowCount; i++) {
            var val = results.rows[i].date_split
            tab.push(parseInt(val))

        }
        tab.unshift(1800)
        res.send(tab)
    })
}

const getTotalNombreDeces = (req, res) => {
    connect.pool.query('select count(num_ordre) as total, date_split from deces\
    group by date_split order by date_split asc', (err, results) => {
        var tab = []
        if (err) res.send(err.stack)

        for (var i = 0; i < results.rowCount; i++) {
            var val = results.rows[i].total
            tab.push(parseInt(val))

        }
        tab.unshift(0)
        res.send(tab)
    })
}



module.exports = {
    getDeces,
    addDeces,
    updateDeces,
    deleteDeces,
    getOnlyDate,
    getTotalNombreDeces

}


const responseAdded = (res, err, result) => {
    if (err) {
        console.error(err)
        res.json({
            id: 0,
            message: "Ajout impossible, cet article est déja dans la base de données"
        })
        return
    } else {
        if (result.rowCount < 1)
            res.json({
                id: 0,
                message: "L'ajout a échoué"
            })
        else
            res.status(201).json({
                id: 1,
                message: "L'ajout a réussi"
            })
    }
}

const responseUpdated = (res, err, result) => {
    if (err) {
        console.error(err)
        return
    } else {
        if (result.rowCount < 1)
            res.json({
                id: 0,
                message: "La modification a échoué"
            })
        else
            res.status(200).json({
                id: 1,
                message: "La modification a été éffectuée avec succès"
            })
    }
}


const sendMessage = (res, id, message) => {
        res.json({
            id: id,
            message: message
        })
    }
    // const auto_increment_num_prix_stable = (req, res) => {
    //     // res.send('true num prix stable')
    //     connect.pool.query('SELECT reference_article FROM article_prix_stable ORDER BY reference_article DESC LIMIT 1', (error, results) => {
    //         let reference
    //         if(error || results.rows.length < 1) {
    //             if(error)
    //                 console.error(error.stack)
    //             reference = 'S0001'
    //         }
    //         else {
    //             var tab = results.rows[0].reference_article
    //             var decoupe = tab.split('S')
    //             var numero = decoupe[1]
    //             var newNumero = parseInt(numero)
    //             newNumero = newNumero + 1
    //             if(newNumero < 10) {
    //                 reference = 'S000' + newNumero
    //             }
    //             else if(newNumero < 100) {reference = 'S00' + newNumero}
    //             else if(newNumero < 1000) {reference = 'S0' + newNumero}
    //             else reference = 'S' + newNumero
    //         }
    //         return res.send(reference)
    //     })
    // }