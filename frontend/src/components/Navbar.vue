<template>
  <nav>
    <v-app-bar
      v-if="isLogin"
      dark
      prominent
      color="primary"
     
      >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Etat Civil</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-navigation-drawer v-if="isLogin" v-model='drawer' app class="">
     <v-list-item>
        <v-list-item-avatar>
          <v-img :src="photos"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ user }}</v-list-item-title>

        
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router
          :to="item.router"
          >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
      return {
            drawer: false,
            mini: true,
    }
    },
     methods: {
    ...mapActions('login', [
      'doLogin',
      'logout'
    ]),
  },
  computed: {
    ...mapState('login', {
      loggingIn:'loggingIn',
      loginError:'loginError',
      accessToken:'accessToken',
      user:'user',
      userType:'userType',
      userImage:'userImage'
    }),
    photos () {
      let hosttemp = location.host
      let host = hosttemp.split(":")[0]
      host = !host ? 'localhost' : host
      var url ='http://'+ host +':3000/photos/'+ this.userImage+'/?token='+ this.accessToken
      return url
      },
    isLogin() {
      return this.accessToken !== null
    },
    isAdmin() {
      return this.userType === 'admin'
    },
    isOfficier(){
      return this.userType === 'officier'
    },
    items() {
      if (this.isAdmin) {
        return [
          {
            title: 'Utilisateur',
            icon: 'supervisor_account',
            router: '/utilisateur'
          }
        ]
      }
      else if(this.isOfficier){
        return [
          { 
            title: 'Naissance', 
            icon: 'fa fa-child',
            router:'/naissance' 
          },
          { 
            title: 'Décès', 
            icon: 'airline_seat_flat',
            router:'/deces' 
          },
          {
            title: 'Stat',
            icon: 'fa fa-bar-chart',
            router: '/stat'
          },
           { 
            title: 'Utilisateur', 
            icon: 'list',
            router:'/utilisateur' }
        ]
      }
      else {
        return [
          { 
            title: 'login', 
            icon: 'list',
            router:'/login' 
          }
        ]
      }
    },
    
},
  props: {
    source: String
  }
}
</script>