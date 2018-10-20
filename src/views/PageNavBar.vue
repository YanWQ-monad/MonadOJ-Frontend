<template>
  <div class="ui fixed menu">
    <router-link :to="{ name: 'Home' }" class="item" exact>HOME</router-link>
    <router-link :to="{ name: 'Problems List' }" class="item" exact>Problems</router-link>
    <router-link
      :to="{ name: 'Admin Default' }"
      class="item"
      v-if="loggedIn && user.admin"
    >Management</router-link>
    <div class="right menu">
      <div class="ui simple dropdown item" v-if="loggedIn">
        {{ user.name }} <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item" @click="logout">Logout <i class="sign-out icon"></i></div>
        </div>
      </div>
      <template v-else>
        <router-link :to="{ name: 'Register' }" class="item">Register</router-link>
        <router-link :to="{ name: 'Login' }" class="item">Login</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageNavBar',
  computed: {
    ...mapState({
      user: state => state.auth
    }),
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    logout () {
      this.$store.commit('auth/logout')
      this.$alert.addMessage('success', 'Logout', 'You have been logged out')
    }
  }
}
</script>

<style scoped>
div.ui.fixed.menu {
  border-radius: 0;
  border: 0;
}
</style>
