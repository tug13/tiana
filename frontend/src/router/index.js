import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/naissance',
            name: 'naissance',
            component: () =>
                import ('../views/Naissance.vue')
        },
        {
            path: '/deces',
            name: 'deces',
            component: () =>
                import ('../views/Deces.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/Login.vue')
        },
        {
            path: '/stat',
            name: 'stat',
            component: () =>
                import ('../views/Stat.vue')
        },
        {
            path: '/utilisateur',
            name: 'utilisateur',
            component: () =>
                import ('../views/Utilisateur.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.dispatch('login/fetchData')
    if (to.fullPath !== '/login') {
        if (!store.state.login.accessToken) {
            next('/login')
        }

        if (to.fullPath === '/')
            next('/naissance')
    } else {
        if (store.state.login.accessToken) {
            next('/naissance')
        }
    }
    next()
})


export default router