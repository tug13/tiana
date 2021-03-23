import axios from 'axios'
let apiInventaire = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiInventaire.getInventaire = function(token){
    var url = 'http://' +host+ ':3000/inventaire/?token=' +token
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

apiInventaire.addInventaire = function(token, data) {
  var url = 'http://' + host + ':3000/inventaire/?token=' + token
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


apiInventaire.deleteInventaire = function(token, refrence_article){
    var url = 'http://' + host + ':3000/inventaire/' + refrence_article +'/?token=' + token
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

apiInventaire.updateInventaire = function(token, data, id) {
  var url = 'http://' + host + ':3000/inventaire/' + id +'/?token=' + token
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



apiInventaire.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/nouvelle-numero-inventaire/?token=' + token
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

apiInventaire.getUniqueConteneur = function(token) {
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
apiInventaire.getUniqueConteneurData = function(token) {
  return new Promise((resolve, reject) => {
    apiInventaire.getUniqueConteneur(token).then((data) => {
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


export default apiInventaire