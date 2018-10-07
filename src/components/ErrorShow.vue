<template>
  <div
    class="ui message"
    :class="[level, {icon: icon}, {visible: main !== ''}]"
  >
    <i
      v-if="icon !== null"
      :class="icon"
      class="icon"
    />
    <div class="content">
      <div class="header">
        {{ main }}
      </div>
      <p v-if="details instanceof String">{{ details }}</p>
      <ul v-else-if="details instanceof Array" class="list">
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorShow',
  props: {
    icon: {
      type: String,
      default: null
    },
    level: {
      type: String,
      dafault: ''
    }
  },
  data: () => ({
    main: '',
    details: []
  }),
  methods: {
    addErrorDetail (msg) {
      this.details.push(msg)
    },
    setMainError (error) {
      this.main = error
    },
    cleanError () {
      this.main = ''
      this.details = []
    },
    hasError () {
      return this.details.length > 0
    }
  }
}
</script>
