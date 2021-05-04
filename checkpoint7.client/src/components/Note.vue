<template>
  <div class="note bg-white mb-4">
    <tr>
      <div>
        <td>    {{ noteProp.body }}</td>
        {{ noteProp.creator.name }}
        <img :src="noteProp.creator.picture" class="rounded-circle img-sm" alt="">
      </div>
      <div>
        <button @click="deleteNote" class="btn btn-danger">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </tr>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'
export default {
  name: 'Note',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newNote: {},
      note: computed(() => AppState.notes.id),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteNote() {
        try {
          const answer = confirm('are you sure you want to delete this note?')
          if (answer === true) {
            await notesService.deleteNote(props.noteProp)
          }
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
