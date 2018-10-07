<template>
  <form class="ui form segment" @submit.prevent="submitLogin">
    <h1>Login</h1>
    <div class="inline field">
      <label>Username</label>
      <input type="text" name="username" v-model="form.username" placeholder="Enter your username">
    </div>
    <div class="inline field">
      <label>Password</label>
      <input type="password" name="password" v-model="form.password" placeholder="Enter your password">
    </div>
    <FormCacheTool v-model="form" ref="cacher" type="login" />
    <button class="ui button fluid primary" type="submit">Login</button>
    <ErrorShow
      ref="error"
      icon="exclamation"
      level="warning"
    />
  </form>
</template>

<script>
import FormCacheTool from '@/components/FormCacheTool.vue'
import ErrorShow from '@/components/ErrorShow.vue'
import { saltedPassword } from '@/utils/mappings'
import { ajax } from '@/api'


export default {
  name: 'LoginPage',
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),
  methods: {
    submitLogin () {
      this.cleanError()
      if (this.form.username.trim().length === 0) {
        this.addErrorDetail('username', 'Username could not be empty')
      }
      if (this.form.password.length < 8) {
        this.addErrorDetail('password', 'Password must be at least 8 characters long')
      }
      if (this.$refs.error.hasError()) {
        this.$refs.error.setMainError('Please fix the fields error')
        return
      }

      const password = saltedPassword(this.form.password)
      ajax('/api/auth/login', 'POST', {
        username: this.form.username.trim(),
        password
      }).then(user => {
        this.$store.dispatch('auth/setToken', { token: user.token })
        this.$refs.cacher.removeCache()
        this.$router.go(-1)
      }).catch(data => {
        const msg = data.msg
        this.addErrorDetail(msg.split(' ')[0].toLowerCase(), msg)
        this.$refs.error.setMainError('Value error')
      })
    },
    addErrorDetail (field, error) {
      this.$el.querySelectorAll('input[name="' + field + '"]')[0]
        .parentElement.classList.add('error')
      this.$refs.error.addErrorDetail(error)
    },
    cleanError () {
      this.$el.querySelectorAll('.field.error')
        .forEach(e => e.classList.remove('error'))
      this.$refs.error.cleanError()
    }
  },
  components: {
    FormCacheTool,
    ErrorShow
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
