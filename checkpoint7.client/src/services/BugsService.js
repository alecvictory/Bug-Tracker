import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async addBug(data) {
    const res = await api.post('api/bugs', data)
    router.push({ name: 'Bug', params: { id: res.data.id } })
  }

  async deleteBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.setActive(id)
  }

  async setActive(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async editBug(newBug) {
    await api.put(`api/bugs/${newBug.id}`, newBug)
    this.setActive(newBug.id)
  }
}

export const bugsService = new BugsService()
