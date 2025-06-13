<template>
  <div>
    <div ref="pixiContainer" style="width: 400px; height: 400px;"></div>
    <PixiCar v-if="app" :App="app" />
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import * as PIXI from 'pixi.js';
import PixiCar from '../components/vehicle.vue'
const pixiContainer = ref(null)
const app = ref(null)
onMounted(() => {
  const width = pixiContainer.value.clientWidth
  const height = pixiContainer.value.clientHeight
  app.value = new PIXI.Application({
    background: '#1099bb',
    width: width,
    height: height
  });
  pixiContainer.value.appendChild(app.value.view);
})
</script>
<style scoped>

</style>