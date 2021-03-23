import axios from 'axios'
let api = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

api.getCategorie = function(token){
    var url = 'http://' +host+ ':3000/categorie/?token=' +token
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

api.addCategorie = function(token, data) {
  var url = 'http://' + host + ':3000/categorie/?token=' + token
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


api.deleteCategorie = function(token, code_categorie){
    var url = 'http://' + host + ':3000/categorie/' + code_categorie + '/?token=' + token
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

api.updateCategorie = function(token, data, id) {
  var url = 'http://' + host + ':3000/categorie/' + id + '/?token=' + token
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


api.getUniqueCategorie = function(token) {
  var url = 'http://' + host + ':3000/categorie/getUniqueCategorie/?token=' + token
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
api.getUniqueCategorieData = function(token) {
  return new Promise((resolve, reject) => {
    api.getUniqueCategorie(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        val.value = donnee.nom_categorie
        val.text = `${donnee.code_categorie} -${donnee.nom_categorie}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}

api.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/categorie/get/auto_increment/?token=' + token
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

export default api