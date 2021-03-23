import axios from 'axios'
let apiLigneVente = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiLigneVente.getLigneVente = function(token, id){
    var url = 'http://' +host+ ':3000/ligneVente/'+id+'/?token=' +token
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            axios.get(url)
                .then((results) =>{
                    if(results.data){
                        resolve(results.data)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }, 100);
    })
}

apiLigneVente.addVente = function(token, data) {
  var url = 'http://' + host + ':3000/vente/?token=' + token
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      axios.post(url, data)
        .then((results) => {
          if(results.data.errno) {
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


apiLigneVente.deleteLigneVente = function(token,  numero_ligne_vente, reference_ft){
    var url = 'http://' + host + ':3000/ligneVente/' + numero_ligne_vente +'/'+ reference_ft +'/?token=' + token
    return new Promise((resolve, reject) => {
    setTimeout(()=> {
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

apiLigneVente.updateVente = function(token, data, id) {
  var url = 'http://' + host + ':3000/vente/' + id +'/?token=' + token
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      axios.put(url, data)
        .then((results) => {
          if(results.data.errno) {
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



apiLigneVente.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/ligneVente/get/auto_increment/?token=' + token
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      axios.get(url)
        .then((results) => {
          if(results.data.errno) {
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

apiLigneVente.getUniqueConteneur = function(token) {
  var url = 'http://' + host + ':3000/conteneur/get/codeConteneur/?token=' + token
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
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
apiLigneVente.getUniqueConteneurData = function(token) {
  return new Promise((resolve, reject) => {
    apiLigneVente.getUniqueConteneur(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        // val.value = donnee.code_conteneur
        val.value = donnee.nom_conteneur
        // val.value = donnee.nom_classe
        val.text = `${donnee.code_conteneur} (${donnee.nom_conteneur})`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}


export default apiLigneVente