<template>
  <div>
    <h2>
      新規登録
    </h2>
    <form>
      <ul>
        <li class="name">
          <label for="name">名前</label>
          <input
            type="name"
            id="name"
            class="name"
            placeholder="name"
            v-model="name"
          />
        </li>
        <li class="email">
          <label for="email">メールドレス</label>
          <input
            type="email"
            id="email"
            class="email"
            placeholder="e-mail"
            v-model="mailaddress"
          />
        </li>
        <li class="password">
          <label for="password">パスワード</label>
          <input
            type="password"
            id="password"
            class="password"
            placeholder="パスワード"
            v-model="password"
          />
        </li>
      </ul>

      <input type="button" value="ログイン" @click="signUp" /><br />

      <router-link to="/">ログインはこちらから</router-link>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      name: '',
      mailaddress: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      const user = {
        name: this.name,
        mailaddress: this.mailaddress,
        wallet: 1000,
        uid: '',
      };
      const users = firebase.firestore().collection('users');
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          user.uid = firebase.auth().currentUser.uid;
          users
            .doc(firebase.auth().currentUser.uid)
            .set(user)
            .then(() => {
              this.$router.push('/Users');
            })
            .catch(() => {});
        });
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
.name {
  margin-left: 31px;
}
.password {
  margin-left: 8px;
}
</style>
