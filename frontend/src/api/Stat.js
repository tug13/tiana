import axios from 'axios'
let apiStat = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiStat.getHost = function() {
    return host
}
apiStat.getCountNaissanceMasculinById = function(token, date_split) {
    var url = 'http://' + host + ':3000/stat/getCountMasculinDataNaissance/' + date_split + '/?token=' + token
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
        // axios.get(url)
        //     .then((results) => {
        //         alert(results.data)
        //         return results.data
        //     })
        //     .catch(error => {
        //         return alert(error)
        //     })
}

apiStat.getDecesTotalNaissance = function(token) {
    var url = 'http://' + host + ':3000/stat/getAnneeTotalDeces/?token=' + token
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

apiStat.getAnneeTotalNaissance = function(token) {
    var url = 'http://' + host + ':3000/stat/getAnneeTotalNaissance/?token=' + token
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

apiStat.getCountNaissanceMasculin = function(token) {
    var url = 'http://' + host + ':3000/stat/getCountNaissanceMasculin/?token=' + token
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

apiStat.getDataByNum_ordre = function(token, num_ordre) {
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

apiStat.addNaissance = function(token, data) {
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


apiStat.deleteNaissance = function(token, num_ordre) {
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

apiStat.updateNaissance = function(token, data, num_ordre) {
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

apiStat.auto_increment = function(token) {
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

apiStat.getNumOrdreNaissance = function(token) {
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
apiStat.getNumOrdreNaissanceData = function(token) {
    return new Promise((resolve, reject) => {
        apiStat.getNumOrdreNaissance(token).then((data) => {
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

apiStat.getPere = function(token) {
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

apiStat.getDataPere = function(token, nom_enfant_pere) {
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

apiStat.getPereData = function(token) {
    return new Promise((resolve, reject) => {
        apiStat.getPere(token).then((data) => {
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



apiStat.getMere = function(token) {
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

apiStat.getDataMere = function(token, nom_enfant_pere) {
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

apiStat.getMereData = function(token) {
    return new Promise((resolve, reject) => {
        apiStat.getMere(token).then((data) => {
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


apiStat.getDeclarantNaissance = function(token) {
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

apiStat.getDeclarantNaissanceData = function(token) {
    return new Promise((resolve, reject) => {
        apiStat.getDeclarantNaissance(token).then((data) => {
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

apiStat.getAllByNom_enfantDeclarant = function(token, nom_declarant_naissance) {
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


apiStat.get_total_in_base = function(token) {
    var url = 'http://' + host + ':3000/stat/total_in_base/?token=' + token
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

apiStat.get_total_in_base_vivant = function(token) {
    var url = 'http://' + host + ':3000/stat/total_in_base_vivant/?token=' + token
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

apiStat.get_total_in_base_mort = function(token) {
    var url = 'http://' + host + ':3000/stat/total_in_base_mort/?token=' + token
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

export default apiStat