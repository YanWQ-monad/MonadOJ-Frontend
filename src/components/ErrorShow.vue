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
    main: {
      type: String,
      default: ''
    },
    details: {
      type: [ String, Array ],
      default: ''
    },
    icon: {
      type: String,
      default: null
    },
    level: {
      type: String,
      dafault: ''
    }
  }
}
</script>
