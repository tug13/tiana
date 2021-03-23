var connect = require('../../connection')
const getDataNaissance = (req, res) => {
    var valMaculin, valFeminin, val;
    var tab = []
    connect.pool.query('select count(num_ordre) as nombreTotal, sexe_enfant, count(sexe_enfant) as sexe \
    , date_split as total from naissance where status = \'1\'\
    and sexe_enfant = \'Masculin\' group by sexe_enfant, date_split order by date_split asc', (err, resultMasculin) => {
        if (err) console.log(err.stack)

        if (resultMasculin.rows.length < 1) {
            console.log("erreur")
        } else {
            connect.pool.query('select count(num_ordre) as nombreTotal, sexe_enfant, count(sexe_enfant) as sexe , date_split as total from naissance where status = \'1\'\
            and sexe_enfant = \'Féminin\' group by sexe_enfant, date_split order by date_split asc', (err, resultFemin) => {
                if (err) res.send(err.stack)

                valFeminin = resultMasculin.rows
                valMaculin = resultFemin.rows
                val = valFeminin.concat(valMaculin)
                res.send(val)
            })
        }
    })



}

const getSexNaissanceMasculin = (req, res) => {
    var tab = [],
        tab2 = [],
        val, data_split, date_split2;
    connect.pool.query('select count(num_ordre) as total_masculin, date_split from naissance where status = \'1\'\
    and sexe_enfant = \'Masculin\' group by date_split order by date_split asc', (err, result) => {
        if (err) console.log(err.stack)

        res.send(result.rows)
            // for (var i = 0; i < result.rowCount; i++) {
            //     val = JSON.parse(result.rows[i].date_split) + '":"' + JSON.parse(result.rows[i].total_masculin)
            //         // res.send(val)
            //     tab.push(val)
            // }
            // res.send(tab)
            // for (var j = 0; j < tab.length; j++) {
            //     data_split = tab[j].replace(':', '":"')
            //     data_split = data_split.replace("\"", "")
            //     data_split = data_split.replace("\"", "")
            //     data_split = data_split.replace("':'", '":"')
            //     tab2.push(data_split)
            // }
            // for (var t = 0; t < tab2.length; t++) {
            //     date_split2 = tab[t]
            //     console.log(date_split2)
            // }
            // console.log(tab)
            // res.send(tab)
    })
}

const getAnneeTotalNaissance = (req, res) => {
    // select date_split as annee_naissance , count(num_ordre) as total, reference_sexe_enfant \
    // from naissance where status =\'1\' group by date_split , reference_sexe_enfant order by annee_naissance asc
    connect.pool.query('SELECT date_split as annee_naissance, sexe_enfant, count(num_ordre) as total FROM public.naissance\
    where status = \'1\' group by date_split, sexe_enfant order by date_split asc', (err, result) => {
        if (err) res.send(err.stack)

        res.send(result.rows)
    })
}

const getAnneeTotalDeces = (req, res) => {
    connect.pool.query('SELECT date_split as annee, sexe_defunt, count(num_ordre) as total FROM public.deces\
    group by date_split, sexe_defunt order by date_split asc', (err, result) => {
        if (err) res.send(err.stack)

        res.send(result.rows)
    })
}

const getCountMasculinDataNaissance = (req, res) => {
    const { date_split } = req.params
    connect.pool.query('select count(num_ordre) as total, date_split from naissance where status =\'1\'\
    and sexe_enfant =\'Masculin\' and date_split= $1 group by date_split\
    ', [date_split], (err, result) => {
        if (err) console.log(err.stack)

        if (result.rows.length < 1) {
            var val = '0'
            res.send(val)
        } else {
            res.send(result.rows[0].total)
        }

    })
}

const total_in_base = (req, res) => {
    connect.pool.query('select count(num_ordre) as total_base from naissance', (err, results) => {
        if (err) res.send(err.stack)

        res.send(results.rows[0].total_base)
    })
}
const total_in_base_vivant = (req, res) => {
    connect.pool.query('select count(num_ordre) as total_in_base_vivant from naissance where status =\'1\'', (err, results) => {
        if (err) res.send(err.stack)

        res.send(results.rows[0].total_in_base_vivant)
    })
}

const total_in_base_mort = (req, res) => {
    connect.pool.query('select count(num_ordre) as total_in_base_mort from naissance where status =\'0\'', (err, results) => {
        if (err) res.send(err.stack)

        res.send(results.rows[0].total_in_base_mort)
    })
}
module.exports = {
    getDataNaissance,
    getSexNaissanceMasculin,
    getAnneeTotalNaissance,
    getCountMasculinDataNaissance,
    total_in_base,
    total_in_base_vivant,
    total_in_base_mort,
    getAnneeTotalDeces

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