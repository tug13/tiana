
<template>
<v-container fluid>
  
  <v-layout class="mb-3">
        <span class="display-1" toLowerCase>Naissance</span>
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
    :items="naissance"
    sort-by="num_ordre"
    class="elevation-1"
    :search="search"
  >
  
    <template v-slot:top>
      <v-toolbar flat color="white">


          <v-dialog v-model="dialogDetailNaissance" scrollable max-width="1000px" persistent>
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
                        <span class="headline">Generer un acte de naissance : <strong style="text-transform: uppercase">{{getItem.nom_enfant}} </strong>{{ getItem.prenoms_enfant }}</span>
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
                        <v-card-text class="pdf" ref="document">


                            <br/>
                            <v-row
                              class="mb-6"
                              no-gutters
                            >
                              <v-col cols="6" md="8">
                                <table outlined tile>
                                    <div ><strong style="text-transform: uppercase">REPOBLIKAN'I MADAGASCAR</strong></div>
                                    <div ><strong>Tanindrazana - Fahafahana - Fandrosoana</strong></div>
                                    <br/><br/>
                                    <div><strong><hr align="right" size="4" color="black"/></strong></div>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase;">FIANARANTSOA</strong></div>
                                    <div><strong><hr align="right" size="4" color="black"/></strong></div><br/>
                                    <div style="text-align: center;"><strong>Commune Urbaine de</strong></div>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase;">Fianarantsoa</strong></div>
                                </table>
                             </v-col>
                            
                             <v-col cols="12" md="4">
                               
                                <table width="100%" border="2" cellspacing="1" cellpadding="1" class="pa-2" outlined tile>
                                  <div style="text-align: center;">Teny midina laharana faha - 788-MJ/CAB</div>
                                  <div style="text-align: center;">tamin'ny 29 desambra 1961 nataon'ny</div>
                                  <div style="text-align: center;">Ministry ny Fitsarana</div><br/>
                                  <div style="text-align: center;">sy Mpitahiry ny Kasem-panjakana</div>
                                </table>
                             </v-col>  
                            </v-row>
                           
                           
                            <v-row
                              class="mb-6"
                              no-gutters
                            >
                              <v-col>
                                <table outlined tile>
                                  <br/><br/><br/><br/>
                                    <div ><strong style="text-transform: uppercase">FAHA: </strong>{{ getItem.num_ordre }}</div>
                                    <div> Tamin'ny: <br/>{{ getDateNowNotConvert }}</div>
                                   <br/>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase;">Fahatarehana</strong></div><br/>
                                    <div style="text-align: center;"><strong style="text-transform: uppercase">{{ getItem.nom_enfant }}</strong> {{ getItem.prenoms_enfant }}</div><br/>
                                    <div style="text-align: center; text-transform: uppercase;">Teraka: {{ getItem.date_naissance_enfant}}</div><br/>
                                    <div style="text-align: center;"><strong>Soratra an-tsisiny</strong></div>
                                </table>
                             </v-col>
                             <v-col cols="2" md="9">
                                <table width="100%" outlined tile>
                                  <div><h1>KOPIAN'NY SORA-PIANKOHONANA</h1></div>
                                  <br/>
                                  <div><p align="justify">Nalaina tamin'ny bokim-piankohonana, taona sivy amby folo sy roa arivo, voatahiry ato amin'ny Commune Urbaine de Fianarantsoa 
                                          izao soratra izao:    
                                      </p></div>
                                  <div><p align="justify">Tamin'ny taona {{getItem.date_naissance_enfant_to_letter}}, tamin'ny {{ getItem.heure_naissance_to_gasy}}, no teraka tao {{ getItem.lieu_naissance_enfant}} {{ getItem.lieu}} i {{ getItem.nom_enfant}}, {{ getItem.sexe_enfant_to_gasy}}, 
                                    zanak'i {{ getItem.nom_pere_enfant}} {{ getItem.prenoms_pere_enfant}}, {{ getItem.profession_pere_enfant}}, teraka tamin'ny {{getItem.date_naissance_pere_to_gasy}}  
                                    tao {{ getItem.lieu_naissance_pere }} sy {{ getItem.nom_mere_enfant}} {{getItem.prenoms_mere_enfant}}, vadiny, {{getItem.profession_mere_enfant}}
                                    , teraka tamin'ny {{ getItem.date_naissance_mere_to_gasy}} tao {{getItem.lieu_naissance_mere}}, samy monina ao {{getItem.adresse_parent_enfant}}.
                                    </p></div>
                                    <div>
                                      <p align="justify">
                                        Nosoratana androany {{ getDateNow }} tamin'ny {{ getHour }} , araka ny fanambarana nataon'i {{getItem.nom_declarant_naissance}} , {{getItem.profession_declarant_naissance}}
                                        teraka tamin'ny taona {{ getItem.date_declaration_naissance_to_gasy }} tao {{getItem.lieu_naissance_declarant_naissance}}
                                        monina ao {{ getItem.adresse_declarant_naissance }} ka miara manao sonia aminay, ANDRIAMANJATOHASA Jean Honoré, 
                                        Ben'ny Tanàna Lefitra Voalohany , mpiandraikitra ny sora-piankohonana ao amin'ny Commune Urbaine de 
                                        Fianarantsoa rehefa novakiana taminy ity soratra ity
                                      </p>
                                    </div>
                                    <br/>
                                    <div style="text-align: center;">
                                      <p>
                                        MANARAKA NY SONIA
                                      </p>
                                    </div>
                                  <div style="font-size: bold; text-align: center;"><strong>Kopia manontolo nadika tamin'ny boky androany {{getDateNow}}</strong></div>
                                  <div style="text-align: center;"><p style="text-transform: uppercase;">NY MPIANDRAIKITRA NY SORA-PIANKOHONANA</p></div><br/>
                                </table>
                             </v-col>  
                            </v-row>



                            
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn color="blue darken-1" text @click="dialogDetailNaissance = false">Fermer</v-btn>
                        </v-card-actions>
                  </v-card>
                </v-dialog>







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
        <v-dialog v-model="dialog" scrollable max-width="1600px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn 
            @click="addItem"
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
            


            <v-card-text>
              <v-form ref="formNaissance" v-model="valid" lazy-validation >
                <v-container tag="formNaissance" grid-list-md>
                  <v-layout wrap>
                    <v-container>
              <v-subheader>
              <h1>Entête</h1>
              </v-subheader>
              <v-row>
                    <v-flex xs12 sm6 md4>
                      <v-text-field 
                      readonly
                      v-model="editedItem.num_ordre" 
                      label="N°Ordre">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        
                        xs12 sm6 md6
                        v-model="editedItem.annee_declaration"
                        :rules="[v => parseInt(v) || 'Num ordre du defunt obligatoire',
                        v => /^[0-9]{4}$/.test(v) || 'Annee doit être un numero à 4 valide']"
                        label="Année de déclaration"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-select
                        v-model="editedItem.lieu"
                        :items="lieu_declarantion"
                        label="Lieu de déclaration"
                        required
                      ></v-select>
                    </v-flex>
                      
                  </v-row>
              </v-container>
              <v-container>
                <v-subheader> 
                  <h1>L'enfant</h1>
                </v-subheader>
                <v-row>
                 <v-flex xs12 sm6 md3>
                      <v-menu
                      v-model="menudec"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          xs12 sm6 md6
                          v-model="editedItem.date_declaration_naissance"
                          
                          label="Date de déclaration"
                          prepend-icon="event"
                          
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                      v-model="editedItem.date_declaration_naissance" @input="menudec = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-menu
                        ref="menudec"
                        v-model="menuheure"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="heure_declaration"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.heure_declaration"
                            :rules="heureRules"
                            label="Heure déclaration"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menuheure"
                          v-model="editedItem.heure_declaration"
                          full-width
                          @click:minute="$refs.menudec.save(heure_declaration)"
                        ></v-time-picker>
                      </v-menu>

                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-select
                        :items="type_declaration_N"
                        v-model="editedItem.type_declaration_naissance"
                        :rules="typeRules"
                        label="Type de déclaration"
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 sm6 md2>
                      <v-menu
                      v-model="menunais"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          xs12 sm6 md6
                          v-model="editedItem.date_naissance_enfant"
                          label="Date de naissance"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.date_naissance_enfant" @input="menunais = false"></v-date-picker>
                    </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md3>
                      <v-menu
                      ref="menu"
                      v-model="menuheurenais"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="heure_naissance"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          xs12 sm6 md6
                          v-model="editedItem.heure_naissance"
                          :rules="heureRules"
                          label="Heure naissance"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menuheurenais"
                        v-model="editedItem.heure_naissance"
                        full-width
                        @click:minute="$refs.menu.save(heure_naissance)"
                      ></v-time-picker>
                    </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-select
                      :items="lieu_naissance_enfant"
                      v-model="editedItem.lieu_naissance_enfant"
                      :rules="lieuRules"
                      label="Lieu de naissance"
                    ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.nom_enfant" 
                      :rules="nameRules" 
                      label="Nom de l'enfant né(e)" 
                      required>        
                      </v-text-field> 
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.prenoms_enfant" 
                      :rules="nameRules" 
                      label="Prénoms" 
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                       <v-select
                        :items="sexe_enfant"
                        v-model="editedItem.sexe_enfant"
                        label="Sexe"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field 
                      xs12 sm6 md6
                      v-model="editedItem.adresse_parent_enfant" 
                      :rules="adresseRules" 
                      label="Adresse des parents" 
                      >
                      </v-text-field>
                    </v-flex>
                </v-row>
              </v-container>
            <v-container>
                <v-subheader> 
                  <h1>Le père</h1>
                </v-subheader>
                <v-row>
                    <v-flex xs12 sm6 md3>
                      <v-autocomplete
                      :items="pereitems"
                      :filter="customFilter"
                      v-model="editedItem.nom_pere_enfant"
                      label="Nom du père"
                      item-text="text"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.prenoms_pere_enfant"
                      label="Prenom du père"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-menu
                      v-model="menupere"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          xs12 sm6 md6
                          v-model="editedItem.date_naissance_pere"
                          label="Date de naissance"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.date_naissance_pere" @input="menupere = false"></v-date-picker>
                    </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.profession_pere_enfant"
                      :rules="nameRules"
                      label="Profession"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.lieu_naissance_pere"
                      :rules="nameRules"
                      label="Lieu de naissance"
                    
                    ></v-text-field>
                    </v-flex>
                </v-row>
              </v-container> 
              <v-container>
                <v-subheader> 
                  <h1>La mère</h1>
                </v-subheader>
                <v-row>
                    <v-flex xs12 sm6 md3>
                      <v-autocomplete
                      :items="mereItems"
                      :filter="customFilter"
                      v-model="editedItem.nom_mere_enfant"
                      label="Nom de la mère"
                      item-text="text"
                      ></v-autocomplete>
                      <!-- <v-select
                      :items="mereItems"
                      xs12 sm6 md6
                      v-model="editedItem.nom_mere_enfant"
                      :rules="nameRules"
                      label="Nom de la mère"
                      required
                    ></v-select> -->
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.prenoms_mere_enfant"
                      label="Prenom de la mère"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-menu
                        v-model="menumere"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.date_naissance_mere"
                            label="Date de naissance mère"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date_naissance_mere" @input="menumere = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                      <v-text-field
                      xs12 sm6 md6
                      v-model="editedItem.profession_mere_enfant"
                      :rules="nameRules"
                      label="Profession mère"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                        xs12 sm6 md6
                        v-model="editedItem.lieu_naissance_mere"
                        :rules="nameRules"
                        label="Lieu de naissance mère"
                        required
                      ></v-text-field>
                    </v-flex>
                </v-row>
              </v-container>  
                   <v-container>
                <v-subheader> 
                  <h1>Le déclarant</h1>
                </v-subheader>
                <v-row>
                    <v-flex xs12 sm6 md2>
                      <v-select
                        readonly
                        :items="radios_declarant"
                        v-model="editedItem.radios_declarant"
                        label="choisir"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-autocomplete
                      :rules="[v => !!v || 'Nom déclarant obligatoire']"
                      :items="declarantItems"
                      :filter="customFilter"
                      v-model="editedItem.nom_declarant_naissance"
                      label="Nom et prénoms"
                      item-text="text"
                      ></v-autocomplete>
                      <!-- <v-select
                      xs12 sm6 md6
                      :items="declarantItems"
                      v-model="editedItem.nom_declarant_naissance"
                      :rules="nameRules"
                      label="Nom et prénoms"
                      required
                    ></v-select> -->
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-menu
                        v-model="menudeclarant"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.date_naissance_declarant_naissance"
                            label="Date de naissance"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.date_naissance_declarant_naissance" @input="menudeclarant = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                        v-model="editedItem.lieu_naissance_declarant_naissance"
                        :rules="nameRules"
                        label="Lieu de naissance"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                      v-model="editedItem.profession_declarant_naissance"
                      :rules="nameRules"
                      label="Profession"
                    ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      <v-text-field
                        v-model="editedItem.adresse_declarant_naissance"
                        :rules="nameRules"
                        label="adresse"
                      
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                      
                    </v-flex>
                </v-row>
              </v-container> 
                  </v-layout>
                </v-container>
               
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="save">Enregistrer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>



    <template v-slot:item="row">
          <tr @click="select(row.item)" :active="row.selected" :class="{'green lighten-4': row.item === selected[0]}">
            <td>{{row.item.num_ordre}}</td>
            <td><strong style="text-transform: uppercase">{{row.item.nom_enfant}}</strong> {{ row.item.prenoms_enfant }}</td>
            <td>{{row.item.date_naissance_enfant}}</td>
            <td>{{row.item.type_declaration_naissance}}</td>
            <td>{{row.item.sexe_enfant}}</td>
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
import apiNaissance from '../api/Naissance'
import { mapState } from 'vuex'
import apiDiagrammeNaissance from '../api/diagrammeEtatCivilNaissance'
import html2pdf from 'html2pdf.js'
  export default {
    data: () => ({
      pereitems: [],
      mereItems: [],
      declarantItems: [],
      dialogDiagramme: false,
      dialogDetailNaissance: false,
      selected: {},
      dialog: false,
      headers: [
        { text: 'Numero d\'ordre', value: 'num_ordre' },
        { text: 'Nom et prenom de la personne', value: 'nom_enfant' },
        { text: 'Année de naissance', value: 'date_naissance_enfant'},
        { text: 'Type de naissance', value: 'type_declaration_naissance'},
        { text: 'Sexe', value: 'sexe_enfant' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      naissance: [],
      editedIndex: -1,
      editedItem: {
           annee_declaration: '',
           lieu: '',
           num_ordre: '',
           date_declaration_naissance: '',
           heure_declaration: '',
           type_declaration_naissance: '',
           officier_naissance: '',
           date_naissance_enfant: '',
           heure_naissance: '',
           lieu_naissance_enfant: '',
           nom_enfant: '',
           prenoms_enfant: '',
           sexe_enfant: '',
           nom_pere_enfant: '',
           date_naissance_pere: '',
           profession_pere_enfant: '',
           lieu_naissance_pere: '',
           prenoms_pere_enfant: '',
           nom_mere_enfant: '',
           prenoms_mere_enfant: '',
           date_naissance_mere: '',
           profession_mere_enfant: '',
           lieu_naissance_mere: '',
           nom_declarant_naissance: '',
           date_naissance_declarant_naissance: '',
           lieu_naissance_declarant_naissance: '',
           profession_declarant_naissance: '',
           adresse_declarant_naissance: '',
           adresse_parent_enfant: '',
           radios_declarant: ''
      },
      defaultItem: {
        annee_declaration: '',
           lieu: '',
           num_ordre: '',
           date_declaration_naissance: '',
           heure_declaration: '',
           type_declaration_naissance: '',
           officier_naissance: '',
           date_naissance_enfant: '',
           heure_naissance: '',
           lieu_naissance_enfant: '',
           nom_enfant: '',
           prenoms_enfant: '',
           sexe_enfant: '',
           nom_pere_enfant: '',
           date_naissance_pere: '',
           profession_pere_enfant: '',
           lieu_naissance_pere: '',
           prenoms_pere_enfant: '',
           nom_mere_enfant: '',
           prenoms_mere_enfant: '',
           date_naissance_mere: '',
           profession_mere_enfant: '',
           lieu_naissance_mere: '',
           nom_declarant_naissance: '',
           date_naissance_declarant_naissance: '',
           lieu_naissance_declarant_naissance: '',
           profession_declarant_naissance: '',
           adresse_declarant_naissance: '',
           adresse_parent_enfant: '',
           radios_declarant:''
      },

      options: {
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Nombre d\'enfant née',
        data: []
      }],


        commune_naissance: ['CUFianarantsoa', 'CUAntananarivo', 'CUAntsiranana', 'CUMahajanga', 'CUToamasina','CUToliara'],
        province_naissance: ['Antananarivo', 'Fianarantsoa', 'Antsiranana', 'Mahajanga', 'Toamasina','Toliara'],
        district_naissance:['fianarantsoa1','Analamanga','vohibato','Anosy'],
        type_declaration_N:['Naissance','Reconnaissance','Naissance et reconnaissance','Jugement Supplétif'],
        lieu_naissance_enfant:['F.Sanitaire','Domicile','Autres','ND'],
        sexe_enfant:['Masculin','Féminin'],
        radios_declarant: ['pere','mere', 'autre'],
        lieu_declarantion: ["Fianarantsoa","Antananarivo", "Toamasina", "Mahajanga", "Antsiranana", "Toliara "],
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
       dizaineHeure : [
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
        uniteHeure : [
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
        valid: false,
        search: '',
      date:new Date().toISOString().substr(0,10),
      menudec:false,
      time:null,
      menuheure:false,
      datenais:new Date().toISOString().substr(0,10),
      menunais:false,
      timenais:null,
      menuheurenais:false,
      datepere:new Date().toISOString().substr(0,10),
      menupere:false,
      datemere:new Date().toISOString().substr(0,10),
      menumere:false,
      radios:'radios-1',
      nomdec:'',
      datedeclarant:new Date().toISOString().substr(0,10),
      menudeclarant:false,
    }),

    computed: {
      ...mapState('login', {
      token: 'accessToken',
      userType: 'userType'
    }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nouveau enregistrement' : 'Modifier un enregistrement'
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
        getHour(){
          var date = new Date()
          var hour = date.getHours()
          var min = date.getMinutes()
          var response = hour+":"+ min
         response = this.changeHeureToLettreHeure(response)
          return response;
        }
    },

    asyncComputed: {
      // pereitems(){
      //   return apiNaissance.getPereData(this.token)
      // },
      async dataPere(){
        var val = this.editedItem.nom_pere_enfant
        
        if(val){
          val = await apiNaissance.getDataPere(this.token, val)
          this.editedItem.prenoms_pere_enfant = val[0].prenoms_enfant
          this.editedItem.date_naissance_pere = this.convertDate(val[0].date_naissance_enfant)
          this.editedItem.lieu_naissance_pere = val[0].lieu_naissance_enfant
          // this.editedItem.sexe_defunt = val[0].sexe_enfant
          // this.editedItem.nom_pere_defunt = val[0].nom_pere_enfant
          // this.editedItem.nom_mere_defunt = val[0].nom_mere_enfant
          // this.editedItem.date_naissance_defunt = this. convertDateDeces(val[0].date_naissance_enfant)
          return ;
        }
    },
      // mereItems(){
      //   return apiNaissance.getMereData(this.token)
      // },
      async dataMere(){
        var val = this.editedItem.nom_mere_enfant
        
        if(val){
          val = await apiNaissance.getDataMere(this.token, val)
          this.editedItem.prenoms_mere_enfant = val[0].prenoms_enfant
          this.editedItem.date_naissance_mere = this.convertDate(val[0].date_naissance_enfant)
          this.editedItem.lieu_naissance_mere = val[0].lieu_naissance_enfant
          // this.editedItem.sexe_defunt = val[0].sexe_enfant
          // this.editedItem.nom_pere_defunt = val[0].nom_pere_enfant
          // this.editedItem.nom_mere_defunt = val[0].nom_mere_enfant
          // this.editedItem.date_naissance_defunt = this. convertDateDeces(val[0].date_naissance_enfant)
          return ;
        }
      },
      // declarantItems(){
      //   return apiNaissance.getDeclarantNaissanceData(this.token)
      // },
      async dataDeclarant(){
        var val = this.editedItem.nom_declarant_naissance
        
        if(val){
          val = await apiNaissance.getAllByNom_enfantDeclarant(this.token, val)
          this.editedItem.date_naissance_declarant_naissance =this.convertDate(val[0].date_naissance_enfant)

          this.editedItem.lieu_naissance_declarant_naissance = val[0].lieu_naissance_enfant
          this.editedItem.radios_declarant = val[0].radios_declarant
          // this.editedItem.lieu_naissance_mere = val[0].lieu_naissance_enfant
          // this.editedItem.sexe_defunt = val[0].sexe_enfant
          // this.editedItem.nom_pere_defunt = val[0].nom_pere_enfant
          // this.editedItem.nom_mere_defunt = val[0].nom_mere_enfant
          // this.editedItem.date_naissance_defunt = this. convertDateDeces(val[0].date_naissance_enfant)
          // date_naissance_declarant_naissance: '',
          //  lieu_naissance_declarant_naissance: '',
          //  profession_declarant_naissance: '',
          //  adresse_declarant_naissance: '',
          return ;
        }
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize(),
      this.pereitemsData(),
      this.mereItemsData(),
      this.declarantItemsData()
    },

    methods: {
      pereitemsData(){
        apiNaissance.getPereData(this.token)
          .then((results)=>{
            this.pereitems = results
          })
      },
       mereItemsData(){
        apiNaissance.getMereData(this.token)
          .then((results)=>{
            this.mereItems = results
          })
      },
      declarantItemsData(){
        apiNaissance.getDeclarantNaissanceData(this.token)
          .then((results)=>{
            this.declarantItems = results
          })
      },
      convertDate($date){
          var tab = $date.split('-')
          var year = tab[0]
         var month =  tab[1]
          var day = tab[2].split('T')[0]
          var formattedDate = day+'/'+month+'/'+year
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
        this.naissance.forEach(item => {
          if (item.num_ordre == selectedItem.num_ordre) {
            item.date_naissance_enfant_to_letter = this.changeDateToLettre(item.date_naissance_enfant_to_letter)
            item.date_naissance_pere_to_gasy = this.changeDateToLettre(item.date_naissance_pere_to_gasy)
            item.date_naissance_mere_to_gasy = this.changeDateToLettre(item.date_naissance_mere_to_gasy)
            item.date_declaration_naissance_to_gasy = this.changeDateToLettre(item.date_declaration_naissance_to_gasy)
            item.getDateNow=this.changeDateToLettre(this.getDateNow)
            item.heure_naissance_to_gasy = this.changeHeureToLettreHeure(item.heure_naissance_to_gasy)
            item.heure_declaration_to_gasy = this.changeHeureToLettreHeure(item.heure_declaration_to_gasy)
            if(item.sexe_enfant_to_gasy =='Masculin'){
              item.sexe_enfant_to_gasy = 'lehilahy'
            }
            else{
              item.sexe_enfant_to_gasy = 'Vehivavy'
            }
            return this.selected.push(item);
          }
          else return false;
        });
      },
     addItem () {
       apiNaissance.auto_increment(this.token).then(results => {
         this.editedItem.num_ordre = results
       }),
      this.pereitemsData(),
      this.mereItemsData(),
      this.declarantItemsData()
    },
      editItem (item) {
        this.editedIndex = this.naissance.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

     async deleteItem (item) {
        const res = await this.$confirm('Êtes-vous certain de vouloir supprimer cette enfant <br>Numero ordre: <strong>'+item.num_ordre+'</strong>', { title: 'Alert' })
        if(res){
         apiNaissance.deleteNaissance(this.token,item.num_ordre)
          .then(() => {
            this.initialize(),
            this.pereitemsData(),
            this.mereItemsData(),
            this.declarantItemsData()
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
        if (this.$refs.formNaissance.validate()) {
        if (this.editedIndex > -1) {
          apiNaissance.updateNaissance(this.token, this.editedItem, this.naissance[this.editedIndex].num_ordre).then(() => {
            this.initialize()
            this.close()
          }).catch(error => alert(error))
        } else {
          apiNaissance.addNaissance(this.token, this.editedItem).then(() => {
            this.initialize()
            this.close()
          }).catch(error => alert(error))
        }

      }
      },

      closeDialogDiagramme(){
      this.dialogDiagramme = false
      // this.getDataLigne()
      this.getDataForDiagramme()
      this.initialize()
    },
    async getDataForDiagramme(){
          await apiDiagrammeNaissance.getCountNaissance(this.token)
            .then((results) => {
                    setTimeout(() =>{
                      this.series[0].data = results
                    })
                  });
          await apiDiagrammeNaissance.getAllOnlyDate(this.token)
            .then((results) => {
                    setTimeout(() =>{
                      this.options.xaxis.categories = results
                    })
                  });
        },
      initialize () {
        apiNaissance.getNaissance(this.token)
          .then((results) => {
            setTimeout(()=>{
              // this.loading = false
              this.naissance = results
            },100)
            
          }),
          this.getDataForDiagramme()
      },


/* date_to_letters ---------------::--------------------------------------------*/


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
},
/*-----------------------------------------::---------------------------------------------------*/
  changeHeureToLettreHeure(time) {
  const split_time = time.split(":");
  const heure = parseInt(split_time[0]);
  const minute = parseInt(split_time[1]);
  var nb; 
  let lettr="";
  
  if (13<=heure && heure <18 && minute!=0) {
    nb = this.reduceheure(heure);
    lettr = this.changeNumberToLetterHeure(nb) + " ora tolakandro sy " + this.changeNumberToLetterHeure(minute) + " minitra";  
  }else if(18<=heure && heure<20 && minute!=0){
    nb = this.reduceheure(heure);
    lettr = this.changeNumberToLetterHeure(nb) + " ora hariva sy " + this.changeNumberToLetterHeure(minute) + " minitra"; 
  }else if(20<=heure && heure<24 && minute!=0){
    nb = this.reduceheure(heure);
    lettr = this.changeNumberToLetterHeure(nb) + " ora alina sy " + this.changeNumberToLetterHeure(minute) + " minitra"; 
  }else if(0<=heure && heure<1 && minute!=0){
    lettr = "roa ambiny folo ora alina sy " + this.changeNumberToLetterHeure(minute) + " minitra";
  }else if(1<=heure && heure<11 && minute!=0){
    lettr = this.changeNumberToLetterHeure(heure) + " ora maraina sy " + this.changeNumberToLetterHeure(minute) + " minitra";
  }else if(11<=heure && heure<13 && minute!=0){
    lettr = this.changeNumberToLetterHeure(heure) + " ora atoandro sy " + this.changeNumberToLetterHeure(minute) + " minitra";
  }else if(18<=heure && heure<20 && minute==0){
    nb = this.reduceheure(heure);
    lettr = this.changeNumberToLetterHeure(nb) + " ora hariva ";
  }else if(20<=heure && heure<24 && minute==0){
    nb = this.reduceheure(heure);
    lettr = this.changeNumberToLetterHeure(nb) + " ora alina ";
  }else if(0<=heure && heure<1 && minute==0){
    lettr = "roa ambiny folo ora alina ";
  }else if(1<=heure && heure<11 && minute==0){
    lettr = this.changeNumberToLetterHeure(heure) + " ora maraina ";
  }else if(11<=heure && heure<13 && minute==0){
    lettr = this.changeNumberToLetterHeure(heure) + " ora atoandro ";
  }else{
    nb = this.reduceheure(heure); 
    lettr = this.changeNumberToLetterHeure(nb) + " ora tolakandro ";
  }
  return lettr;
  
},

changeNumberToLetterHeure(number) {
  let lettre = "";

  if (number === 0) {
    lettre  = "aotra";
  } else {
    const dizaine_number = parseInt(number % 100);
    const centaine_number = parseInt((number / 100) % 10);
    const milliaime_number = parseInt(number / 1000);

    if (dizaine_number > 0) {
      lettre += this.changeDizaineToLetterHeure(dizaine_number);
    }

    if (centaine_number > 0) {
      lettre += " sy " + this.centaine[centaine_number - 1];
    }

    if (milliaime_number > 0) {
      if (milliaime_number === 1) {
        lettre += " sy arivo";
      } else {
        lettre += " sy " + this.uniteHeure[milliaime_number - 1] + " arivo";
      }
    }
  }

  return lettre;
},

changeDizaineToLetterHeure(number) {
  number = parseInt(number);
  if (number < 10) {
    return this.uniteHeure[number - 1];
  } else {
    const unite_number = parseInt(number % 10);
    const dizaine_number = parseInt(number / 10);
    if (unite_number > 0) {
      return this.uniteHeure[unite_number - 1] + " ambiny " + this.dizaineHeure[dizaine_number - 1];
    } else {
      return this.dizaineHeure[dizaine_number - 1];
    }
  }
},
 reduceheure(number){
       var nb;
       nb = number-12;
      return nb;
     },
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
		margin-top: 1px;
	}
</style>