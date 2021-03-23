import axios from 'axios'
import FormData from 'form-data'

let apiUtilisateur = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiUtilisateur.getUtilisateur = function(token, user, userType) {
    var url = 'http://' + host + ':3000/utilisateur/' + user + '/' + userType + '/?token=' + token
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



apiUtilisateur.getUtilisateurData = function(token, filter) {
    return new Promise((resolve, reject) => {
        apiUtilisateur.getUtilisateur(token, filter).then((data) => {
            let caractere = []
            data.forEach((donnee) => {
                let util = {}
                util.value = donnee.nom_utilisateur
                util.text = donnee.nom_utilisateur
                caractere.push(util)
            })
            resolve(caractere)
        }).catch((error) => reject(error))
    })
}


apiUtilisateur.deleteUtilisateur = function(token, nom_utilisateur) {
    var url = 'http://' + host + ':3000/utilisateur/' + nom_utilisateur + '/?token=' + token
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

apiUtilisateur.addUtilisateurData2 = function(token, data) {
    var url = 'http://' + host + ':3000/utilisateur?token=' + token
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


apiUtilisateur.addUtilisateurData = function(token, data) {
    let formData = new FormData();
    formData.append('nom_utilisateur', data.nom_utilisateur)
    formData.append('contact', data.contact)
    formData.append('email', data.email)
    formData.append('type', data.type)
    formData.append('mot_de_passe', data.mot_de_passe)
    formData.append('confirmeMot_de_passe', data.confirmeMot_de_passe)
    formData.append('file', data.file[0]);
    var url = 'http://' + host + ':3000/utilisateur/addImage/?token=' + token
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.post(url, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data;`
                    }
                })
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

apiUtilisateur.editUtilisateur = function(token, data, nom_utilisateur) {
    var url = 'http://' + host + ':3000/utilisateur/' + nom_utilisateur + '?token=' + token
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

export default apiUtilisateur