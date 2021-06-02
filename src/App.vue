<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <router-view />
    <p class="copy">Copyrght©️2019〇〇inc.All rights reserved</p>
  </div>
</template>

<style>
#app {
  text-align: center;
}
img {
  width: 100px;
  height: 100px;
}
.copy {
  color: #99a2b0;
  font-size: 10px;
  margin: 10px auto;
}
</style>
