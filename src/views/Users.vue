<template>
  <div id="users">
    <p class="name">{{ myData.name }}さんようこそ</p>
    <p class="Wallet">残高:{{ myData.wallet }}</p>
    <button @click="logout()">ログアウト</button>
    <h1>ユーザー覧</h1>

    <table>
      <tr>
        <th>ユーザー名</th>
      </tr>
      <tr v-for="user in usersData" :key="user.id">
        <td>{{ user.name }}</td>
        <td><button @click="openWallet(user)">walletを見る</button></td>
        <td><button @click="openSend(user)">送る</button></td>
      </tr>
    </table>

    <UserWallet :user="user" v-show="viewContent" v-on:close-click="closeWallet"></UserWallet>
    <SendWallet v-on:wallet-click="wallet = $event" v-on:send-click="sendWallet" :myData="myData" v-show="sendContent"></SendWallet>
  </div>
</template>


<script>
import firebase from 'firebase';
import UserWallet from '../components/UserWallet.vue';
import SendWallet from '../components/SendWallet.vue';

export default {
  components: {
    UserWallet,
    SendWallet,
  },
  data() {
    return {
      myData: {},
      usersData: [],
      user: {},
      viewContent: false,
      sendContent: false,
      wallet: '',
    };
  },

  methods: {
    openWallet(user) {
      this.user = user;
      this.viewContent = true;
    },
    closeWallet() {
      this.viewContent = false;
    },
    openSend(user) {
      this.user = user;
      this.sendContent = true;
    },
    sendWallet() {
      if (this.myData.wallet >= this.wallet) {
        this.fb(this.myData.uid)
          .update({
            wallet: this.myData.wallet - this.wallet,
          })
          .then(() => {
            this.fb(this.user.uid)
              .update({
                wallet: this.user.wallet + this.wallet,
              })
              .then(() => {
                this.usersData = [];
                this.reload();
                this.sendContent = false;
              });
          });
      }
    },

    fb(uid) {
      return firebase
        .firestore()
        .collection('users')
        .doc(uid);
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    },

    reload() {
      if (firebase.auth().currentUser == null) {
        this.$router.push('/');
      } else {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((doc) => {
            this.myData = doc.data();
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
  },
  beforeRouterLeave(to, from, next) {
    this.myData = {};
    this.usersData = [];
    next();
  },
  created() {
    this.reload();
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
