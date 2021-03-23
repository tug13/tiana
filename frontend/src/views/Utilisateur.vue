<template>
<v-container fluid>

<v-snackbar
  v-if="snackbar.messageSnackbar.message != null"
  :color="snackbar.messageSnackbar.id == 0 ? snackbar.color='red' : snackbar.color=null"
  v-model="snackbar.show"
  bottom right vertical
  :timeout="timeout"
  >
  {{ snackbar.messageSnackbar.message }}
  <v-btn
    :color="snackbar.messageSnackbar.id == 0 ? snackbar.color='white' : snackbar.color='blue'"
    text
    @click="snackbar.show = false"
    >
    Fermer
  </v-btn>
</v-snackbar>


<!--
<v-col
      align-self="start"
      class="pa-0"
      cols="12"
    >
      <v-avatar
        class="profile"
        color="grey"
        size="150"
        tile
      >
        <v-img :src="photos"></v-img>
      </v-avatar>
    </v-col>

-->
<v-toolbar
  dense
  class="fontUser"
  dark
  extended
  extension-height="100"
  flat
>
<v-toolbar-title class="mx-auto" slot="extension">
    <span>NOM: <strong
    class="font-weight-bold" 
    style="text-transform: uppercase"
    > {{ user }} </strong></span>
    <v-flex wrap>
        
          <v-list-item>
            <v-list-item-avatar width="100px" height="100px">
              <v-img :src="photos"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        
    </v-flex>
<!--<v-layout class="mb-3">
    <span class="display-1" toLowerCase>Utilisateur</span>
    <v-spacer></v-spacer>
    <v-text-field
      v-if="isAdmin"
      clearable
      :value="search"
      @keyup.enter="customSearch($event.target.value)"
      @click:clear="customSearch('')"
      append-icon="search"
      label="Rechercher"
      single-line
      hide-details
      ></v-text-field>
  </v-layout>-->
  </v-toolbar-title>
</v-toolbar>

  <v-data-table
    :search="search"
    :must-sort="true"
    :headers="headers"
    :items="utilisateurs"
    :loading="loading"
    :pagination.sync="pagination"
    sort-by="code"
    class="elevation-1"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn 
            :disabled="!isAdmin" 
            color="green" 
            @click="nouveau = true"
            dark class="mb-2" 
            v-on="on">
            Nouveau
            <v-icon right dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" enctype="multipart/form-data" lazy-validation >
                <v-container tag="form" grid-list-md>
                  <v-layout wrap>
                   <v-flex xs12 sm6 md6>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.nom_utilisateur" 
                      label="Nom utilisateur obligatoire" 
                      required
                      :rules="[v => !!v || 'Nom utilisateur obligatoire']"
                      ></v-text-field>
                    </v-flex>
                     <v-flex xs12 sm6 md6>
                      <v-text-field 
                      xs12 sm6 md6
                       maxlength="10"
                      v-model="editedItem.contact" 
                      required
                      :rules="[v => !!v || 'Contact obligatoire',
                      v => /^[0-9]{10}$/.test(v) || 'Contact doit être un numero valide']"
                      label="Contact obligatoire" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.email" 
                      required
                      :rules="[v => !!v || 'E-mail obligatoire',
                      v => /.+@.+/.test(v) || 'E-mail non valide']"
                      label="Email" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-select
                      :readonly="!isAdmin"
                      required
                      :rules="[v => !!v || 'Type utilisateur obligatoire']"
                      :items="userTypeItems"
                      v-model="editedItem.type"
                      label="Type utilisateur obligatoire"
                      ></v-select>
                    </v-flex>
                  </v-layout>

                  <v-text-field 
                  v-if="nouveau"
                  v-model="editedItem.mot_de_passe" 
                  type="password"
                  required
                  :rules="[v => !!v || 'Mot de passe obligatoire',
                  v => (v && v.length >= 6) || 'Min 6 characters']"
                  label="Mot de passe" 
                  ></v-text-field>
                  <v-text-field 
                  v-if="nouveau"
                  v-model="editedItem.confirmeMot_de_passe"
                  type="password" 
                  required
                  :rules="[v => !!v || 'Confirmez votre mot de passe',
                  v => (v && v.length >= 6) || 'Min 6 characters']"
                  label="Confirmer votre mot de passe" 
                  ></v-text-field>
                  <v-file-input
                  v-if="nouveau"
                  v-model="editedItem.file"
                  show-size 
                  counter 
                  multiple 
                  label="Telechargez image">
                  </v-file-input>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text v-if="!nouveau" flat @click="changePassword">Changer le mot de passe</v-btn>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="save">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- <template v-slot:item.action="{ item }">
      <v-icon
        :disabled="!isAdmin"
        small
        class="mr-2"
        @click="editItem(item)"
      >
        create
      </v-icon>
      <v-icon
        :disabled="!isAdmin"
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template> -->

    <template v-slot:item="row">
          <tr @click="select(row.item)" :active="row.selected" :class="{'green lighten-4': row.item === selected[0]}">
            <td style="text-transform: uppercase">{{row.item.nom_utilisateur}}</td>
            <td>{{row.item.contact}}</td>
            <td>{{row.item.email}}</td>
            <td>{{row.item.type}}</td>
            <td>
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(row.item)"
                >
                    create
                </v-icon>
                <v-icon
                    :disabled="!isAdmin"
                    small
                    @click="deleteItem(row.item)"
                >
                    delete
                </v-icon>
            </td>
          </tr>
      </template>
   
  </v-data-table>
   <v-footer padless>
     <v-col 
     class='text-center'
     cols="12">
     ©
     {{ new Date().getFullYear() }}
      Tout droit Reservé.
     </v-col>
   </v-footer>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
import apiClasse from '../api/Classe'
import apiUtilisateur from '../api/Utilisateur'

export default {
    data: () => ({
      selected: {},
      snackbar: {
          show: true,
          messageSnackbar: {},
          color: null
      },
      nouveau: true,
      timeout: 2000,
      dialog: false,
      search: '',
      loading: true,
      utilisateurs: [],
      pagination: {
        rowsPerPage: 10,
      },
      editedItem: {
        nom_utilisateur: '',
        contact: '',
        email: '',
        type: '',
        mot_de_passe: '',
        confirmeMot_de_passe: null,
        file: [],
        mot_de_passe_actuel: '',
        nouveau_mot_de_passe: '',
        confirme_nouveau_mot_de_passe: ''
      },
      editedIndex: -1,
      defaultItem: {
        nom_utilisateur: '',
        contact: '',
        email: '',
        type: '',
        mot_de_passe: '',
        confirmeMot_de_passe: null,
        file: [],
        mot_de_passe_actuel: '',
        nouveau_mot_de_passe: '',
        confirme_nouveau_mot_de_passe: ''
      },
      headers: [
        { text: 'Nom utilisateur', value: 'nom_utilisateur' },
        { text: 'Contact', value: 'contact' },
        { text: 'Email', value:'email'},
        { text: 'type', value: 'type'},
        { text: 'Actions', value: 'action', sortable: false },
      ],
    }),

    watch: {
      pagination: {
        handler () { 
          this.initialize(); 
          },
        deep: true
      },
      utilisateurs: {
        handler() { }
      },
        dialog (val) {
          val || this.close()
        },

      },

    computed: {
      ...mapState('login', {
      token: 'accessToken',
      userType: 'userType',
      user: 'user',
      userImage: 'userImage'
    }),
      formTitle () {
        return this.editedIndex === -1 ? 'Ajout d\'un utilisateur' : 'Modifier un utilisateur'
      },
      isAdmin () {
        return this.userType === 'admin'
      },
      photos () {
      let hosttemp = location.host
      let host = hosttemp.split(":")[0]
      host = !host ? 'localhost' : host
      var url ='http://'+ host +':3000/photos/'+ this.userImage+'/?token='+ this.token
      return url
      },
      isOfficier (){
        return this.userType == "officier"
      }
    },

    asyncComputed: {
       userTypeItems (){
          var tab = ["admin", "officier"]
          return tab;
       },
    },

    created () {
      this.initialize()
    },

    methods: {
      changePassword () {
      this.editedItem.mot_de_passe = ''
      this.nouveau = !this.nouveau
    },
     select(selectedItem) {
        this.selected = [];
        this.utilisateurs.forEach(item => {
          if (item.nom_utilisateur == selectedItem.nom_utilisateur) {
            return this.selected.push(item);
          }
          else return false;
        });
      }, 
     addItem () {
       apiClasse.auto_increment(this.token).then(results => {
         this.editedItem.code = results
         
       })
    },
      editItem (item) {
        this.nouveau = false
        this.editedIndex = this.utilisateurs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.mot_de_passe = ""
        this.dialog = true
      },
    
      async deleteItem (item) {
        const res = await this.$confirm('Êtes-vous certain de vouloir supprimer cet utilisateur <br>Nom: <strong style="text-transform: uppercase">'+item.nom_utilisateur+'</strong> &nbsp; &nbsp; Type: <strong style="text-transform: uppercase">'+ item.type +'</strong>', { title: 'Alert' })
        if(res){
         apiUtilisateur.deleteUtilisateur(this.token,item.nom_utilisateur)
          .then((response) => {
            this.snackbar.messageSnackbar = response
            this.snackbar.show = true
            this.initialize()
          })
        }
        else{
          return false
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          apiUtilisateur.editUtilisateur(this.token, this.editedItem, this.utilisateurs[this.editedIndex].nom_utilisateur).then((response) => {
            this.snackbar.messageSnackbar = response
            this.snackbar.show = true
            this.initialize()
            this.close()
          }).catch(error => alert(error))
        } else {
          // if (this.editedItem.file == null){
            apiUtilisateur.addUtilisateurData(this.token, this.editedItem).then((response) => {
            this.snackbar.messageSnackbar = response
            this.snackbar.show = true
            this.initialize()
            this.close()
          }).catch(error => alert(error))
          // }
          // else{
            //   console.log('file not null')
            //   apiUtilisateur.addUtilisateurData(this.token, this.editedItem).then((response) => {
            //   this.snackbar.messageSnackbar = response
            //   this.snackbar.show = true
            //   this.initialize()
            //   this.close()
            // }).catch(error => alert(error));
            // apiUtilisateur.addUtilisateurImage(this.token, this.editedItem)
          // }
        }

      }
      },
    customSearch(value) {
      this.search = value
      this.initialize()
    },
       initialize () {
        apiUtilisateur.getUtilisateur(this.token, this.user, this.userType)
          .then((results) => {
            setTimeout(()=>{
              this.loading = false
              this.utilisateurs = results
            },100)
            
          })
      }
    },
  }
</script>
<style scoped>
 .fontUser {
  background-image: url('../assets/logo.png');
  background-size: cover;
}
</style>