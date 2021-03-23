import axios from 'axios'
import router from '../../router/index'

const state = {
    accessToken: null,
    loggingIn: false,
    loginError: null,
    user: '',
    userType: '',
    userImage: ''
}


const mutations = {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
        state.loggingIn = false
        state.loginError = errorMessage
    },
    logout: (state) => {
        state.accessToken = null
    },
    updateData: (state, data) => {
        if (data) {
            state.accessToken = data.token
            state.user = data.login
            state.userType = data.type
            state.userImage = data.image
        }
    }
}

const getters = {
    isLogin: (state) => {
        return state.accessToken ? true : false
    }
}

const actions = {
    doLogin({ commit }, loginData) {
        var host = location.host
        var hosttrue = host.split(":")[0]
        hosttrue = !hosttrue ? 'localhost' : hosttrue
        var url = 'http://' + hosttrue + ':3000/utilisateur/authentificate'
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('loginStart')

                axios.post(url, {
                    ...loginData
                }).then((results) => {
                    if (results.data) {
                        if (results.data.success) {
                            localStorage.setItem('accessToken', results.data.token)
                            localStorage.setItem('login', loginData.login)
                            localStorage.setItem('type', results.data.type)
                            localStorage.setItem('image', results.data.image)
                            commit('loginStop', null)
                            commit('updateData', results.data.token)
                            if (results.data.type == 'admin') {
                                router.push('/utilisateur')
                            } else if (results.data.type == 'officier') {
                                router.push('/naissance')
                            } else {
                                router.push('/')
                            }

                            resolve()
                        } else {
                            commit('loginStop', results.data.message)
                            commit('updateData', null)
                        }
                    } else {
                        commit('loginStop', 'Server error')
                        commit('updateData', null)
                    }
                }).catch(error => {
                    commit('loginStop', error)
                    commit('updateData', null)
                    reject()
                })
                reject()
            }, 100)
        })
    },
    fetchData({ commit }) {
        let data = {}
        data.token = localStorage.getItem('accessToken')
        data.login = localStorage.getItem('login')
        data.type = localStorage.getItem('type')
        data.image = localStorage.getItem('image')

        commit('updateData', data)
    },
    logout({ commit }) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('login')
        localStorage.removeItem('type')
        localStorage.removeItem('image')
        commit('logout')
        commit('updateData', null)
        router.push('/login')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}