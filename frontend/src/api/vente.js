import axios from 'axios'
let apiVente = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiVente.getVente = function(token){
    var url = 'http://' +host+ ':3000/vente/?token=' +token
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

apiVente.addVente = function(token, data) {
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


apiVente.deleteVente = function(token, id){
    var url = 'http://' + host + ':3000/vente/' + id +'/?token=' + token
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

apiVente.updateVente = function(token, data, id) {
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



apiVente.lastNumVente = function(token) {
  var url = 'http://' + host + ':3000/vente/get/lastReferenceVente/?token=' + token
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

apiVente.getUniqueConteneur = function(token) {
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
apiVente.getUniqueConteneurData = function(token) {
  return new Promise((resolve, reject) => {
    apiVente.getUniqueConteneur(token).then((data) => {
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


export default apiVente