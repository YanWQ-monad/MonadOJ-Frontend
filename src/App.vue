<template>
  <div id="app">
    <PageNavBar />
    <div class="ui text container">
      <router-view/>
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageNavBar from '@/views/PageNavBar.vue'
import PageFooter from '@/views/PageFooter.vue'

export default {
  components: {
    PageNavBar,
    PageFooter
  }
}
</script>

<style>
/* For header */
#app > .text.container:before {
  content: '';
  display: block;
  padding-top: 3.2em;
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
}

#app {
  height: 100%;
  min-height: 100%;
}
</style>
