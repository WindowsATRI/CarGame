<template>

</template>
<script setup>
import {nextTick, onMounted, ref} from "vue";
// Get class references
import {diffuseGroup, normalGroup, lightGroup, PointLight} from '@pixi/lights';
import {Application, Sprite, Container} from 'pixi.js';
import {Layer, Stage} from '@pixi/layers';


// Create new application
const app = new Application({
  backgroundColor: 0x000000, // Black is required!
  width: 1024,
  height: 512
});
document.body.appendChild(app.view);

// Use the pixi-layers Stage instead of default Container
app.stage = new Stage();

// Add the background diffuse color
const diffuse = Sprite.from(new URL(`images/BGTextureTest.jpg`, import.meta.url).href);
diffuse.parentGroup = diffuseGroup;
// Add the background normal map
const normals = Sprite.from(new URL(`images/BGTextureNORM.jpg`, import.meta.url).href);
normals.parentGroup = normalGroup;

// Create the point light
const light = new PointLight(0xffffff, 3);
// light.x = app.screen.width / 2;
// light.y = app.screen.height / 2;
light.x = 100;
light.y =100;
// Create a background container
const background = new Container();
background.addChild(
    normals,
    diffuse,
    light
);

app.stage.addChild(
    // put all layers for deferred rendering of normals
    new Layer(diffuseGroup),
    new Layer(normalGroup),
    new Layer(lightGroup),
    // Add the lights and images
    background
);


</script>
<style>
body {
  margin:0;
  padding:0;
  background:black;
}
canvas {
  display: block;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>