<template>
  <div>
    <p class="name">{{ userData.name }}さんようこそ</p>
    <p class="Wallet">残高:{{ userData.wallet }}</p>

    <h1>ユーザー覧</h1>

    <table>
      <tr>
        <th>ユーザー名</th>
      </tr>
    </table>
  </div>
</template>

//
<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      userData: {},
    };
  },

  created: function() {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        this.userData = doc.data();
      });
  },
};
</script>

<style scoped>
p {
  display: inline-block;
  vertical-align: middle;
}
h1 {
  clear: left;
}
.name {
  margin-right: 150px;
}
.Wallet {
  margin-left: 100px;
}
</style>
