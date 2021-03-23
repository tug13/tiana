var connect = require('../../connection')
var alasql = require('alasql')


const getNaissance = (req, res) => {
    connect.pool.query('SELECT lieu, annee_declaration, type_declaration_naissance, officier_naissance, \
    heure_naissance, heure_naissance as heure_naissance_to_gasy, lieu_naissance_enfant, nom_enfant, prenoms_enfant, sexe_enfant, sexe_enfant as sexe_enfant_to_gasy, nom_pere_enfant,\
    date_naissance_pere, date_naissance_pere as date_naissance_pere_to_gasy, profession_pere_enfant, lieu_naissance_pere, prenoms_pere_enfant, nom_mere_enfant, prenoms_mere_enfant, \
   date_naissance_mere, date_naissance_mere as date_naissance_mere_to_gasy, profession_mere_enfant, lieu_naissance_mere, nom_declarant_naissance, date_naissance_declarant_naissance, date_naissance_declarant_naissance as date_naissance_declarant_naissance_to_gasy, \
   lieu_naissance_declarant_naissance, profession_declarant_naissance, adresse_declarant_naissance, adresse_parent_enfant, \
   heure_declaration as heure_declaration_to_gasy,  to_char(date_declaration_naissance, \'DD/MM/YYYY\') as  date_declaration_naissance, to_char(date_declaration_naissance, \'DD/MM/YYYY\') as  date_declaration_naissance_to_gasy, \
   to_char(date_naissance_enfant, \'DD/MM/YYYY\') as date_naissance_enfant, to_char(date_naissance_enfant, \'DD/MM/YYYY\') as date_naissance_enfant_to_letter, radios_declarant, num_ordre, status, date_split\
       FROM public.naissance where status = \'1\'',
        (error, results) => {
            if (error)
                console.error(error)
            else
                res.status(200).json(results.rows)
        })
}

const addNaissance = (req, res) => {
    const {
        annee_declaration,
        lieu,
        num_ordre,
        date_declaration_naissance,
        heure_declaration,
        type_declaration_naissance,
        officier_naissance,
        date_naissance_enfant,
        heure_naissance,
        lieu_naissance_enfant,
        nom_enfant,
        prenoms_enfant,
        sexe_enfant,
        nom_pere_enfant,
        date_naissance_pere,
        profession_pere_enfant,
        lieu_naissance_pere,
        prenoms_pere_enfant,
        nom_mere_enfant,
        prenoms_mere_enfant,
        date_naissance_mere,
        profession_mere_enfant,
        lieu_naissance_mere,
        nom_declarant_naissance,
        date_naissance_declarant_naissance,
        lieu_naissance_declarant_naissance,
        profession_declarant_naissance,
        adresse_declarant_naissance,
        adresse_parent_enfant,
        radios_declarant
    } = req.body
    var date_split = date_naissance_enfant.split('-')
    date_split = date_split[0]
    console.log(num_ordre)
    connect.pool.query('INSERT INTO public.naissance(\
        num_ordre, lieu, annee_declaration, type_declaration_naissance, officier_naissance, heure_naissance, \
        lieu_naissance_enfant, nom_enfant, prenoms_enfant, sexe_enfant, nom_pere_enfant, date_naissance_pere, \
        profession_pere_enfant, lieu_naissance_pere, prenoms_pere_enfant, nom_mere_enfant, prenoms_mere_enfant, \
        date_naissance_mere, profession_mere_enfant, lieu_naissance_mere, nom_declarant_naissance, \
        date_naissance_declarant_naissance, lieu_naissance_declarant_naissance, profession_declarant_naissance, \
        adresse_declarant_naissance, adresse_parent_enfant, heure_declaration, date_declaration_naissance, \
        date_naissance_enfant, radios_declarant, date_split)\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, \
            $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)', [
        num_ordre, lieu, annee_declaration, type_declaration_naissance, officier_naissance, heure_naissance,
        lieu_naissance_enfant, nom_enfant, prenoms_enfant, sexe_enfant, nom_pere_enfant, date_naissance_pere,
        profession_pere_enfant, lieu_naissance_pere, prenoms_pere_enfant, nom_mere_enfant, prenoms_mere_enfant,
        date_naissance_mere, profession_mere_enfant, lieu_naissance_mere, nom_declarant_naissance,
        date_naissance_declarant_naissance, lieu_naissance_declarant_naissance, profession_declarant_naissance,
        adresse_declarant_naissance, adresse_parent_enfant, heure_declaration, date_declaration_naissance,
        date_naissance_enfant, radios_declarant, date_split

    ], (err, result) => {
        if (err) res.send(err.stack)

        res.send('Ajouter avec success')
    })

}


const updateNaissance = (req, res) => {
    const { num_ordre } = req.params
    console.log(num_ordre)
    const {
        annee_declaration,
        lieu,
        date_declaration_naissance,
        heure_declaration,
        type_declaration_naissance,
        officier_naissance,
        date_naissance_enfant,
        heure_naissance,
        lieu_naissance_enfant,
        nom_enfant,
        prenoms_enfant,
        sexe_enfant,
        nom_pere_enfant,
        date_naissance_pere,
        profession_pere_enfant,
        lieu_naissance_pere,
        prenoms_pere_enfant,
        nom_mere_enfant,
        prenoms_mere_enfant,
        date_naissance_mere,
        profession_mere_enfant,
        lieu_naissance_mere,
        nom_declarant_naissance,
        date_naissance_declarant_naissance,
        lieu_naissance_declarant_naissance,
        profession_declarant_naissance,
        adresse_declarant_naissance,
        adresse_parent_enfant,
        radios_declarant
    } = req.body
    console.log(date_naissance_enfant)
    var date_split = date_naissance_enfant.split('/')
    date_split = date_split[2]
    console.log(date_split)
    connect.pool.query('UPDATE public.naissance\
    SET lieu=$1, annee_declaration=$2, type_declaration_naissance=$3, officier_naissance=$4, heure_naissance=$5, \
    lieu_naissance_enfant=$6, nom_enfant=$7, prenoms_enfant=$8, sexe_enfant=$9, nom_pere_enfant=$10, \
    date_naissance_pere=$11, profession_pere_enfant=$12, lieu_naissance_pere=$13, prenoms_pere_enfant=$14, nom_mere_enfant=$15, \
    prenoms_mere_enfant=$16, date_naissance_mere=$17, profession_mere_enfant=$18, lieu_naissance_mere=$19, \
    nom_declarant_naissance=$20, date_naissance_declarant_naissance=$21, lieu_naissance_declarant_naissance=$22, \
    profession_declarant_naissance=$23, adresse_declarant_naissance=$24, adresse_parent_enfant=$25, heure_declaration=$26, \
    date_declaration_naissance=$27, date_naissance_enfant=$28, radios_declarant=$29, date_split=$30\
	WHERE num_ordre=$31', [
        lieu, annee_declaration, type_declaration_naissance, officier_naissance, heure_naissance,
        lieu_naissance_enfant, nom_enfant, prenoms_enfant, sexe_enfant, nom_pere_enfant,
        date_naissance_pere, profession_pere_enfant, lieu_naissance_pere, prenoms_pere_enfant, nom_mere_enfant,
        prenoms_mere_enfant, date_naissance_mere, profession_mere_enfant, lieu_naissance_mere,
        nom_declarant_naissance, date_naissance_declarant_naissance, lieu_naissance_declarant_naissance,
        profession_declarant_naissance, adresse_declarant_naissance, adresse_parent_enfant, heure_declaration,
        date_declaration_naissance, date_naissance_enfant, radios_declarant, date_split, num_ordre
    ], (err, result) => {
        if (err) res.send(err.stack)

        res.send("update avec sucess")
    })

}

const deleteNaissance = (req, res) => {
    const { num_ordre } = req.params
    connect.pool.query('DELETE FROM public.naissance WHERE num_ordre=$1', [num_ordre], (err, result) => {
        if (err) res.send(err.stack)

        res.send("supprimer avec success")
    })
}

const auto_increment_num_ordre = (req, res) => {
    connect.pool.query('SELECT num_ordre FROM naissance ORDER BY num_ordre DESC LIMIT 1', (error, results) => {
        let reference
        if (error || results.rows.length < 1) {
            if (error)
                console.error(error.stack)
            reference = 'N0001'
        } else {
            var tab = results.rows[0].num_ordre
            var decoupe = tab.split('N')
            var numero = decoupe[1]
            var newNumero = parseInt(numero)
            newNumero = newNumero + 1
            if (newNumero < 10) {
                reference = 'N000' + newNumero
            } else if (newNumero < 100) {
                reference = 'N00' + newNumero
            } else if (newNumero < 1000) {
                reference = 'N0' + newNumero
            } else reference = 'N' + newNumero
        }
        return res.send(reference)
    })
}

const getNumOrdreNaissance = (req, res) => {
    connect.pool.query('SELECT DISTINCT num_ordre, nom_enfant, prenoms_enfant FROM naissance', (error, results) => {
        if (error)
            res.send(error)
        res.json(results.rows)
    })
}

const getNumOrdreNaissanceDefunt = (req, res) => {
    connect.pool.query('SELECT DISTINCT num_ordre, nom_enfant, prenoms_enfant FROM naissance where status= \'1\'', (error, results) => {
        if (error)
            res.send(error)
        res.json(results.rows)
    })
}

const getDataByNum_ordreNaissance = (req, res) => {
    const { num_ordre } = req.params
    connect.pool.query('select *from naissance where num_ordre = $1', [num_ordre], (err, result) => {
        if (err) res.send(err.stack)

        res.send(result.rows)
    })
}


const getOnlyDate = (req, res) => {
    connect.pool.query('select count(num_ordre) as totalEnfantNaitre, date_split from naissance where status=\'1\'\
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

const getTotalNombreNaissance = (req, res) => {
    connect.pool.query('select count(num_ordre) as total, date_split from naissance where status=\'1\'\
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


const getPere = (req, res) => {
    connect.pool.query('select num_ordre, nom_enfant from naissance where sexe_enfant = \'Masculin\' order by num_ordre desc', (err, result) => {
        if (err) res.send("erreur")

        res.send(result.rows)
    })
}

const dataPere = (req, res) => {
    const { nom_pere_enfant } = req.params
    connect.pool.query('select * from naissance where nom_enfant =$1', [nom_pere_enfant], (err, result) => {
        if (err) res.send('erreur')

        res.send(result.rows)
    })
}


const getMere = (req, res) => {
    connect.pool.query('select num_ordre, nom_enfant from naissance where sexe_enfant = \'Féminin\' order by num_ordre desc', (err, result) => {
        if (err) res.send("erreur")

        res.send(result.rows)
    })
}

const dataMere = (req, res) => {
    const { nom_mere_enfant } = req.params
    connect.pool.query('select * from naissance where nom_enfant =$1', [nom_mere_enfant], (err, result) => {
        if (err) res.send('erreur')

        res.send(result.rows)
    })
}

const getDeclarantNaissance = (req, res) => {
    connect.pool.query('select num_ordre, nom_enfant, prenoms_enfant from naissance where status = \'1\'', (err, result) => {
        if (err) res.send('erreur')

        res.send(result.rows)
    })
}

const getDataDeclarant = (req, res) => {
    const { nom_declarant_naissance } = req.params
    connect.pool.query('select *from naissance where status= \'1\' and nom_enfant=$1', [nom_declarant_naissance], (err, result) => {
        if (err) res.send("erreur")

        res.send(result.rows)
    })
}

module.exports = {
    getNaissance,
    addNaissance,
    updateNaissance,
    deleteNaissance,
    auto_increment_num_ordre,
    getNumOrdreNaissance,
    getDataByNum_ordreNaissance,
    getOnlyDate,
    getTotalNombreNaissance,
    getPere,
    dataPere,
    dataMere,
    getMere,
    getDeclarantNaissance,
    getDataDeclarant,
    getNumOrdreNaissanceDefunt

}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    else return s.charAt(0).toUpperCase() + s.slice(1)
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