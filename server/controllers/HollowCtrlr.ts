import { DB } from 'controllers/DB'
import { DbConOpt } from 'controllers/types'
import { HollowInstance, HollowModel } from 'models/Hollow'
import { initialHowllows, initialTags } from 'models/initialData'
import { TagModel } from 'models/Tags'
import { Log } from 'utils/Logger'

export class HollowCtrlr {
  constructor() {
    this.db = DB.getInstance()
  }

  private db: DB

  get getConn() {
    return this.db
  }

  public async initDbWithData() {
    try {
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
      this.db.init(dbConfig)
      // define tables
      this.db.defineModel(HollowModel)
      this.db.defineModel(TagModel)
      // association
      const HollowTable = this.db.getTable(HollowModel.modelName)
      const TagTable = this.db.getTable(TagModel.modelName)
      const junctionTbName = 'HollowTag'
      HollowTable.belongsToMany(TagTable, { through: junctionTbName })
      TagTable.belongsToMany(HollowTable, { through: junctionTbName })

      // init data
      // TODO: add postfix dev tables with something
      if (process.env.NODE_ENV !== 'prod') {
        await this.db.getDb.sync({ force: true })
        const tagInitProm = []
        for (const tag of initialTags) {
          tagInitProm.push(TagTable.create(tag))
        }
        await Promise.all(tagInitProm)

        await TagTable.all().then(tags => {
          for (const hollow of initialHowllows) {
            HollowTable.create(hollow).then((hollowInst: HollowInstance) =>
              hollowInst.setTags([
                tags[Math.floor(Math.random() * Math.floor(tags.length))],
              ])
            )
          }
        })
      }
    } catch (e) {
      Log.error('DB init error %s.Exiting now.', e)
      this.db.getDb.close()
      process.exit(1)
    }
  }
}
