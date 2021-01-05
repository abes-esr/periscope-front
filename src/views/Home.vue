<template>
   <div>
      <p>vue par default de démarrage</p>
   </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';

//La vue n'utilise pas l'annotation @Component
export default class Home extends Vue {}
</script>
