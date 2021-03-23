import axios from 'axios'
let apiPrixStable = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiPrixStable.getArticleStable = function(token){
    var url = 'http://' +host+ ':3000/articleAll/article-prix-stable/?token=' +token
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

apiPrixStable.addArticleStable = function(token, data) {
  var url = 'http://' + host + ':3000/articleAll/article-prix-stable/?token=' + token
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


apiPrixStable.deleteArticleStable = function(token, reference){
    var url = 'http://' + host + ':3000/articleAll/' + reference + '/?token=' + token
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

apiPrixStable.updateArticleStable = function(token, data, id) {
  var url = 'http://' + host + ':3000/articleAll/article-prix-stable/' + id + '/?token=' + token
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

apiPrixStable.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/articleAll/article_prix-stable/get/auto_increment_num_prix_stable/?token=' + token
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

apiPrixStable.getUniqueClasse = function(token) {
  var url = 'http://' + host + ':3000/articleAll/get/getCode_classe/?token=' + token
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
apiPrixStable.getUniqueClasseData = function(token) {
  return new Promise((resolve, reject) => {
    apiPrixStable.getUniqueClasse(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        val.value = donnee.code_classe
        val.text = `${donnee.code_classe} -${donnee.nom_classe}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}

export default apiPrixStable