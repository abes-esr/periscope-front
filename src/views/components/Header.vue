<template>
   <v-container class="ma-0 pa-0" style="margin-bottom: 1em">
      <v-row style="max-height: 6em" :align="getVerticalAlignValue(1)" :justify="getHorizontalJustifyValue(1)" no-gutters :style="getHeightsCssValue(0)">
         <v-col xs="12" sm="6">
            <img src="@/assets/periscope.png" :style="autoResizeImage" />
         </v-col>
      </v-row>
      <component-alerte></component-alerte>
   </v-container>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import GlobalPropertiesMixin from '@/mixins/globalProperties';
import ComponentAlerte from '@/views/components/Alerte.vue';

@Component({
   components: {
      ComponentAlerte,
   },
})
export default class Header extends Mixins(GlobalPropertiesMixin) {}
</script>
