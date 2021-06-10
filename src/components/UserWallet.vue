<template>
  <div id="overlay">
    <div id="content">
      <p>
        {{ user.name }}さんの残高<br /><br />
        {{ user.wallet }}
      </p>
      <div>
        <button @click="closeWallet">close</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['user'],
  
  methods: {
    closeWallet() {
      this.$emit('close-click')
    },
  },
};
</script>
<style scoped>
#overlay {
  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 25%;
  padding: 1em;
  background: #fff;
}
</style>
