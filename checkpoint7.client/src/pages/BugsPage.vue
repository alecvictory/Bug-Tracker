<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center">
      <form @submit.prevent="addBug">
        <input type="'text" v-model="state.newBug.title" placeholder="New Bug Title">
        <input type="'text" v-model="state.newBug.description" placeholder="Description">
        <button type="submit" class="btn btn-success">
          create bug
        </button>
        <div class="d-flex justify-content-right">
          <form>
            <!-- -------------vv this makes the checkbox infinitely flip------- -->
            <input @click="state.checkbox = !state.checkbox" type="checkbox">
          </form>
          <p>Hide Closed Bugs</p>
        </div>
      </form>
    </div>
    <div class="bugsPage">
      <table class="table table-striped">
        <thead>
          <tbody class="d-flex justify-content-around bg-white">
            <td scope="col">
              Title
            </td>
            <td scope="col">
              Reported By
            </td>
            <td scope="col">
              Status
            </td>
            <td scope="col">
              Last Modified
            </td>
          </tbody>
        </thead>
        <tr>
          <div class="mb-2" v-if="state.checkbox === true">
            <Bug v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
          </div>
          <div class="mb-2" v-else>
            <Bug v-for="bug in state.filtered" :key="bug.id" :bug-prop="bug" />
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'BugsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBug: {},
      bugs: computed(() => AppState.bugs),
      filtered: computed(() => AppState.bugs.filter(b => b.closed !== true)),
      checkbox: true
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast('error:' + error, 'danger')
      }
    })
    return {
      state,
      route,
      async addBug() {
        try {
          await bugsService.addBug(state.newBug)
          state.newBug = {}
          Notification.toast('Successfully Created Post', 'success')
        } catch (error) {
          Notification.toast('error:' + error, 'danger')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
