<template>
<v-container>
  
   <v-card
    max-width="500"
    class="mx-auto"
  >
  <v-img width="900px" src="../assets/logo.png"></v-img>
  <v-snackbar
      v-model="snackbar"
      bottom right vertical
      >
      {{ loginError }}
      <v-btn
        color="red"
        flat
        @click="snackbar = false"
        >
        Fermer
      </v-btn>
    </v-snackbar>
  <v-card-title>Login</v-card-title>
 <v-container>
      <v-row dense>
        <v-col cols="12">
         
            <v-form
            ref="form"
            v-model="valid"
            >
            <v-text-field
                v-model="username"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>
                <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="password"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>

      <v-card-actions>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="submit"
            >
                Log In
            </v-btn>

            <v-btn
                color="error"
                class="mr-4"
                @click="reset"
            >
                Reset
            </v-btn>
      </v-card-actions>
            </v-form>
        </v-col>
      </v-row>
 </v-container>
   </v-card>
  
</v-container>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
  export default {
    data: () => ({
      username: '',
      valid: '',
      snackbar: false,
      password: 'Password',
      error: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
       show1: false,
        show2: true,
        show3: false,
        show4: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 6) || 'Min 6 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }),
  computed: {
      ...mapState('login', [
        'loginError',
        'logginIn',
        'user',
        'userType'
      ])
    },
    // methods: {
    //   reset () {
    //     this.$refs.form.reset()
    //   },
      
    // }*/,
    methods: {
      ...mapActions('login', [
      'doLogin'
    ]),
    ...mapMutations([
      'setUser'
    ]),
    submit () {
     var result = this.$refs.form.validate();
     if(result){
       this.loginSubmit();
     }
    },
    reset () {
      this.username = ''
      this.password = ''
      this.$refs.form.reset()
    },
    loginSubmit() {
      this.doLogin({
        login: this.username,
        password: this.password
        // type: 'admin'
      }).catch(() => {
        if (this.loginError) {
          this.snackbar = true
        }
      })
      
    }
      
    }
  }
</script>