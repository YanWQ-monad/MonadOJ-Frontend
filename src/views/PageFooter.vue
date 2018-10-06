<template>
  <div class="ui vertical footer segment">
    <div class="ui text container" v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    content: 'Powered by \
<a href="https://github.com/YanWQ-monad" target="_blank">Monad</a>\
<a href="https://github.com/YanWQ-monad/MonadOJ-Frontend" target="_blank">O</a>\
<a href="https://github.com/YanWQ-monad/MonadOJ-Backend" target="_blank">J</a>\
. All Rights Reserved.'
  })
}
</script>

<style scoped>
.ui.vertical.footer {
  position: relative;
  margin-top: -48px;
  height: 48px;
  width: 100%;
  background-color: #f0f0f0;
}

.ui.text.container {
  max-width: 1000px !important;
}
</style>
