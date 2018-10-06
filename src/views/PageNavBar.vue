<template>
  <div class="ui fixed menu">
    <router-link :to="{ name: 'Home' }" class="item" exact>HOME</router-link>
  </div>
</template>

<style scoped>
div.ui.fixed.menu {
  border-radius: 0;
  border: 0;
}
</style>
