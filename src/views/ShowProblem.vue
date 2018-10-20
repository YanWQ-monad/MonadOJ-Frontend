<template>
  <div>
    <h2>#{{ problem.pid }} {{ problem.name }}</h2>

    <div class="clipboard_hidden" />
    <div class="ui active inverted dimmer" v-if="!load">
      <div class="ui active loader large"></div>
    </div>

    <h3>Description</h3>
    <div class="ui segment">
      <MarkdownRender :markdown="problem.description" />
    </div>

    <h3>Input format</h3>
    <div class="ui segment">
      <MarkdownRender :markdown="problem.input_format" />
    </div>

    <h3>Output format</h3>
    <div class="ui segment">
      <MarkdownRender :markdown="problem.output_format" />
    </div>

    <div class="sample_list">
      <div
        v-for="(sample, index) in problem.samples"
        :key="index"
      >
        <h3>Sample {{ index + 1 }}</h3>
        <div class="ui grid sample_group">
          <div class="eight wide column sample_content">
            <div class="ui segment">
              <a class="ui right corner label" @click="copyText($event, sample.input)">
                <i class="copy outline icon"></i>
              </a>
              <span>{{ sample.input }}</span>
            </div>
          </div>
          <div class="eight wide column sample_content">
            <div class="ui segment">
              <span>{{ sample.output }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="problem.hint !== ''">
      <h3>Hint</h3>
      <div class="ui segment">
        <MarkdownRender :markdown="problem.hint" />
      </div>
    </template>

    <div class="ui styled accordion fluid testcase_accordion" ref="testcase_accordion">
      <div class="title">
        <i class="dropdown icon" />
        Testcases information
      </div>
      <div class="content">
        <div class="transition hidden">
          <table class="ui selectable celled table">
            <thead>
              <th class="two wide">ID</th>
              <th class="four wide">Memory</th>
              <th class="four wide">Time</th>
              <th class="four wide">Score</th>
            </thead>
            <tbody>
              <tr
                v-for="testcase in problem.testcases.testcases"
                :key="testcase.index"
              >
                <td>{{ testcase.index }}</td>
                <td>{{ testcase.memory }} MB</td>
                <td>{{ testcase.time }} ms</td>
                <td>{{ testcase.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownRender from '@/components/MarkdownRender.vue'
import Clipboard from 'clipboard'
import { ajax } from '@/api'

export default {
  name: 'ShowProblem',
  data: () => ({
    load: false,
    problem: {
      pid: 0,
      name: '',
      description: '',
      input_format: '',
      output_format: '',
      samples: [],
      hint: '',
      testcases: []
    }
  }),
  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchData())
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.fetchData()
  },
  methods: {
    fetchData () {
      const pid = this.$route.params.pid
      ajax('/api/problem/' + pid, 'GET').then(data => {
        this.problem = data
        this.problem.samples = JSON.parse(data.samples)
        this.load = true
        this.$nextTick().then(() => {
          $(this.$refs.testcase_accordion).accordion({
            heightStyle: 'content'
          })
        })
      })
    },
    copyText (event, text) {
      new Clipboard('.clipboard_hidden', {
        text: () => text
      }).onClick(event)
    }
  },
  components: {
    MarkdownRender
  }
}
</script>

<style scoped>
.sample_content span {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: Consolas, Menlo, Courier New;
}

.sample_list h3, .testcase_accordion {
  margin-top: calc(2rem - 0.142857em);
}

.sample_group > div > div {
  min-height: 4em;
}

.clipboard_hidden {
  display: none !important;
}

a.ui.corner.label > .icon {
  cursor: pointer;
}
</style>
