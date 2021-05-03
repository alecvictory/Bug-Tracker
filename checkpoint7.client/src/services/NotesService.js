import { AppState } from '../AppState'
import { api } from './AxiosService'
class NotesService {
  async getNotesByBugId(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
  }

  async addNote(newNote) {
    await api.post('api/notes', newNote)
    this.getNotesByBugId(newNote.bug)
  }

  async deleteNote(note) {
    await api.delete(`api/notes/${note.id}`)
    this.getNotesByBugId(note.bug)
  }
}

export const notesService = new NotesService()
