<template>
  <v-container>
    <p>{{changeTimeToLettre("11:05")}}</p>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
  }),
  methods: {
    changetime(time){
      var a = time-12;
      return a;
    },

      
changeTimeToLettre(time) {
  const split_time = time.split(":");
  const heure = parseInt(split_time[0]);
  const minute = parseInt(split_time[1]);
  
  return this.changeNumberToLetter(heure) + " ora atoandro " + this.changeNumberToLetter(minute) + " minitra";
 
    

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
  }
}
</script>