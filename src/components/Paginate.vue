<template>
  <div class="paginate">
    <div class="ui basic buttons" v-if="valid">
      <CustomLink
        class="ui button"
        :class="{ disabled: !page.has_previous }"
        :to="getLinkTarget(1)"
        @click="emitPageJump(1)"
        :linkType="routerType"
      >
        <i class="angle double left icon"></i>
      </CustomLink>
      <CustomLink
        class="ui button"
        :class="{ disabled: !page.has_previous }"
        :to="getLinkTarget(page.page_index - 1)"
        @click="emitPageJump(page.page_index - 1)"
        :linkType="routerType"
      >
        <i class="angle left icon"></i>
      </CustomLink>
      <div class="ui disabled button show_page_index">
        {{ page.page_index }}
      </div>
      <CustomLink
        class="ui button"
        :class="{ disabled: !page.has_next }"
        :to="getLinkTarget(page.page_index + 1)"
        @click="emitPageJump(page.page_index + 1)"
        :linkType="routerType"
      >
        <i class="angle right icon"></i>
      </CustomLink>
      <CustomLink
        class="ui button"
        :class="{ disabled: !page.has_next }"
        :to="getLinkTarget(page.page_count)"
        @click="emitPageJump(page.page_count)"
        :linkType="routerType"
      >
        <i class="angle double right icon"></i>
      </CustomLink>
    </div>
  </div>
</template>

<script>
import CustomLink from '@/components/CustomLink.vue'
import reduce from 'lodash/reduce'

export default {
  name: 'Paginate',
  props: {
    'page': {
      type: Object
    },
    'routerKey': {
      type: String,
      default: ''
    },
    'routerType': {
      type: String,
      default: 'direct',
      validator: (value) => ['direct', 'event'].includes(value)
    }
  },
  data: () => ({
    valid: false
  }),
  methods: {
    checkValidPage: (page) =>
      (page && reduce(['has_next', 'has_previous', 'page_count', 'page_index'], (has, key) => (has && key in page), true)),
    getLinkTarget (pageIndex) {
      const param = Object()
      param[this.routerKey] = pageIndex
      return {
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, param)
      }
    },
    emitPageJump (target) {
      this.$emit('change', target)
    }
  },
  mounted () {
    this.valid = this.checkValidPage(this.page)
  },
  watch: {
    'page' (newPage) {
      this.valid = this.checkValidPage(newPage)
    }
  },
  components: {
    CustomLink
  }
}
</script>

<style scoped>
.paginate {
  text-align: center;
}

.ui.button > .icon {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.ui.button  {
  padding-left: 1.2em;
  padding-right: 1.2em;
}

.buttons > .ui.button.show_page_index  {
  width: 3.58em;
  font-weight: 900;
}
</style>
