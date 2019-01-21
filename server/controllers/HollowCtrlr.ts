import { DB } from 'controllers/DB'
import { HollowModel } from 'models/Hollow'
import { initialHowllows, initialTags } from 'models/initialData'
import { TagModel } from 'models/Tags'
import { DbConOpt, HollowInstance } from 'types/server'
import { Log } from 'utils/Logger'

export class HollowCtrlr {
  constructor() {
    this.db = DB.getInstance()
  }

  private db: DB

  get getConn() {
    return this.db
  }

  public defineTables() {
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
    } catch (e) {
      Log.error('Error during table definition %o', e)
    }
  }

  public async initDbWithData() {
    // init data
    try {
      await this.db.getDb.sync({ force: true })
      const HollowTable = this.db.getTable(HollowModel.modelName)
      const TagTable = this.db.getTable(TagModel.modelName)
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
    } catch (e) {
      Log.error('DB init error %s.Exiting now.', e)
      this.db.getDb.close()
      process.exit(1)
    }
  }
}
