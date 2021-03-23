import axios from 'axios'
let apideces = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apideces.getHost = function() {
    return host
}
apideces.getDeces = function(token) {
    var url = 'http://' + host + ':3000/deces/?token=' + token
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



apideces.getOnlyDate = function(token) {
    var url = 'http://' + host + ':3000/deces/getOnlyDate/?token=' + token
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

apideces.getOnlyTotalDeces = function(token) {
    var url = 'http://' + host + ':3000/deces/getCountDeces/?token=' + token
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

apideces.addDeces = function(token, data) {
    var url = 'http://' + host + ':3000/deces/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.post(url, data)
                .then((results) => {
                    if (results.data.errno) {
                        reject(results.data.sqlMessage)
                    }
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100)
    })
}


apideces.deleteDeces = function(token, num_ordre) {
    var url = 'http://' + host + ':3000/deces/' + num_ordre + '/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.delete(url)
                .then((results) => {
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100)
    })
}

apideces.updateDeces = function(token, data, num_ordre) {
    var url = 'http://' + host + ':3000/deces/' + num_ordre + '/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.put(url, data)
                .then((results) => {
                    if (results.data.errno) {
                        reject(results.data.sqlMessage)
                    }
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100)
    })
}

apideces.auto_increment = function(token) {
    var url = 'http://' + host + ':3000/article/get/auto_increment/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(url)
                .then((results) => {
                    if (results.data.errno) {
                        reject(results.data.sqlMessage)
                    }
                    if (results.data) {
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100)
    })
}

apideces.getReferenceArticle = function(token) {
    var url = 'http://' + host + ':3000/articleAll/article-prix-volatile/get/getReferenceArticle/?token=' + token
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
        }, 100)
    })
}
apideces.getReferenceArticleData = function(token) {
    return new Promise((resolve, reject) => {
        apideces.getReferenceArticle(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.reference_article
                val.text = `${donnee.reference_article}`
                caractere.push(val)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}

apideces.getArticleExist = function(token) {
    var url = 'http://' + host + ':3000/articleAll/get/getArticleExist/?token=' + token
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
        }, 100)
    })
}
apideces.getArticleExistData = function(token) {
    return new Promise((resolve, reject) => {
        apideces.getArticleExist(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.reference_article
                val.text = `${donnee.reference_article}`
                caractere.push(val)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}

export default apideces