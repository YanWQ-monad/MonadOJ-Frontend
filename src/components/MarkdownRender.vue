<template>
  <div class="markdown-show" v-html="html" />
</template>

<script>
import marked from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const katexRenger = (text) => {
  const regex = /(?<!\\)\$(.*?)\$/g
  const matches = text.match(regex)
  let result = ''

  if (matches === null) {
    return text
  }

  for (let i = 0; i < matches.length; i++) {
    const begin = text.search(regex)
    const length = matches[i].length

    result = result + text.substring(0, begin)
    text = text.substring(begin)
    result = result + katex.renderToString(text.substring(1, length - 1), {
      throwOnError: false
    })
    text = text.substring(length)
  }

  result = result + text
  result = result.split('\\$').join('$')

  return result
}

export default {
  name: 'MarkdownRender',
  props: {
    'markdown': String
  },
  data: () => ({
    html: ''
  }),
  methods: {
    render_markdown () {
      this.html = marked(this.markdown)
      this.html = katexRenger(this.html)
    }
  },
  mounted () {
    this.render_markdown()
  },
  watch: {
    'markdown' () {
      this.render_markdown()
    }
  }
}
</script>

<style>
.markdown-show {
  font-size: 16px;
}

.markdown-show code {
  padding: 0 3px;
}

.markdown-show blockquote {
  color: gray;
  margin: 5px 0;
  padding: 5px 16px;
  border-left: 5px solid #eee;
}

.markdown-show code, .markdown-show pre {
  font-family: Consolas, Menlo, Courier New;
}

.markdown-show :not(pre) > code, .markdown-show pre {
  padding-left: 3px;
  background-color: #00000010;
  font-size: 16px;
}
</style>
