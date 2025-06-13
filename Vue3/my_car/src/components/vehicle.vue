<template>

</template>
<script setup>
import * as PIXI from 'pixi.js';
const props = defineProps({
  App: Object
})
const app =props.App
const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);



</script>
<style scoped>

</style>