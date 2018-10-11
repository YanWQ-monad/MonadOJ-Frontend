<template>
  <div class="ui huge secondary vertical pointing menu" ref="navTable">
    <h3 class="header">Menu</h3>
    <div class="item">
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
  width: 15rem !important;
}
</style>
