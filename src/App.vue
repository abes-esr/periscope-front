<template>
   <v-app>
      <router-view />
   </v-app>
</template>

<!--Mettre un suffixe app aux propriétés css spécifiques à l'application-->
<style lang="scss">
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}
.outlined-app {
   border: 1px solid #9e9e9e;
   border-radius: 0.3em;
}
.margin-v-checkbox-accueil {
   margin: -1em 0 -1em 0;
}
.margin-v-col-accueil {
   margin: -1.5em 0 0.5em 0;
}
.style1 {
   background-color: white;
   max-height: 2.5em;
}
.style2 {
   background-color: white;
   max-height: 3.5em;
}

.tabResultatSmallWidth {
   width: 20vw;
}

.tabResultatFullWidth {
   width: 100vw;
}
</style>
