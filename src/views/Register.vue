<template>
  <form class="ui form segment" @submit.prevent="submitRegister">
    <h1>Register</h1>
    <div class="inline field">
      <label>Email</label>
      <input type="text" name="email" v-model="form.email" placeholder="Enter your email">
    </div>
    <div class="inline field">
      <label>Username</label>
      <input type="text" name="username" v-model="form.username" placeholder="Enter your username">
    </div>
    <div class="inline field">
      <label>Password</label>
      <input type="password" name="password" v-model="form.password" placeholder="Enter your password">
    </div>
    <FormCacheTool v-model="form" ref="cacher" type="register" />
    <button class="ui button fluid primary" type="submit">Register</button>
  </form>
</template>

<script>
import FormCacheTool from '@/components/FormCacheTool.vue'
import { saltedPassword } from '@/utils/mappings'
import { ajax } from '@/api'

export default {
  data: () => ({
    form: {
      email: '',
      username: '',
      password: ''
    }
  }),
  methods: {
    submitRegister () {
      const password = saltedPassword(this.form.password)
      ajax('/api/auth/register', 'POST', {
        email: this.form.email,
        username: this.form.username,
        password
      }).then(data => {
        this.$refs.cacher.removeCache()
      })
    }
  },
  components: {
    FormCacheTool
  }
}
</script>

<style scoped>
.ui.form.segment {
  max-width: 600px;
  margin: 0 auto;
}

.ui.form .inline.field > label {
  width: 60px;
  text-align: right;
  margin-right: 12px;
  vertical-align: middle;
}

.ui.form .inline.field > input {
  width: calc(100% - 72px);
}
</style>
