<template>
<v-container fluid>

    <v-row
        class="mb-6"
        no-gutters
    >
        <v-col cols="6" md="6">
            <div class="text-center"><h1 style="text-transform: uppercase;">Naissance</h1></div>
            <v-simple-table>
                <template v-slot: default>
                    <thead>
                        <tr>
                            <th>Année</th>
                            <th class="text-left">Sexe</th>
                            <th class="text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="select(item)" :active="selected" :class="{'green lighten-4': item === selected[0]}" v-for="item in dataNaissance" :key="item.annee_naissance">
                            <td>{{item.annee_naissance}}</td>
                            <td>{{item.sexe_enfant}}</td>
                            <td><strong>{{item.total}}</strong></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        
        <v-col cols="12" md="6">
            <div class="text-center"><h1 style="text-transform: uppercase;">Deces</h1></div>
            <v-simple-table>
                <template v-slot: default>
                    <thead>
                        <tr>
                            <th class="text-left">Année</th>
                            <th class="text-left">Sexe</th>
                            <th class="text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in dataDeces" :key="item.anneeDeces">
                            <td>{{item.annee}}</td>
                            <td>{{item.sexe_defunt}}</td>
                            <td><strong>{{item.total}}</strong></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>  
    </v-row>

    <v-row
        class="mb-6"
        no-gutters
    >
        <v-col cols="6" md="4">
            <v-text-field
            readonly
            v-model="totalRegistrer"
            label="Total données dans la base"
            >
            </v-text-field>
        </v-col>
        
        <v-col cols="12" md="4">
            <v-text-field
            readonly
            v-model="totalNaissance"
            label="Total Naissances enregistrées"
            >
            </v-text-field>
        </v-col>  
        <v-col cols="12" md="4">
            <v-text-field
                readonly
                v-model="totalDeces"
                label="Total Dèces enregistrées"
            >
            </v-text-field>
        </v-col>
    </v-row>

  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import apiStat from '../api/Stat'
  export default {
    data: () => ({
        // masculinVivant: 0,
        totalRegistrer: 0,
        totalNaissance: 0,
        totalDeces: 0,
        selected: {},
        dataNaissance: [],
        dataDeces: [],
        masculinVivant: {},
    }),
    computed: {
        ...mapState('login', {
        token: 'accessToken',
        userType: 'userType'
    }),
    },
    asyncComputed: {
    },
    created () {
      this.initialize()
    },
    methods: {
        async AllCalcul(){
            await apiStat.get_total_in_base(this.token)
                .then((result)=>{
                    this.totalRegistrer = result
                });
            await apiStat.get_total_in_base_vivant(this.token)
                .then((result)=>{
                    this.totalNaissance = result
                });
            await apiStat.get_total_in_base_mort(this.token)
                .then((result)=>{
                    this.totalDeces = result
                })
        },
   
    //     select(selectedItem) {
    //     this.selected = [];
    //     this.dataNaissance.forEach(item => {
    //       if (item.annee_naissance == selectedItem.annee_naissance) {
    //         return this.selected.push(item);
    //       }
    //       else return false;
    //     });
    //   },
      selectDeces(selectedItem) {
        this.selected = [];
        this.dataDeces.forEach(item => {
          if (item.anneeDeces == selectedItem.anneeDeces) {
            return this.selected.push(item);
          }
          else return false;
        });
      },

      initialize(){
       
        apiStat.getAnneeTotalNaissance(this.token)
        .then((results) => {
                setTimeout(()=>{
                this.dataNaissance = results
                },100)
            }); 
        this.AllCalcul()

        apiStat.getDecesTotalNaissance(this.token)
            .then((results) =>{
                setTimeout(()=>{
                    this.dataDeces = results
                })
            })
            
        }
    }
  }
</script>