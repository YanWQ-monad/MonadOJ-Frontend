<template>
  <router-link
    v-if="linkType === 'direct'"
    :to="to"
  ><slot /></router-link>
  <a
    v-else
    @click="click"
  ><slot /></a>
</template>

<script>
export default {
  name: 'CustomLink',
  props: {
    'linkType': {
      type: String,
      default: 'direct',
      validator: (value) => ['direct', 'event'].includes(value)
    },
    'to': {
      type: Object,
      required: false
    }
  },
  data: () => ({}),
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
