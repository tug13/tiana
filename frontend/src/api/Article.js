import axios from 'axios'
let api = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

api.getHost = function(){
  return host
}
api.getArticle = function(token){
    var url = 'http://' +host+ ':3000/ArticleAll/?token=' +token
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

api.addArticle = function(token, data) {
  var url = 'http://' + host + ':3000/article/?token=' + token
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


api.deleteArticle = function(token, reference_article){
    var url = 'http://' + host + ':3000/article/' + reference_article + '/?token=' + token
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

api.updateArticle = function(token, data, id) {
  var url = 'http://' + host + ':3000/article/' + id + '/?token=' + token
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

api.auto_increment = function(token) {
  var url = 'http://' + host + ':3000/article/get/auto_increment/?token=' + token
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

api.getReferenceArticle = function(token) {
  var url = 'http://' + host + ':3000/articleAll/article-prix-volatile/get/getReferenceArticle/?token=' + token
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
api.getReferenceArticleData = function(token) {
  return new Promise((resolve, reject) => {
    api.getReferenceArticle(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        val.value = donnee.reference_article
        val.text = `${donnee.reference_article}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}

api.getArticleExist = function(token) {
  var url = 'http://' + host + ':3000/articleAll/get/getArticleExist/?token=' + token
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
api.getArticleExistData = function(token) {
  return new Promise((resolve, reject) => {
    api.getArticleExist(token).then((data) => {
      let caractere = []
      data.forEach((donnee) => {
        let val = {}
        val.value = donnee.reference_article
        val.text = `${donnee.reference_article}`
        caractere.push(val)
      })
      resolve(caractere)
    }).catch((error) => reject(error))
  })
}

export default api