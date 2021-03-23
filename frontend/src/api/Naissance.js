import axios from 'axios'
let apiNaissance = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiNaissance.getHost = function() {
    return host
}
apiNaissance.getNaissance = function(token) {
    var url = 'http://' + host + ':3000/naissance/?token=' + token
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

apiNaissance.getDataByNum_ordre = function(token, num_ordre) {
    var url = 'http://' + host + ':3000/naissance/getDataByNum_ordre/' + num_ordre + '?token=' + token
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

apiNaissance.addNaissance = function(token, data) {
    var url = 'http://' + host + ':3000/naissance/?token=' + token
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


apiNaissance.deleteNaissance = function(token, num_ordre) {
    var url = 'http://' + host + ':3000/naissance/' + num_ordre + '/?token=' + token
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

apiNaissance.updateNaissance = function(token, data, num_ordre) {
    var url = 'http://' + host + ':3000/naissance/' + num_ordre + '/?token=' + token
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

apiNaissance.auto_increment = function(token) {
    var url = 'http://' + host + ':3000/naissance/get/auto_increment/?token=' + token
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

apiNaissance.getNumOrdreNaissance = function(token) {
    var url = 'http://' + host + ':3000/naissance/getNumOrdreNaissance/?token=' + token
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
apiNaissance.getNumOrdreNaissanceData = function(token) {
    return new Promise((resolve, reject) => {
        apiNaissance.getNumOrdreNaissance(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.num_ordre
                val.text = `${donnee.num_ordre} (${donnee.nom_enfant} ${donnee.prenoms_enfant})`
                caractere.push(val)

            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}

apiNaissance.getNumOrdreNaissanceDefunt = function(token) {
    var url = 'http://' + host + ':3000/naissance/getNumOrdreNaissanceDefunt/?token=' + token
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
apiNaissance.getNumOrdreNaissanceDefuntData = function(token) {
    return new Promise((resolve, reject) => {
        apiNaissance.getNumOrdreNaissanceDefunt(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.num_ordre
                val.text = `${donnee.num_ordre} (${donnee.nom_enfant} ${donnee.prenoms_enfant})`
                caractere.push(val)

            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}


apiNaissance.getPere = function(token) {
    var url = 'http://' + host + ':3000/naissance/getPere/?token=' + token
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

apiNaissance.getDataPere = function(token, nom_enfant_pere) {
    var url = 'http://' + host + ':3000/naissance/getDataPere/' + nom_enfant_pere + '/?token=' + token
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

apiNaissance.getPereData = function(token) {
    return new Promise((resolve, reject) => {
        apiNaissance.getPere(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.nom_enfant
                val.text = `${donnee.num_ordre} (${donnee.nom_enfant})`
                caractere.push(val)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}



apiNaissance.getMere = function(token) {
    var url = 'http://' + host + ':3000/naissance/getMere/?token=' + token
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

apiNaissance.getDataMere = function(token, nom_enfant_pere) {
    var url = 'http://' + host + ':3000/naissance/getDataMere/' + nom_enfant_pere + '/?token=' + token
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

apiNaissance.getMereData = function(token) {
    return new Promise((resolve, reject) => {
        apiNaissance.getMere(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.nom_enfant
                val.text = `${donnee.num_ordre} (${donnee.nom_enfant})`
                caractere.push(val)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}


apiNaissance.getDeclarantNaissance = function(token) {
    var url = 'http://' + host + ':3000/naissance/getDeclarantNaissance/?token=' + token
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

apiNaissance.getDeclarantNaissanceData = function(token) {
    return new Promise((resolve, reject) => {
        apiNaissance.getDeclarantNaissance(token).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let val = {}
                val.value = donnee.nom_enfant
                val.text = `${donnee.num_ordre} (${donnee.nom_enfant} ${donnee.prenoms_enfant})`
                caractere.push(val)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}

apiNaissance.getAllByNom_enfantDeclarant = function(token, nom_declarant_naissance) {
    var url = 'http://' + host + ':3000/naissance/getDatDeclarant/' + nom_declarant_naissance + '/?token=' + token
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


export default apiNaissance