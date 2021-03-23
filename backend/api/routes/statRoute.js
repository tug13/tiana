module.exports = function(app) {
    var stat = require('../service/statService')

    app.route('/stat/getDataNaissance')
        .get(stat.getDataNaissance)
    app.route('/stat/getCountNaissanceMasculin')
        .get(stat.getSexNaissanceMasculin)
    app.route('/stat/getAnneeTotalNaissance')
        .get(stat.getAnneeTotalNaissance)
    app.route('/stat/getAnneeTotalDeces')
        .get(stat.getAnneeTotalDeces)
    app.route('/stat/getCountMasculinDataNaissance/:date_split')
        .get(stat.getCountMasculinDataNaissance)
    app.route('/stat/total_in_base')
        .get(stat.total_in_base)
    app.route('/stat/total_in_base_vivant')
        .get(stat.total_in_base_vivant)
    app.route('/stat/total_in_base_mort')
        .get(stat.total_in_base_mort)

}