<template>
  <form class="ui form" @submit.prevent="submitNewProblem">
    <h2>Add Problem</h2>

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

    <button class="ui primary button fluid">Create</button>
  </form>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { ajax } from '@/api'

export default {
  name: 'AdminAddProblem',
  data: () => ({
    problem: {
      name: '',
      description: '> *Tip: [Markdown](https://commonmark.org/help/tutorial) support*\n',
      input_format: '',
      output_format: '',
      samples: [],
      hint: ''
    }
  }),
  mounted () {
    this.addSample()
    $(this.$refs.sample_accordion).accordion({
      active: 0,
      heightStyle: 'content'
    })
  },
  methods: {
    submitNewProblem () {
      ajax('/api/admin/problem/add', 'POST', {
        ...this.problem,
        samples: JSON.stringify(this.problem.samples)
      }).then(data => {
        this.$alert.addMessage('success', 'Problem added', 'The new problem is saved')
        this.$router.push({
          name: 'Admin Edit Problem',
          params: { pid: data.pid }
        })
      })
    },
    addSample () {
      this.problem.samples.push({input: '', output: ''})
    },
    removeSample (index) {
      this.problem.samples.splice(index, 1)
      $(this.$refs.sample_accordion).accordion('activate', false)
    }
  },
  components: {
    MarkdownEditor
  }
}
</script>

<style scoped>
.accordion .title .right {
  float: right;
}

.sample_accordion .content textarea {
  font-family: Consolas, Menlo, Courier New;
  font-size: 16px;
  resize: none;
}
</style>
