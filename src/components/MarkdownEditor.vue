<template>
  <div class="columns">
    <div class="left">
      <div class="md_editor">
        <codemirror
          v-model="input"
          :options="options"
        />
      </div>
    </div>
    <div class="right">
      <MarkdownRender :markdown="input" />
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime'

import MarkdownRender from '@/components/MarkdownRender.vue'

export default {
  name: 'BaseMarkdownEditor',
  props: {
    'value': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: '',
      options: {
        mode: 'markdown',
        keyMap: 'sublime',
        lineWrapping: true
      }
    }
  },
  watch: {
    'input' () {
      this.$emit('input', this.input)
    },
    'value' (value) {
      if (value !== this.input) {
        this.input = value
      }
    }
  },
  mounted () {
    this.input = this.value
  },
  components: {
    codemirror,
    MarkdownRender
  }
}
</script>

<style scoped>
.columns {
  margin: 10px 0 20px 0;
}

.columns > .left {
  float: left;
  width: 50%;
}

.columns > .right {
  margin-left: 50%;
  width: 50%;
}

.columns > .clear {
  clear: both;
}

.md_editor {
  z-index: 3;
  border: 1px solid #d5e0e3;
  border-color: #d5e0e3;
  border-radius: .28571429rem 0 0 .28571429rem;
  padding: 10px;
  padding-right: 0;
  font-size: 16px;
  transition: border-color .1s ease;
}

.md_editor:focus-within {
  border-color: #85b7d9;
}

.markdown-show {
  background-color: #fafafa;
  border: 1px solid #d5e0e3;
  border-left: none;
  border-radius: 0 .28571429rem .28571429rem 0;
  height: 382px;
  overflow-y: auto;
  padding: 10px;
}
</style>

<style>
.CodeMirror {
  height: 360px;
  font-family: Consolas, Menlo, Courier New;
}
</style>
