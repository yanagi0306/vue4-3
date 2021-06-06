<template>
  <div>
    <h2>
      ログイン画面
    </h2>
    <form>
      <ul>
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

      <input type="button" value="ログイン" @click="login()" /><br />

      <router-link to="/signup">新規登録はこちらから</router-link>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      mailaddress: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          this.$router.push('/Users');
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.password {
  margin-left: 8px;
}

li {
  list-style: none;
}
</style>
