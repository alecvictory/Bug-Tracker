<template>
  <div class="container-fluid bg-dark">
    <div class="text-white text-center" v-if="state.loading===true">
      <h1>
        ...loading
      </h1>
    </div>
    <div v-else class="bug">
      <div class="row">
        <div class="col card-title text-center">
          <h1 class="m-5 text-white">
            <div class="">
              {{ state.activeBug.creator.name }}
              <img :src="state.activeBug.creator.picture" class="rounded-circle" alt="">
              <div v-if="state.activeBug.closed === false">
                <button @click="deleteBug" class="btn btn-danger">
                  <i class="" aria-hidden="true">OPEN/CLOSE BUG</i>
                </button>
              </div>
              <div v-else></div>
            </div>
            Title: {{ state.activeBug.title }}
          </h1>
          <div class="">
            <h3 class="text-white">
              <p>Bug Status:</p>
              <span v-if="state.activeBug.closed" class="text-danger">closed</span>
              <span v-else class="text-success">open</span>
            </h3>
          </div>
          <div v-if="state.activeBug.closed === false">
            <form @submit.prevent="editBug">
              <input class="px-2" type="'text" v-model="state.newBug.description" placeholder="Edit Description...">
              <button type="submit" class="btn btn-success m-2 btn-sm">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <div v-else>
          </div>
          <h2>
            <div class="card bg-white">
              Bug Description: {{ state.activeBug.description }}
            </div>
          </h2>
          <form @submit.prevent="addNote">
            <input class="px-2" type="'text" v-model="state.newNote.body" placeholder="Create Note...">
            <button type="submit" class="btn btn-success m-2 btn-sm">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="row justify-content-around">
        <table class="table table-striped">
          <thead>
            <tbody>
            </tbody>
          </thead>
          <tr>
            <Note v-for="note in state.notes" :key="note.id" :note-prop="note" />
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugPage',

  props: {
    bugProp: {
      type: Object,
      required: true
    },
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newNote: {},
      newBug: {},
      activeBug: computed(() => AppState.activeBug),
      bug: computed(() => AppState.bugs.id),
      note: computed(() => AppState.notes.id),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.setActive(route.params.id)
        await notesService.getNotesByBugId(state.activeBug.id)
        state.loading = false
      } catch (error) {
        Notification.toast('error:' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteBug() {
        try {
          const answer = confirm('are you sure you want to close this bug?')
          if (answer === true) {
            await bugsService.deleteBug(state.activeBug.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      },
      async addNote() {
        try {
          state.newNote.bug = route.params.id
          await notesService.addNote(state.newNote)
          state.newNote = {}
          Notification.toast('Successfully Created Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      },
      async editBug() {
        try {
          state.newBug.id = state.activeBug.id
          await bugsService.editBug(state.newBug)
          state.newBug = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
