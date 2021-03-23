module.exports = function(app) {
    var deces = require('../service/decesService')

    app.route('/deces')
        .get(deces.getDeces)
        .post(deces.addDeces)
    app.route('/deces/:num_ordre')
        .put(deces.updateDeces)
        .delete(deces.deleteDeces)
    app.route('/deces/getOnlyDate')
        .get(deces.getOnlyDate)
    app.route('/deces/getCountDeces')
        .get(deces.getTotalNombreDeces)

}