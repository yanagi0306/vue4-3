<template>
  <div id="users">
    <p class="name">{{ userData.name }}さんようこそ</p>
    <p class="Wallet">残高:{{ userData.wallet }}</p>
    <button @click="logout()">ログアウト</button>
    <h1>ユーザー覧</h1>

    <table>
      <tr>
        <th>ユーザー名</th>
      </tr>
      <tr v-for="user in usersData" :key="user.id">
        <td>{{ user.name }}</td>
        <td><button @click="openWallet(user)">walletを見る</button></td>
        <td><button>送る</button></td>
      </tr>
    </table>

    <div id="overlay" v-show="showContent">
      <div id="content">
        <p>
          {{ viewData.name }}さんの残高<br /><br />
          {{ viewData.wallet }}
        </p>
        <div>
          <button @click="closeWallet">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

//
<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      userData: {},
      usersData: [],
      viewData: {},
      showContent: false,
    };
  },

  methods: {
    openWallet(user) {
      this.viewData = user;
      this.showContent = true;
    },
    closeWallet() {
      this.showContent = false;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
  beforeRouterLeave(to, from, next) {
    this.userData = {};
    this.usersData = [];
    next();
  },
  created: function() {
    if (firebase.auth().currentUser == null) {
      this.$router.push('/');
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          this.userData = doc.data();
          firebase
            .firestore()
            .collection('users')
            .get()
            .then((docs) => {
              docs.forEach((user) => {
                if (firebase.auth().currentUser.uid == user.data().uid) {
                  return;
                } else {
                  this.usersData.push(user.data());
                }
              });
            });
        })
        .catch(() => {
          this.$router.push('/');
        });
    }
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
