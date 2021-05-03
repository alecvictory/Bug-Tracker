import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getBugsByAccountId(query = {}) {
    const bug = await dbContext.Bug.find(query).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async getBugById(query) {
    const data = await dbContext.Bug.findOne(query).populate('creator', 'name picture')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBug(body) {
    return await dbContext.Bug.create(body)
  }

  async editBug(body) {
    const data = await dbContext.Bug.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async deleteBug(id, userId) {
    const data = await dbContext.Bug.findOneAndUpdate({ _id: id, creatorId: userId }, { closed: true }, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Closed'
  }
}
export const bugsService = new BugsService()
