<template>
  <div></div>
</template>

<script>
export default {
  name: 'FormCacheTool',
  props: {
    'value': {
      type: Object
    },
    'type': {
      type: String
    }
  },
  mounted () {
    const cached = this.$store.getters.getFormCache(this.type)
    if (cached !== null) {
      this.$emit('input', cached.form)
    } else {
      this.$store.commit('initFormCache', {
        form: this.value,
        type: this.type
      })
    }
  },
  methods: {
    removeCache () {
      this.$store.commit('removeFormCache')
    }
  },
  watch: {
    'value': {
      handler () {
        this.$store.dispatch('updateFormCache', {
          form: this.value,
          type: this.type
        })
      },
      deep: true
    }
  }
}
</script>
