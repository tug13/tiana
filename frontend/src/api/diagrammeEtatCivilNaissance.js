import axios from 'axios'
let apiDiagrammeNaissance = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiDiagrammeNaissance.getHost = function() {
    return host
}
apiDiagrammeNaissance.getCountNaissance = function(token) {
    var url = 'http://' + host + ':3000/naissance/getTotalNombreNaissance/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(url)
                .then((results) => {
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100);
    })
}

apiDiagrammeNaissance.getAllOnlyDate = function(token) {
    var url = 'http://' + host + ':3000/naissance/getOnlyDate/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(url)
                .then((results) => {
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100);
    })
}

export default apiDiagrammeNaissance