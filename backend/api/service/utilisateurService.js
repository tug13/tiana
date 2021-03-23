var connect = require('../../connection.js')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var config = require('../../config.js')
var multer = require('multer')
var path = require('path')

const getUser = (req, res) => {
    const nom_utilisateur = req.params.nom_utilisateur
    const userType = req.params.userType
    console.log(userType)
        // var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
    connect.pool.query('SELECT nom_utilisateur, mot_de_passe, type, contact, email, image FROM utilisateur WHERE \
   nom_utilisateur = $1 AND type= $2', [nom_utilisateur, userType], (error, resultat) => {
        if (error) {
            res.send(`nom de l'utilisateur: ${nom_utilisateur} \n et mot de passe ${mot_de_passe} n'existe pas `)
        } else {
            if (resultat.rows < 1) {
                res.send('user not found')
            } else {
                if (resultat.rows[0].type == 'admin') {
                    connect.pool.query('SELECT *from utilisateur order by id', (er, results) => {
                        res.send(results.rows)
                    })

                } else {
                    var autorizationUser = resultat.rows[0].nom_utilisateur
                    var autorizationUserType = resultat.rows[0].type
                    connect.pool.query('SELECT * FROM utilisateur WHERE nom_utilisateur =$1 AND type= $2', [autorizationUser, autorizationUserType], (err, results) => {
                        if (err) res.send(err.stack)

                        res.send(results.rows)
                    })
                }

            }
        }
    })
}


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var uploadSingle = multer({ //multer settings
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('file');


// enregistrer un utilisateur dans la table utilisateur, si l'utilisateur existe déjà le nom et le mot de passe on
// on ne peut pas ajouter dans la table
const registrer = (req, res) => {
    const { nom_utilisateur, mot_de_passe, type, contact, email, image, confirmeMot_de_passe } = req.body
        // console.log('--------------------------------------------')
        //     console.log(addImage(req, res))
        // console.log('---------------------------------------------')
    if (image == null) {
        console.log('image not null')
        if (mot_de_passe == confirmeMot_de_passe) {
            var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
            connect.pool.query('SELECT nom_utilisateur from utilisateur \
    where nom_utilisateur= $1', [nom_utilisateur], function(error, resultat) {
                if (error) console.log(error.stack)
                var tabResultat = [];
                tabResultat = resultat.rows;
                var trouver = tabResultat.find(nameFind => nameFind.nom_utilisateur == nom_utilisateur)
                console.log(trouver)
                if (!trouver) {
                    if (image != null) {
                        var file = 'icon-user-default.png'
                        connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
           mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)', [nom_utilisateur, mot_de_passe_hash, type, contact, email, file],
                            function(error, resultat) {
                                if (error) sendMessage(res, 1, 'Erreur d\'ajouter')

                            })
                        sendMessage(res, 1, 'Ajouter avec success')
                    } else {
                        var file = 'icon-user-default.png'
                        connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
           mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)', [nom_utilisateur, mot_de_passe_hash, type, contact, email, file],
                            function(error, resultat) {
                                if (error) sendMessage(res, 1, 'Erreur d\'ajouter')

                            })
                        sendMessage(res, 1, 'Ajouter avec success')
                    }

                } else {

                    sendMessage(res, 0, 'nom utilisateur déjà existé')
                }
            })
        } else {
            sendMessage(res, 0, 'Verifier votre mot de passe')
        }
    } else {
        console.log('image null')
            // uploadSingle(req,res,function(err){
            //           if(err){
            //               console.log("erreur")
            //           }
            //           else{
            //             if(req.file == undefined){
            //               res.send("pas d'image")
            //             }else{
            //               console.log(req.file)
            //               res.json({
            //                 success: `Image ${req.file.originalname} a été telchargé avec success`
            //               });
            //             }
            //           }

        //       })
    }

    /*uploadSingle(req,res,function(err){
              if(err){
                  console.log("erreur")
              }
              else{
                if(req.file == undefined){
                  res.send("pas d'image")
                }else{
                  console.log(req.file)
                  res.json({
                    success: `Image ${req.file.originalname} a été telchargé avec success`
                  });
                }
              }
              
          })*/


    /*
    var file;
    const { nom_utilisateur, mot_de_passe, type, contact, email, image, confirmeMot_de_passe } = req.body
    console.log(req.body)
    uploadSingle(req,res,function(err){
              if(err){
                  console.log('erreur de telechargement d\'image')
                  next()
              }
             else{
              //  res.json({
              //   // success: `Image ${req.file.originalname} a été telchargé avec success`});
              //   success: `Image a été telchargé avec success`
              // });
              console.log("Image a été telchargé avec success")
             }
             
          })

    if(mot_de_passe == confirmeMot_de_passe){
        var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
    connect.pool.query('SELECT nom_utilisateur from utilisateur \
      where nom_utilisateur= $1', [nom_utilisateur], function(error, resultat){
        if(error) console.log(error.stack)
        var tabResultat = [];
        tabResultat = resultat.rows;
        var trouver = tabResultat.find(nameFind=>nameFind.nom_utilisateur==nom_utilisateur)
        console.log(trouver)
        if(!trouver){
          if(image != null){
            connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
             mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)',
             [nom_utilisateur, mot_de_passe_hash, type, contact, email, image],
          function(error, resultat){
            if(error) sendMessage(res, 1, 'Erreur d\'ajouter')

          })
          sendMessage(res, 1, 'Ajouter avec success')
          }else{
             var file = 'icon-user-default.png'
            connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
             mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)',
             [nom_utilisateur, mot_de_passe_hash, type, contact, email, file],
          function(error, resultat){
            if(error) sendMessage(res, 1, 'Erreur d\'ajouter')

          })
          sendMessage(res, 1, 'Ajouter avec success')
          }
          
        }else{
         
          sendMessage(res, 0, 'nom utilisateur déjà existé')
        }
      }) 
    }
    else{
      sendMessage(res, 0, 'erreur du mot de passe')
    }*/


    /*
      insert image in folder on server
      uploadSingle(req,res,function(err){
              if(err){
                  console.log("erreur")
                  res.json({
                    error_code:1,
                    err_desc:err
                  });
                  return;
              }
              // console.log(req.file)
              console.log(req.file)
              
              res.json({
                success: `Image ${req.file.originalname} a été telchargé avec success`});
          })*/

}

const addImage = (req, res, next) => {
    uploadSingle(req, res, function(err) {
        var { nom_utilisateur, contact, email, type, mot_de_passe, confirmeMot_de_passe } = req.body
        console.log(nom_utilisateur + "/" + contact + "/" + email + "/" + type + mot_de_passe + "/" + confirmeMot_de_passe)
            // if(err){
            //     console.log("erreur")
            // }
            // else{
            //   if(req.file == undefined){
            //    res.send("pas d'image")
            //   }else{
            //     res.json({
            //       success: `Image ${req.file.originalname} a été telchargé avec success`
            //     });

        //   }
        // }
        /*---your code add table use --*/
        if (req.file == null) {
            console.log('file vide')
            let image = 'icon-user-default.png'
            console.log(image)
            if (mot_de_passe == confirmeMot_de_passe) {
                var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
                connect.pool.query('SELECT nom_utilisateur from utilisateur \
                where nom_utilisateur= $1', [nom_utilisateur], function(error, resultat) {
                    if (error) console.log(error.stack)
                    var tabResultat = [];
                    tabResultat = resultat.rows;
                    var trouver = tabResultat.find(nameFind => nameFind.nom_utilisateur == nom_utilisateur)
                    console.log(trouver)
                    if (!trouver) {
                        connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
                      mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)', [nom_utilisateur, mot_de_passe_hash, type, contact, email, image],
                            function(error, resultat) {
                                if (error) sendMessage(res, 1, 'Erreur d\'ajouter')

                            })
                        sendMessage(res, 1, 'Ajouter avec success')


                    } else {

                        sendMessage(res, 0, 'nom utilisateur déjà existé')
                    }
                })
            } else {
                sendMessage(res, 0, 'Verifier votre mot de passe')
            }
        } else {
            console.log('file n\'est pas vide')
            let image = req.file.filename
            console.log(image)
            if (mot_de_passe == confirmeMot_de_passe) {
                var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
                connect.pool.query('SELECT nom_utilisateur from utilisateur \
                where nom_utilisateur= $1', [nom_utilisateur], function(error, resultat) {
                    if (error) console.log(error.stack)
                    var tabResultat = [];
                    tabResultat = resultat.rows;
                    var trouver = tabResultat.find(nameFind => nameFind.nom_utilisateur == nom_utilisateur)
                    console.log(trouver)
                    if (!trouver) {
                        connect.pool.query('INSERT INTO utilisateur(nom_utilisateur,\
                      mot_de_passe, type, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)', [nom_utilisateur, mot_de_passe_hash, type, contact, email, image],
                            function(error, resultat) {
                                if (error) sendMessage(res, 1, 'Erreur d\'ajouter')

                            })
                        sendMessage(res, 1, 'Ajouter avec success')


                    } else {

                        sendMessage(res, 0, 'nom utilisateur déjà existé')
                    }
                })
            } else {
                sendMessage(res, 0, 'Verifier votre mot de passe')
            }
        }


    })
}

const update_utilisateur = (req, res) => {
    var nom_utilisateur = req.params.nom_utilisateur
    const { mot_de_passe, type, contact, email, image, confirmeMot_de_passe } = req.body
    if (mot_de_passe == confirmeMot_de_passe) {
        var mot_de_passe_hash = crypto.createHash('md5').update(mot_de_passe).digest('hex')
        connect.pool.query('SELECT *from utilisateur \
      where nom_utilisateur= $1', [nom_utilisateur], function(error, resultat) {
            if (error) throw error;
            var tabResultat = [];
            tabResultat = resultat.rows;
            var trouver = tabResultat.find(idFind => idFind.nom_utilisateur == nom_utilisateur)
            console.log(trouver)
            if (trouver) {
                if (image != null) {
                    connect.pool.query('UPDATE utilisateur SET nom_utilisateur = $1,\
              mot_de_passe = $2, type=$3, contact=$4, email=$5, image=$6 WHERE nom_utilisateur = $7', [nom_utilisateur, mot_de_passe_hash, type, contact, email, image, nom_utilisateur],
                        function(error, resultat) {
                            if (error) sendMessage(res, 0, 'Impossible de faire la modification car nom utilisateur est introuvable')

                        })
                    sendMessage(res, 1, 'Modification avec success')
                } else {
                    var file = 'icon-user-default.png'
                    connect.pool.query('UPDATE utilisateur SET nom_utilisateur = $1,\
            mot_de_passe = $2, type=$3, contact=$4, email=$5, image=$6 WHERE nom_utilisateur = $7', [nom_utilisateur, mot_de_passe_hash, type, contact, email, file, nom_utilisateur],
                        function(error, resultat) {
                            if (error) sendMessage(res, 0, 'Impossible de faire la modification car nom utilisateur est introuvable')

                        })

                    sendMessage(res, 1, 'Modification avec success')
                }

            } else {
                sendMessage(res, 0, `${contact} not found in table`)
            }
        })
    } else {
        sendMessage(res, 0, "mot de passe n\'est pas la même")
    }

}

// supprimer l'utilisateur
const delete_utilisateur = (req, res) => {
    var nom_utilisateur = req.params.nom_utilisateur
    connect.pool.query('DELETE FROM utilisateur WHERE nom_utilisateur = $1', [nom_utilisateur], function(error, results) {
        if (error) {
            sendMessage(res, 0, "La suppression a échoué")
        }
        sendMessage(res, 1, "La suppression a été éffectuée avec succès")
    })
}

//authentification de l'utilisateur, tout d'abord verifier si l'utilisateur exite
// quand l'utilisateur existe, on envoi le token pour appliquer les actions
const authentificate = (req, res) => {
    // find the user
    connect.pool.query('SELECT * FROM utilisateur WHERE nom_utilisateur = $1', [req.body.login], function(error, results) {
        if (error)
            res.send(error)
        var tab = []
        tab = results.rows;
        console.log(tab)
        var trouverUser = tab.find(login => login.nom_utilisateur == req.body.login);
        const password = crypto.createHash('md5').update(req.body.password).digest('hex')
        var trouverPassword = tab.find(passwordTrouve => passwordTrouve.mot_de_passe == password)
        if (trouverUser && trouverPassword) {
            console.log('trouver')
                // res.json({message: 'authentification true'})
            const payload = {
                admin: results.rows[0].type,
                user: results.rows[0].nom_utilisateur,
                image: results.rows[0].image
            }
            var token = jwt.sign(payload, config.secret, { expiresIn: '1d' })

            console.log('ok')

            res.json({
                success: true,
                message: 'Enjoy your token!',
                type: results.rows[0].type,
                token: token,
                image: results.rows[0].image
            })
        } else {
            console.log('non trouver')
            res.json({ message: 'erreur d\'authentification' })
        }
    })

}


//verification du token si un utilisateur déjà authentifier
const tokenVerification = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
        jwt.verify(token, config.secret, function(error, decoded) {
            if (error) {
                return res.json({ sucess: false, message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token providen'
        })
    }
}
const sendImage = (req, res) => {
    var nomImage = req.params.nomImage
    if (!nomImage) {
        res.sendFile(path.join(__dirname, `../../public/uploads/icon-user-default.png`))
    } else {
        res.sendFile(path.join(__dirname, `../../public/uploads/${nomImage}`))
    }

}

const testAppel = (req, res) => {
    res.json(addImage(req, res))
}

var callMe = (req, res) => {
    // res.json({
    //   id: 1,
    //   message: "bonjour"
    // })
    var val = "here"
    return val
}

module.exports = {
    getUser,
    registrer,
    sendImage,
    update_utilisateur,
    delete_utilisateur,
    authentificate,
    tokenVerification,
    addImage,
    testAppel
}



const sendMessage = (res, id, message) => {
    res.json({
        id: id,
        message: message
    })
}

const responseAdded = (res, err, result) => {
    if (err || result.rowCount < 1) {
        if (err)
        // console.error(err.stack)
            console.error('erreur d\'ajouter');

        sendMessage(res, 0, "Ajout impossible, cet reference fiche technique est déja existé")
    } else
        sendMessage(res, 1, "L'ajout a été éffectué avec succès")
}

const responseUpdated = (res, err, result) => {
    if (err || result.rowCount < 1) {
        if (err)
            console.error(err)
        sendMessage(res, 0, "La modification a échoué, veuillez verifier les données que vous avez saisi")
    } else
        sendMessage(res, 1, "La modification a été éffectuée avec succès")
}