<template>
  <div class="ui huge secondary vertical pointing menu" ref="navTable">
    <h3 class="header">Menu</h3>
    <div class="item">
      <div class="header">Problems</div>
      <div class="menu">
        <router-link :to="{ name: 'Admin Problems List' }" class="item">Problems List</router-link>
        <router-link :to="{ name: 'Admin Add Problem' }" class="item">Add Problem</router-link>
        <router-link :to="{ name: 'Admin Edit Problem' }" class="item">Edit Problem</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

<style scoped>
.menu.vertical > .header {
  margin-left: 0.5em;
  margin-bottom: 0;
}

.ui.huge.vertical.menu {
  width: 15rem;
}
</style>
