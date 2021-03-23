
module.exports = function(app) {
    var utilisateur = require('../service/utilisateurService')

    app.route('/utilisateur/authentificate')
        .post(utilisateur.authentificate)
    app.use(utilisateur.tokenVerification)

    app.route('/utilisateur')
        .post(utilisateur.registrer)
    app.route('/utilisateur/:nom_utilisateur/:userType')
        .get(utilisateur.getUser)
    app.route('/utilisateur/:nom_utilisateur')
        .delete(utilisateur.delete_utilisateur)
        .put(utilisateur.update_utilisateur)
    app.route('/utilisateur/addImage')
        .post(utilisateur.addImage)
    app.route('/photos/:nomImage')
        .get(utilisateur.sendImage)
    app.route('/testAppel')
        .get(utilisateur.testAppel)
}