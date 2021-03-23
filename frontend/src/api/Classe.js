import axios from 'axios'
let apiClasse = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiClasse.getClasse = function(token){
    var url = 'http://' +host+ ':3000/classe/?token=' +token
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

apiClasse.addClasse = function(token, data) {
  var url = 'http://' + host + ':3000/classe/?token=' + token
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


apiClasse.deleteClasse = function(token, code){
    var url = 'http://' + host + ':3000/classe/' + code + '/?token=' + token
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

apiClasse.updateClasse = function(token, data, id) {
  var url = 'http://' + host + ':3000/classe/' + id + '/?token=' + token
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



apiClasse.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/classe/get/auto_increment/?token=' + token
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

apiClasse.getUniqueClasse = function(token) {
  var url = 'http://' + host + ':3000/classe/get/getCode_classe/?token=' + token
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
apiClasse.getUniqueClasseData = function(token) {
  return new Promise((resolve, reject) => {
    apiClasse.getUniqueClasse(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        // val.value = donnee.code_classe
        val.value = donnee.nom_classe
        val.text = `${donnee.code_classe} -${donnee.nom_classe}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}

export default apiClasse