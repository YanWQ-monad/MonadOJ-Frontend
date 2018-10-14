<template>
  <form class="ui form" @submit.prevent="submitEditProblem">
    <h2>Edit Problem</h2>

    <div class="ui active inverted dimmer" v-if="!load">
      <div class="ui active loader large"></div>
    </div>

    <h3 class="ui horizontal divider header">Frontend Data</h3>

    <h3>Problem Name</h3>
    <input v-model="problem.name">

    <h3>Description</h3>
    <MarkdownEditor v-model="problem.description" />

    <h3>Input Format</h3>
    <MarkdownEditor v-model="problem.input_format" />

    <h3>Output Format</h3>
    <MarkdownEditor v-model="problem.output_format" />

    <h3>Samples</h3>
    <div class="ui styled accordion fluid sample_accordion" ref="sample_accordion">
      <span v-for="(sample, index) in problem.samples" :key="index">
        <div class="title">
          <i class="dropdown icon" />
          Sample #{{ index }}
          <i class="icon close right" @click="removeSample(index)" />
        </div>
        <div class="content transition hidden">
          <div class="ui grid">
            <div class="eight wide column">
              <textarea rows="6" v-model="sample.input"></textarea>
            </div>
            <div class="eight wide column">
              <textarea rows="6" v-model="sample.output"></textarea>
            </div>
          </div>
        </div>
      </span>
      <div class="ui bottom attached button" @click="addSample">Add Sample</div>
    </div>

    <h3>Hint</h3>
    <MarkdownEditor v-model="problem.hint" />

    <h3 class="ui horizontal divider header">Backend Data</h3>

    <h3>Testcases</h3>
      <div>
        <table
          v-if="testcases !== null && testcases.length !== 0"
          class="ui selectable celled table center aligned"
        >
          <thead>
            <tr>
              <th class="two wide">Data ID</th>
              <th class="two wide">Original name</th>
              <th class="three wide">Time Limit (ms)</th>
              <th class="three wide">Memory Limit (MB)</th>
              <th class="three wide">Score</th>
              <th class="two wide">Has output</th>
            </tr>
          </thead>
          <tbody>
            <tr class="set_all positive">
              <td>All</td>
              <td></td>
              <td><input v-model="set_all.time"></td>
              <td><input v-model="set_all.memory"></td>
              <td><input v-model="set_all.score"></td>
              <td></td>
            </tr>
            <tr
              v-for="testcase in testcases"
              :key="'' + testcase.name + testcase.index"
            >
              <td>{{ testcase.index }}</td>
              <td>{{ testcase.name }}</td>
              <td><input v-model="testcase.time"></td>
              <td><input v-model="testcase.memory"></td>
              <td><input v-model="testcase.score"></td>
              <td>
                <i class="check icon" v-if="testcase.out"></i>
                <i class="close icon" v-else></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label for="testcase_file" class="ui icon button fluid">
            <i class="upload icon"></i> Upload zip
          </label>
          <input
            type="file"
            id="testcase_file"
            accept=".zip"
            ref="testcaseFile"
            @change="uploadTestcase"
          >
        </div>
      </div>

    <button class="ui primary button fluid">Save</button>
  </form>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import pick from 'lodash/pick'
import { ajax } from '@/api'

export default {
  name: 'AdminEditProblem',
  data: () => ({
    load: false,
    problem: {
      name: '',
      description: '',
      input_format: '',
      output_format: '',
      samples: [],
      hint: ''
    },
    testcases: [],
    set_all: {
      time: 1000,
      memory: 256,
      score: 10
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
      if (this.$route.params.pid === undefined) {
        this.$alert.addMessage('info', 'Unspecified PID', 'Please choose one problem here')
        this.$router.push({ name: 'Admin Problems List' })
      } else {
        ajax('/api/admin/problem/get', 'GET', {
          pid: this.$route.params.pid
        }).then(data => {
          this.load = true
          this.problem = data
          this.problem.samples = JSON.parse(data.samples)
          this.testcases = this.problem.testcases.testcases
          delete this.problem.testcases
          delete this.problem.error
          this.$nextTick().then(() => {
            $(this.$refs.sample_accordion).accordion({
              active: 0,
              heightStyle: 'content'
            })
          })
        })
      }
    },
    addSample () {
      this.problem.samples.push({input: '', output: ''})
    },
    removeSample (index) {
      this.problem.samples.splice(index, 1)
      $(this.$refs.sample_accordion).accordion('activate', false)
    },
    uploadTestcase () {
      const form = new FormData()
      form.append('pid', this.problem.pid)
      form.append('zip_bin', this.$refs.testcaseFile.files[0])
      ajax('/api/admin/problem/upload_testcases', 'POST', form)
        .then(data => this.testcases = data.testcases)
    },
    submitEditProblem () {
      const pick_keys = ['description', 'hint', 'input_format', 'output_format', 'name', 'pid']
      ajax('/api/admin/problem/edit', 'POST', {
        ...pick(this.problem, pick_keys),
        samples: JSON.stringify(this.problem.samples),
        testcases: JSON.stringify(this.testcases)
      }).then(() => {
        this.$alert.addMessage('success', 'Problem saved', 'The problem is updated')
      })
    }
  },
  watch: {
    'set_all.time' (new_time) {
      this.testcases.forEach(value => value.time = new_time)
    },
    'set_all.memory' (new_memory) {
      this.testcases.forEach(value => value.memory = new_memory)
    },
    'set_all.score' (new_score) {
      this.testcases.forEach(value => value.score = new_score)
    }
  },
  components: {
    MarkdownEditor
  }
}
</script>

<style scoped>
.dimmer > .ui.loader {
  top: 3em;
  right: 0;
}

label.button + input[type="file"] {
  display: none;
}

.sample_accordion textarea {
  font-family: Consolas, Menlo, Courier New;
  font-size: 16px;
  resize: none;
}
</style>
