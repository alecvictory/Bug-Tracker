<template>
  <div class="bug d-flex justify-content-around">
    <div class="row">
      <tr>
        <!-- title -->
        <div>
          <router-link :to="{ name: 'Bug', params:{id: bugProp.id} }">
            <td>{{ bugProp.title }}</td>
          </router-link>
        </div>
      </tr>
      <tr>
        <!-- reported by -->
        <div>
          <td>{{ bugProp.creator.name }}</td>
        </div>
      </tr>
      <tr>
        <!-- status -->
        <span v-if="bugProp.closed" class="text-danger">closed</span>
        <span v-else class="text-success">open</span>
      </tr>
      <tr>
        <!-- last modified -->
        <div>
          <td>{{ new Date(bugProp.updatedAt).toLocaleString() }}</td>
        </div>
      </tr>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
// import { bugsService } from '../services/BugsService'
// import Notification from '../utils/Notification'
export default {
  name: 'Bug',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newBug: {},
      bug: computed(() => AppState.bug),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
