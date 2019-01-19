import { DB } from 'controllers/DB'
import { DbConOpt } from 'controllers/types'
import { HollowModel } from 'models/Hollow'
import { TagModel } from 'models/Tags'
import { Log } from 'utils/Logger'

const initHollow = async () => {
  const dbConfig: DbConOpt = {
    dbName: 'TreeHollow',
    dbUserName: process.env.DBUSERNAME || 'root',
    dbPassword: process.env.DBPASSWORD || '',
  }

  const db = new DB(dbConfig)
  db.init()

  try {
    // define tables
    await db.defineModel(HollowModel)
    await db.defineModel(TagModel)

    // association
    const HollowTable = db.getTable(HollowModel.modelName)
    const TagTable = db.getTable(TagModel.modelName)
    HollowTable.belongsToMany(TagTable, { through: 'HollowTag' })
    TagTable.belongsToMany(HollowTable, { through: 'HollowTag' })
  } catch (e) {
    Log.error(e)
  }
}

initHollow()
