const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'etatcivil',
    password: 'ratiavina13',
    port: 5432,
})
pool.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return
    }
})
module.exports = {
    pool
}