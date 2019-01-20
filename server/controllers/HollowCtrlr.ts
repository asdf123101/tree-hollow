import { DB } from 'controllers/DB'
import { DbConOpt } from 'controllers/types'
import { HollowModel } from 'models/Hollow'
import { initialHowllows, initialTags } from 'models/initialData'
import { TagModel } from 'models/Tags'
import { Log } from 'utils/Logger'

const initHollow = async () => {
  const dbConfig: DbConOpt = {
    dbName: 'TreeHollow',
    dbUserName: process.env.DBUSERNAME || 'root',
    dbPassword: process.env.DBPASSWORD || '',
    options: {
      define: {
        charset: 'utf8mb4',
      },
    },
  }

  const db = new DB(dbConfig)

  try {
    db.init()
    // define tables
    db.defineModel(HollowModel)
    db.defineModel(TagModel)
    // association
    const HollowTable = db.getTable(HollowModel.modelName)
    const TagTable = db.getTable(TagModel.modelName)
    const junctionTbName = 'HollowTag'
    HollowTable.belongsToMany(TagTable, { through: junctionTbName })
    TagTable.belongsToMany(HollowTable, { through: junctionTbName })

    // init data
    // TODO: add postfix dev tables with something
    await db.getDb.sync({ force: process.env.NODE_ENV !== 'prod' })
    for (const tag of initialTags) {
      TagTable.create(tag)
    }
    for (const hollow of initialHowllows) {
      HollowTable.create(hollow)
    }
  } catch (e) {
    Log.error('DB init error %s.Exiting now.', e)
    db.getDb.close()
    process.exit(1)
  }
}
initHollow()
