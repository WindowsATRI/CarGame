<template>

</template>
<script setup>
import {nextTick, onMounted, ref} from "vue";
// Get class references
import {diffuseGroup, normalGroup, lightGroup, PointLight, AmbientLight, DirectionalLight} from '@pixi/lights';
import {Application, Sprite, Container, Assets} from 'pixi.js';
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
const stage = app.stage
const Light = new PointLight(0xffffff, 1);
// put all layers for deferred rendering of normals
stage.addChild(new Layer(diffuseGroup));
stage.addChild(new Layer(normalGroup));
stage.addChild(new Layer(lightGroup));

Assets.addBundle('textures', {
  bg_diffuse: '/images/BGTextureTest.jpg',
  bg_normal: '/images/BGTextureNORM.jpg',
  block_diffuse: '/images/block.png',
  block_normal: '/images/blockNormalMap.png',
});
function createPair(diffuseTex, normalTex) {
  const container = new Container();
  const diffuseSprite = new Sprite(diffuseTex);
  diffuseSprite.parentGroup = diffuseGroup;
  const normalSprite = new Sprite(normalTex);
  normalSprite.parentGroup = normalGroup;
  container.addChild(diffuseSprite);
  container.addChild(normalSprite);
  return container;
}
Assets.loadBundle('textures').then((res) => {
  const bg = createPair(res.bg_diffuse, res.bg_normal);
  const block = createPair(res.block_diffuse, res.block_normal);
  const block1 = createPair(res.block_diffuse, res.block_normal);
  const block2 = createPair(res.block_diffuse, res.block_normal);
  block.position.set(100, 100);
  block1.position.set(500, 100);
  block2.position.set(300, 400);

  Light.position.set(525, 160);
  stage.addChild(bg);
  stage.addChild(block);
  stage.addChild(block1);
  stage.addChild(block2);

  stage.addChild(new AmbientLight(0x4d4d59, 0.4));
  stage.addChild(new DirectionalLight(0x4d4d59, 1, block1));
  stage.addChild(Light);
  bg.interactive = true;
  bg.on('pointermove', function (event) {
    Light.position.copyFrom(event.data.global);
  });
  bg.on('pointerdown', function (event) {
    const clickLight = new PointLight(0xffffff);
    clickLight.position.copyFrom(event.data.global);
    stage.addChild(clickLight);
  });
});

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