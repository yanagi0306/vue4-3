<template>
  <div id="overlay">
    <div id="content">
      <p>
        あなたの残高:{{ myData.wallet }}<br />
        送る金額
      </p>
      <input type="text" v-model.number="wallet" />
      <div>
        <button @click="sendWallet()">送信</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['myData'],
  methods: {
    sendWallet() {
      this.$emit('wallet-click', this.wallet);
      this.$emit('send-click');
      this.wallet = '';
    },
  },
  data() {
    return {
      wallet: '',
    };
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
