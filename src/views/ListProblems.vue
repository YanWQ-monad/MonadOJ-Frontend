<template>
  <div>
    <h2>Problems List</h2>
    <table class="ui selectable celled table problems">
      <thead>
        <tr>
          <th class="one wide">PID</th>
          <th class="eight wide">Name</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          tag="tr"
          v-for="problem in problems"
          :key="problem.pid"
          :to="{ name: 'Show Problem', params: { pid: problem.pid }}"
        >
          <td>{{ problem.pid }}</td>
          <td>{{ problem.name }}</td>
        </router-link>
      </tbody>
    </table>
    <Paginate
      :page="page"
      routerKey="page"
      routerType="direct"
    />
  </div>
</template>

<script>
import Paginate from '@/components/Paginate.vue'
import { ajax } from '@/api'

export default {
  name: 'ListProblems',
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
      ajax('/api/problems_list', 'GET', {
        index: this.$route.params.page || 1
      }).then(data => {
        this.problems = data.problems
        this.page = data.page
      })
    }
  },
  components: {
    Paginate
  }
}
</script>

<style scoped>
table.problems > tbody > tr {
  cursor: pointer;
}
</style>
