<template>
  <div>
    <div class="sidebar_menu">
      <AdminSidebar />
    </div>
    <div class="content">
      <h1>Management</h1>
      <router-view />
    </div>
    <div class="clear" />
  </div>
</template>

<script>
import AdminSidebar from '@/views/admin/SidebarMenu.vue'

export default {
  name: 'AdminNavigation',
  components: {
    AdminSidebar
  }
}
</script>

<style scoped>
.sidebar_menu {
  position: absolute;
  left: 0;
}

.sidebar_menu {
  margin-top: 50px;
}

@media only screen and (max-width: 767px) {
  .sidebar_menu + .content {
    padding-left: 214px;
  }
}

@media only screen and (max-width: 991px) and (min-width: 768px) {
  .sidebar_menu + .content {
    padding-left: calc(591.5px - 50vw);
  }
}

@media only screen and (max-width: 1199px) and (min-width: 992px) {
  .sidebar_menu + .content {
    padding-left: calc(696.5px - 50vw);
  }
}

@media only screen and (max-width: 1500px) and (min-width: 1200px) {
  .sidebar_menu + .content {
    padding-left: calc(730px - 50vw);
  }
}
</style>
