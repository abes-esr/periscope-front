<template>
   <v-app>
      <warning/>
      <v-content>
         <component-header></component-header>
         <component-stepper></component-stepper>
         <router-view style="padding-bottom: 220px" />
         <component-footer></component-footer>
      </v-content>
   </v-app>
</template>

<script lang="ts">
import ComponentHeader from '@/views/components/01-header/Header.vue';
import ComponentStepper from '@/views/components/02-stepper/Stepper.vue';
import ComponentFooter from '@/views/components/04-footer/Footer.vue';
import {Component, Vue} from 'vue-property-decorator';
import Warning from '@/views/components/global/warning.vue';

@Component({
   components: {
      Warning,
      ComponentHeader,
      ComponentStepper,
      ComponentFooter,
   },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './assets/styles/main.css';
</style>
