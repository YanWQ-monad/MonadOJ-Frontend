<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      title: 'Monad OJ',
      content: 'Welcome to Monad OJ'
    }
  }
}
</script>

<style>
</style>
