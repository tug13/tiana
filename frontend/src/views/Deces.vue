<template>
<v-container fluid>
  <v-snackbar
    v-if="snackbar.messageSnackbar.message != null"
    :color="snackbar.messageSnackbar.id == 0 ? snackbar.color='warning' : snackbar.color=null"
    v-model="snackbar.show"
    bottom right vertical
    :timeout="timeout"
    >
    {{ snackbar.messageSnackbar.message }}
    <v-btn
      :color="snackbar.messageSnackbar.id == 0 ? snackbar.color='red' : snackbar.color='blue'"
      text
      @click="snackbar.show = false"
      >
      Fermer
    </v-btn>
  </v-snackbar>
  <v-layout class="mb-3">
        <span class="display-1" toLowerCase>Deces</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Rechereche"
          single-line
          hide-details
          ></v-text-field>
      </v-layout>

  <v-data-table
    :sort-desc="[true]"
    :headers="headers"
    :items="deces"
    sort-by="num_ordre"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">

<!--code pour gerer pdf deces ici-->

                <v-dialog v-model="dialogDetailDeces" scrollable max-width="1000px" persistent>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        :disabled="btnStatus"
                         class="ma-2"
                         color="success" 
                         v-on="on">
                         Voir detail <strong class="mx-2">{{ getItem.num_ordre }} </strong>
                        <v-icon right dark>mdi-plus</v-icon>
                         </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">Generer un acte de deces : <strong style="text-transform: uppercase"> {{ getItem.nom_enfant}}</strong></span>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue-grey"
                          class="ma-2 white--text"
                          @click="downloadPDF"
                        >
                        Export PDF
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="pdf" ref="document" style="height: 1200px;">
                            <br/>
                            <v-row
                              class="mb-6"
                              no-gutters
                            >
                              <v-col cols="6" md="8">
                                <table outlined tile>
                                    <div ><strong style="text-transform: uppercase">REPOBLIKAN'I MADAGASCAR</strong></div>
                                    <div ><strong>Tanindrazana - Fahafahana - Fandrosoana</strong></div><br/>
                                    <div><strong><hr align="right" size="4" color="black"/></strong></div>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase;">FIANARANTSOA</strong></div>
                                    <div><strong><hr align="right" size="4" color="black"/></strong></div><br/>
                                    <div style="text-align: center;"><strong>Commune Urbaine de</strong></div>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase;">Fianarantsoa</strong></div>
                                </table>
                             </v-col>
                             <v-col cols="6" md="4">
                                <table width="100%" border="2" cellspacing="1" cellpadding="1" class="pa-2" outlined tile>
                                  <div style="text-align: center;">Teny midina laharana faha - 788-MJ/CAB</div>
                                  <div style="text-align: center;">tamin'ny 29 desambra 1961 nataon'ny</div>
                                  <div style="text-align: center;">Ministry ny Fitsarana</div><br/>
                                  <div style="text-align: center;">sy Mpitahiry ny Kasem-panjakana</div>
                                </table>
                             </v-col>  
                            </v-row>

                            <!--content pdf-->

                            <v-row
                              class="mb-6"
                              no-gutters
                            >
                              <v-col>
                                <table outlined tile>
                                  
                                    <div ><strong style="text-transform: uppercase">FAHA: </strong>{{ getItem.num_ordre }}</div>
                                    <div>{{ getDateNowNotConvert }}</div>
                                   <br/><br/>
                                    <div style="text-align: center;"><strong>Sora - pahafatesana</strong></div><br/>
                                    <div style="text-align: center;"><strong>{{ getItem.nom_enfant }}</strong></div>
                                    <div style="text-align: center; text-transform: uppercase;"><p>{{ getItem.date_defunt}}</p></div><br/>
                                    <div style="text-align: center; text-transform: uppercase;"><p>Kopia voloany</p></div>
                                </table>
                             </v-col>
                             <v-col cols="12" md="9">
                                <table width="100%" outlined tile>
                                  <div><h1>KOPIAN'NY SORA-PIANKOHONANA</h1></div><br/><br/>
                                  <div><p align="justify">Nalaina tamin'ny bokim-piankohonana, taona {{changeDateToLettreYear(2000)}} voatahiry ato amin'ny Commune Urbaine de Fianarantsoa 
                                          izao soratra izao:    
                                      </p></div>
                                  <div><p align="justify">Tamin'ny taona {{getItem.date_defunt_to_gasy}}, tamin'ny {{ getItem.heure_deces}}, no maty tao {{ getItem.lieu_deces_enfant}} i {{ getItem.nom_enfant}}, {{ getItem.profession}}, 
                                    teraka tamin'ny {{ getItem.date_naissance_defunt_to_gasy}} tao {{ getItem.lieu_naissance }} 
                                          zanak'i {{getItem.nom_pere_defunt}}, vadin'i {{ getItem.nom_mere_defunt}}.
                                    </p></div>
                                    <div>
                                      <p align="justify">
                                        Nosoratana androany {{ getDateNow }} tamin'ny ora sy minitra araka ny fanambarana nataon'i solo teraka tamin'ny taona {{ getItem.date_naissance_declarant }} tao toerana
                                        monina ao toerana ka miara manao sonia aminay, officier, mpiandraikitra ny sora-piankohonana ao amin'ny Commune Urbaine de 
                                        Fianarantsoa rehefa novakiana taminy ity soratra ity
                                      </p>
                                    </div>
                                    <br/>
                                    <div style="text-align: center;">
                                      <p>
                                        -MANARAKA NY SONIA-
                                      </p>
                                    </div>
                                  <div style="font-size: bold; text-align: center;"><strong>Kopia manontolo tao amin'ny boky androany {{ getDateNow }}</strong></div><br/>
                                  <div style="text-align: center;"><p style="text-transform: uppercase;">NY MPIANDRAIKITRA NY SORA-PIANKOHONANA</p></div>
                                </table>
                             </v-col>  
                            </v-row>


                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn color="blue darken-1" text @click="dialogDetailDeces = false">Fermer</v-btn>
                        </v-card-actions>
                  </v-card>
                </v-dialog>


<!--fermer gerer pdf deces ici-->











              <v-dialog v-model="dialogDiagramme" persistent max-width="820px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-2"
                    color="info"
                    v-on="on"
                    @click="getDataForDiagramme"
                  >
                    Diagramme
                    <v-icon right dark>show_chart</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="overline">Etat Civil</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 420px">
                    <v-container>
                      <apexchart width="660px" type="bar" :options="options" :series="series"></apexchart>
                    </v-container>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="blue darken-1" text @click="closeDialogDiagramme">Fermer</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>




















        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1200px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn 
            color="green" 
            dark 
            class="mb-2" 
            v-on="on"
            >
            Nouveau
            <v-icon right dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text >
              <v-form ref="form" v-model="valid" lazy-validation >
                <v-container tag="form" grid-list-md>
                   <v-subheader> 
                  <h1>Le défunt</h1>
                </v-subheader>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md3>
                      <v-autocomplete
                      required
                      :rules="[v => !!v || 'Num ordre du defunt obligatoire']"
                      :items="num_ordreItems"
                      :filter="customFilter"
                      v-model="editedItem.num_ordre"
                      label="Num ordre defunt"
                      item-text="text"
                      ></v-autocomplete>
                    </v-flex>
                    <!-- <v-flex xs12 sm6 md3>
                      <v-select
                      required
                      :rules="[v => !!v || 'Num ordre du defunt obligatoire']"
                      :items="num_ordreItems"
                      v-model="editedItem.num_ordre"
                      label="Num ordre defunt"
                      ></v-select>
                    </v-flex> -->
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.nom_enfant" 
                      required
                      :rules="[v => !!v || 'Nom defunt obligatoire']"
                      label="Nom defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.lieu_naissance" 
                      required
                      :rules="[v => !!v || 'Lieu naissance defunt obligatoire']"
                      label="Lieu naissance du defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.sexe_defunt" 
                      required
                      :rules="[v => !!v || 'Sexe defunt obligatoire']"
                      label="Sexe defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.nom_pere_defunt" 
                      required
                      :rules="[v => !!v || 'Nom pere defunt obligatoire']"
                      label="Nom pere defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.nom_mere_defunt" 
                      required
                      :rules="[v => !!v || 'Nom mere defunt obligatoire']"
                      label="Nom mere defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      readonly
                      xs12 sm6 md6
                      v-model="editedItem.date_naissance_defunt" 
                      required
                      :rules="[v => !!v || 'Date naissance defunt obligatoire']"
                      label="Date naissance defunt" 
                      ></v-text-field>
                    </v-flex>
                          <v-menu
                             v-model="menudefunts"
                             :close-on-content-click="false"
                             :nudge-right="40"
                             transition="scale-transition"
                             offset-y
                             min-width="290px"
                           >
                          <template v-slot:activator="{ on }">
                           <v-text-field
                             v-model="editedItem.date_defunt"
                            label="Date deces"
                             prepend-icon="event"
                            readonly
                             v-on="on"
                           ></v-text-field>
                         </template>
                          <v-date-picker v-model="editedItem.date_defunt" @input="menudefunts = false"></v-date-picker>
                         </v-menu>
                    
                    
                     
                    <!-- </v-flex> -->
                    <v-flex xs12 sm6 md3>
                      <v-menu
        ref="menu"
        v-model="heuredefunts"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="heure_deces"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="editedItem.heure_deces"
            :rules="heureRules"
            label="Heure de deces"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="heuredefunts"
          v-model="editedItem.heure_deces"
          full-width
          @click:minute="$refs.menu.save(heure_deces)"
        ></v-time-picker>
      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.profession" 
                      required
                      :rules="[v => !!v || 'Profession defunt obligatoire']"
                      label="Profession defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.adresse_enfant_deces" 
                      required
                      :rules="[v => !!v || 'Adresse defunt obligatoire']"
                      label="Adresse defunt" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.lieu_deces_enfant" 
                      required
                      :rules="[v => !!v || 'Lieu deces obligatoire']"
                      label="Lieu deces du defunt" 
                      ></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                <v-container>
                  <v-subheader> 
                  <h1>Le déclarant</h1>
                </v-subheader>
                  <v-layout>
                  
                    <v-flex xs12 sm6 md3>
                      <v-autocomplete
                      required
                      :rules="[v => !!v || 'Num declarant du deces obligatoire']"
                      :items="num_ordre_declaarant_Items"
                      :filter="customFilterDeclarant"
                      v-model="editedItem.num_ordre_declarant"
                      label="Num declarant"
                      item-text="text"
                      ></v-autocomplete>
                      <!-- <v-select
                      required
                      :rules="[v => !!v || 'Num declarant du deces obligatoire']"
                      :items="num_ordre_declaarant_Items"
                      v-model="editedItem.num_ordre_declarant"
                      label="Num declarant"
                      ></v-select> -->
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.date_naissance_declarant" 
                      required
                      :rules="[v => !!v || 'date naissance du declarant obligatoire']"
                      label="Date naissance declarant" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.lieu_naissance_declarant" 
                      required
                      :rules="[v => !!v || 'Lieu naissance declarant obligatoire']"
                      label="Lieu naissance declarant" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.adresse_declarant" 
                      required
                      :rules="[v => !!v || 'Adresse declarant obligatoire']"
                      label="Adresse declarant" 
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-select
                        :items="causes"
                        v-model="editedItem.causes"
                        xs12 sm6 md3
                        label="Causes de la mort" 
                        ></v-select>
                    </v-flex>
                  </v-layout>
                  
                </v-container>
               
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="save">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="row">
          <tr @click="select(row.item)" :active="row.selected" :class="{'green lighten-4': row.item === selected[0]}">
            <td>{{row.item.num_ordre}}</td>
            <td><strong>{{row.item.nom_enfant}}</strong></td>
            <td>{{row.item.date_defunt}}</td>
            <td>{{row.item.causes}}</td>
            <td>
               <v-icon
                    small
                    class="mr-2"
                    @click="editItem(row.item)"
                >
                    create
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(row.item)"
                >
                    delete
                </v-icon>
            </td>
          </tr>
      </template>

  </v-data-table>
</v-container>
</template>
<script>
import { mapState } from 'vuex'
import apiDeces from '../api/Deces'
import apiNaissance from '../api/Naissance'
import html2pdf from 'html2pdf.js'

export default {
    data: () => ({
      num_ordreItems: [],
      num_ordre_declaarant_Items: [],
      dialogDiagramme: false,
      dialogDetailDeces: false,
      selected: {},
        snackbar: {
          show: true,
          messageSnackbar: {},
          color: null
      },
      timeout: 2000,
      dialog: false,
      search: '',
      searchInput: '',
      loading: true,
      menudefunts: false,
      heuredefunts: false,
      deces: [],
      pagination: {
        rowsPerPage: 10,
      },
      editedItem: {
        nom_enfant:'', 
        num_ordre_declarant: '',
        causes: '',
        date_naissance_declarant: '',
        profession: '',
        lieu_naissance: '',
        adresse_enfant_deces: '',
        adresse_declarant: '',
        lieu_deces_enfant: '',
        lieu_naissance_declarant: '',
        num_ordre: '',
        heure_deces: '',
        date_defunt:'',
        sexe_defunt:'',
        nom_pere_defunt: '',
        nom_mere_defunt: '', 
        date_naissance_defunt: ''

      },
      editedIndex: -1,
      defaultItem: {
        nom_enfant:'', 
        num_ordre_declarant: '',
        causes: '',
        date_naissance_declarant: '',
        profession: '',
        lieu_naissance: '',
        adresse_enfant_deces: '',
        adresse_declarant: '',
        lieu_deces_enfant: '',
        lieu_naissance_declarant: '',
        num_ordre: '',
        heure_deces: '',
        date_defunt:'',
        sexe_defunt:'',
        nom_pere_defunt: '',
        nom_mere_defunt: '', 
        date_naissance_defunt: ''
      },
      causes:["MORT NATURELLE EN MILIEU HOSPITALIER","MORT NATURELLE SURVENUE A DOMICILE","DECES SUSPECT","DECES A DOMICILE DU A UNE MALADIE CONTAGIEUSE"],
      month_array : [
            "janoary",
            "febroary",
            "martsa",
            "aprily",
            "may",
            "jona",
            "jolay",
            "aogositra",
            "septambra",
            "oktobra",
            "novambra",
            "desambra"
          ],
          centaine : [
          'zato',
          'roan-jato',
          'telon-jato',
          'efa-jato',
          'diman-jato',
          'enin-jato',
          'fiton-jato',
          'valon-jato',
          'sivan-jato'
        ],
        dizaine : [
          'folo',
          'roapolo',
          'telopolo',
          'efapolo',
          'dimapolo',
          'enipolo',
          'fitopolo',
          'valopolo',
          'sivifolo',
        ],
        unite : [
        'iray',
        'roa',
        'telo',
        'efatra',
        'dimy',
        'enina',
        'fito',
        'valo',
        'sivy'
      ],
    options: {
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Nombre d\'enfant naitre',
        data: []
      }],

      headers: [
        { text: 'Numero ordre', value: 'num_ordre' },
        { text: 'Nom enfant', value: 'nom_enfant'},
        { text: 'Date deces', value: 'date_defunt'},
        { text: 'Causes', value: 'causes'},
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
      deces: {
        handler() { }
      },
        dialog (val) {
          val || this.close()
        },

      },

    computed: {
      ...mapState('login', {
      token: 'accessToken',
      userType: 'userType'
    }),
      formTitle () {
        return this.editedIndex === -1 ? 'Ajout' : 'Modifier'
      },
      btnStatus(){
        return this.selected.length > 0 ? false : true
      },
      getItem () {
        if(this.btnStatus == false){
          let val;
          val = this.selected
          return val[0];
        }else{
          return true;
        }
        
        },
        getDateNow(){
          var date = new Date()
          var year = date.getFullYear()
          var day = date.getDate()+1
          var month = date.getMonth()
          var toDay = day+"/"+month+"/"+year
          return this.changeDateToLettre(toDay);
        },
        getDateNowNotConvert(){
          var date = new Date()
          var year = date.getFullYear()
          var day = date.getDate()+1
          var month = date.getMonth()
          var toDay = day+"/"+month+"/"+year
          return toDay;
        },
        convertDateDefunt(){
          var val = this.getItem.date_defunt
          val = val.split('-')
          val = val[0]
          return val;
        },
       
    },
   asyncComputed: {
      // num_ordreItems(){
      //     return apiNaissance.getNumOrdreNaissanceData(this.token)
      // },
      // num_ordre_declaarant_Items(){
      //   return apiNaissance.getNumOrdreNaissanceData(this.token)
      // },
      async dataByNum_ordre_by_Naissance_defunt(){
        var val = this.editedItem.num_ordre
        
        if(val){
          val = await apiNaissance.getDataByNum_ordre(this.token, val)
          this.editedItem.nom_enfant = val[0].nom_enfant +" "+val[0].prenoms_enfant
          this.editedItem.lieu_naissance = val[0].lieu_naissance_enfant
          this.editedItem.sexe_defunt = val[0].sexe_enfant
          this.editedItem.nom_pere_defunt = val[0].nom_pere_enfant
          this.editedItem.nom_mere_defunt = val[0].nom_mere_enfant
          this.editedItem.date_naissance_defunt = this. convertDateDeces(val[0].date_naissance_enfant)
          return ;
        }
    },
    async dataByNum_ordre_by_naissance_declarant(){
      var val2 = this.editedItem.num_ordre_declarant
      if(val2){
          val2 = await apiNaissance.getDataByNum_ordre(this.token, val2)
          this.editedItem.nom_declarant_enfant = val2[0].nom_enfant
          this.editedItem.date_naissance_declarant = this. convertDateDeces(val2[0].date_naissance_enfant)
          this.editedItem.lieu_naissance_declarant = val2[0].lieu
          // this.editedItem.lieu_naissance = val2[0].lieu_naissance_enfant
          return  ;
        }
    }
    },
    created () {
      this.initialize(),
      this.keyUpDefunt(),
      this.keyUpDeclarantDefunt()
    },

    methods: {
      customFilter (item, queryText) {
        const textOne = item.text.toLowerCase()
        // const textTwo = item.nom_enfant.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 
        // return  textTwo.indexOf(searchText) > -1
      },
      customFilterDeclarant (item, queryText) {
        const textOne = item.text.toLowerCase()
        // const textTwo = item.nom_enfant.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 
        // return  textTwo.indexOf(searchText) > -1
      },
       keyUpDefunt(){
          apiNaissance.getNumOrdreNaissanceDefuntData(this.token)
            .then((results) =>{
              // var data = JSON.stringify(results)
              // alert(data)
              this.num_ordreItems = results
            })
      },
      keyUpDeclarantDefunt(){
        apiNaissance.getNumOrdreNaissanceData(this.token)
          .then((results)=>{
            this.num_ordre_declaarant_Items = results
          })
      },
       convertDateDeces($date){
          var tab = $date.split('-')
          tab[2]= tab[2].split("T")
          tab[2]=tab[2][0]
          var formattedDate = tab[2]+'/'+tab[1]+'/'+tab[0]
          return formattedDate
      },
       downloadPDF () { 
            html2pdf(this.$refs.document, {
              margin: 1,
              filename: 'document.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { dpi: 192, letterRendering: true },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
            })
        },
      select(selectedItem) {
        this.selected = [];
        this.deces.forEach(item => {
          if (item.num_ordre == selectedItem.num_ordre) {
            item.date_defunt_to_gasy = this.changeDateToLettre(item.date_defunt_to_gasy)
            item.date_naissance_defunt_to_gasy = this.changeDateToLettre(item.date_naissance_defunt_to_gasy)
            item.getDateNow=this.changeDateToLettre(this.getDateNow)
            item.date_naissance_declarant = this.changeDateToLettre(item.date_naissance_declarant)
            return this.selected.push(item);
          }
          else return false;
        });
      },
      editItem (item) {
        this.editedIndex = this.deces.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.date_naissance_declarant = this.conver
        this.dialog = true
      },

      async deleteItem (item) {
        const res = await this.$confirm('Êtes-vous certain de vouloir supprimer cette enfant <br>Numero ordre: <strong>'+item.num_ordre+'</strong>', { title: 'Alert' })
        if(res){
         apiDeces.deleteDeces(this.token,item.num_ordre)
          .then(() => {
            this.initialize(),
            this.keyUpDefunt(),
            this.keyUpDeclarantDefunt()
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
          apiDeces.updateDeces(this.token, this.editedItem, this.deces[this.editedIndex].num_ordre).then((response) => {
            this.snackbar.messageSnackbar = response
            this.snackbar.show = true
            this.initialize()
            this.keyUpDefunt(),
            this.keyUpDeclarantDefunt()
            this.close()
          }).catch(error => alert(error))
        } else {
          apiDeces.addDeces(this.token, this.editedItem).then((response) => {
            this.snackbar.messageSnackbar = response
            this.snackbar.show = true
            this.initialize()
            this.keyUpDefunt(),
            this.keyUpDeclarantDefunt()
            this.close()
          }).catch(error => alert(error))
        }

      }
      },
    customSearch(value) {
      this.search = value
      this.initialize()
    },


  closeDialogDiagramme(){
      this.dialogDiagramme = false
      // this.getDataLigne()
      this.getDataForDiagramme()
      this.initialize()
    },

 async getDataForDiagramme(){
          await apiDeces.getOnlyTotalDeces(this.token)
            .then((results) => {
                    setTimeout(() =>{
                      this.series[0].data = results
                    })
                  });
          await apiDeces.getOnlyDate(this.token)
            .then((results) => {
                    setTimeout(() =>{
                      this.options.xaxis.categories = results
                    })
                  });
        },

       initialize () {
        apiDeces.getDeces(this.token)
          .then((results) => {
            setTimeout(()=>{
              this.loading = false
              this.deces = results
            },100)
          }),
          this.getDataForDiagramme()
      },

              
        /* date_to_letters ---------------::--------------------------------------------*/

        changeDateToLettreYear(date) {
          const year = parseInt(date);
            var val = this.changeNumberToLetter(year);
            val = val.split("sy ")
            val = val[1]
          return val
        },

        changeDateToLettre(date) {
          const split_date = date.split("/");
          const day = parseInt(split_date[0]);
          const month = parseInt(split_date[1]);
          const year = parseInt(split_date[2]);

          return this.changeNumberToLetter(day) + " " + this.month_array[month - 1] + " " + this.changeNumberToLetter(year);
        },

        changeNumberToLetter(number) {
          let lettre = "";

          if (number === 0) {
            lettre  = "aotra";
          } else {
            const dizaine_number = parseInt(number % 100);
            const centaine_number = parseInt((number / 100) % 10);
            const milliaime_number = parseInt(number / 1000);

            if (dizaine_number > 0) {
              lettre += this.changeDizaineToLetter(dizaine_number);
            }

            if (centaine_number > 0) {
              lettre += " sy " + this.centaine[centaine_number - 1];
            }

            if (milliaime_number > 0) {
              if (milliaime_number === 1) {
                lettre += " sy arivo";
              } else {
                lettre += " sy " + this.unite[milliaime_number - 1] + " arivo";
              }
            }
          }

          return lettre;
        },

        changeDizaineToLetter(number) {
          number = parseInt(number);
          if (number < 10) {
            return this.unite[number - 1];
          } else {
            const unite_number = parseInt(number % 10);
            const dizaine_number = parseInt(number / 10);
            if (unite_number > 0) {
              return this.unite[unite_number - 1] + " ambiny " + this.dizaine[dizaine_number - 1];
            } else {
              return this.dizaine[dizaine_number - 1];
            }
          }
        }
        /*-----------------------------------------::---------------------------------------------------*/

    },
  }
</script>
<style scope>
	.pdf {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
