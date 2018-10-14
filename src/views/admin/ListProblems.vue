<template>
  <div>
    <h2>Problem List</h2>
    <table class="ui selectable celled table problems">
      <thead>
        <tr>
          <th class="one wide">PID</th>
          <th class="eight wide">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="problem in problems"
          :key="problem.pid"
          @click="editProblem(problem.pid)"
        >
          <td>{{ problem.pid }}</td>
          <td>{{ problem.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ajax } from '@/api'

export default {
  name: 'AdminListProblems',
  data: () => ({
    problems: [],
    page: null
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
      ajax('/api/admin/problem/list', 'GET', {
        index: this.$route.params.page || 1
      }).then(data => {
        this.problems = data.problems
        this.page = data.page
      })
    },
    editProblem (pid) {
      this.$router.push({
        name: 'Admin Edit Problem',
        params: { pid }
      })
    }
  }
}
</script>

<style scoped>
table.problems > tbody > tr {
  cursor: pointer;
}
</style>
