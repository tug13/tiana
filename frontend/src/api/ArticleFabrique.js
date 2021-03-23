import axios from 'axios'
let apiFabrique = {}
let hosttemp = location.host
let host = hosttemp.split(":")[0]
host = !host ? 'localhost' : host

apiFabrique.getArticleFabrique = function(token){
    var url = 'http://' +host+ ':3000/articleAll/article-fabrique/?token=' +token
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

apiFabrique.addArticleFabrique = function(token, data) {
  var url = 'http://' + host + ':3000/articleAll/article-fabrique/?token=' + token
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


apiFabrique.deleteArticleFabrique = function(token, reference_article){
    var url = 'http://' + host + ':3000/articleAll/article-fabrique/' + reference_article + '/?token=' + token
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

apiFabrique.updateArticleFabrique = function(token, data, id) {
  var url = 'http://' + host + ':3000/articleAll/article-fabrique/' + id + '/?token=' + token
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

apiFabrique.auto_increment = function(token) {
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

export default apiFabrique