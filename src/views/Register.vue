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
    <ErrorShow
      :main="error.main"
      :details="error.details"
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

const email_re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

export default {
  name: 'Register',
  data: () => ({
    form: {
      email: '',
      username: '',
      password: ''
    },
    error: {
      main: '',
      details: []
    }
  }),
  methods: {
    submitRegister () {
      this.$el.querySelectorAll('.field.error')
        .forEach(e => e.classList.remove('error'))
      this.error.details = []
      this.error.main = ''
      if (!email_re.test(this.form.email.trim())) {
        this.addErrorDetail('email', 'Email must be a valid email address')
      }
      if (this.form.username.trim().length === 0) {
        this.addErrorDetail('username', 'Username could not be empty')
      }
      if (this.form.password.length < 8) {
        this.addErrorDetail('password', 'Password must be at least 8 characters long')
      }
      if (this.error.details.length > 0) {
        this.error.main = 'Please fix the fields error'
        return
      }

      const password = saltedPassword(this.form.password)
      ajax('/api/auth/register', 'POST', {
        email: this.form.email.trim(),
        username: this.form.username.trim(),
        password
      }).then(() => {
        this.$refs.cacher.removeCache()
      })
    },
    addErrorDetail (field, error) {
      this.$el.querySelectorAll('input[name="' + field + '"]')[0]
        .parentElement.classList.add('error')
      this.error.details.push(error)
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
