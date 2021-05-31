<template>
   <div>
      <p>test</p>
   </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Visualisation extends Vue {
   constructor() {
      super();
      this.$store.dispatch('testHolding');
   }
};
</script>
