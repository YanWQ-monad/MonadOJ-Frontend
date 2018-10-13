<template>
  <div id="app">
    <PageNavBar />
    <div class="ui text container">
      <router-view/>
    </div>
    <PageFooter />
    <keep-alive>
      <AlertSingletion ref="alert" />
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'
import PageNavBar from '@/views/PageNavBar.vue'
import PageFooter from '@/views/PageFooter.vue'
import AlertSingletion from '@/components/Alert.vue'

export default {
  mounted () {
    Vue.prototype.$alert = this.$refs.alert
  },
  components: {
    PageNavBar,
    PageFooter,
    AlertSingletion
  }
}
</script>

<style>
/* For header */
#app > .text.container:before {
  content: '';
  display: block;
  padding-top: 3.6em;
}

/* For footer */
#app > .text.container:after {
  content: '';
  display: block;
  padding-bottom: 48px;
}

#app > .text.container {
  max-width: 1000px !important;
  min-height: 100%;
  padding-bottom: 1em;
}

#app {
  height: 100%;
  min-height: 100%;
}
</style>
