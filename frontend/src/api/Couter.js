import axios from 'axios'
let apiCouter = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiCouter.getCouter = function(token){
    var url = 'http://' +host+ ':3000/couter/?token=' +token
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

apiCouter.addCouter = function(token, data) {
  var url = 'http://' + host + ':3000/couter/?token=' + token
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


apiCouter.deleteCouter = function(token, refrence_article, dateCouter){
    var url = 'http://' + host + ':3000/couter/' + refrence_article + '/'+dateCouter+'/?token=' + token
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

apiCouter.updateCouter = function(token, data, id, dateCouter) {
  var url = 'http://' + host + ':3000/couter/' + id + '/'+dateCouter+'/?token=' + token
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



apiCouter.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/couter/get/auto_increment/?token=' + token
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

apiCouter.getUniqueCouterFromVolatile = function(token) {
  var url = 'http://' + host + ':3000/ArticleAll/get/getCodeVolatile/?token=' + token
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
apiCouter.getUniqueCouterDataFromVolatile = function(token) {
  return new Promise((resolve, reject) => {
    apiCouter.getUniqueCouterFromVolatile(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        val.value = donnee.reference_article
        // val.value = donnee.nom_classe
        val.text = `${donnee.reference_article} -${donnee.designation}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}


export default apiCouter