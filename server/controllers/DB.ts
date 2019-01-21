import * as S from 'sequelize'
import Sequelize from 'sequelize'

import { DbConOpt, ModelConf, ModelDef } from 'types/server'
import { Log } from 'utils/Logger'

export class DB {
  get getDb() {
    return this.db_
  }

  get activeTalbeName() {
    const name = this.activeTableName_
    this.checkTableExistence(name)
    return name
  }

  set activeTalbeName(tableName: string) {
    this.checkTableExistence(tableName)
    this.activeTableName_ = tableName
  }

  // singleton
  private constructor() {}

  private db_: S.Sequelize
  private tables_: { [key: string]: ModelDef<any> } = {}
  private tableNames_: string[] = []
  private activeTableName_: string
  private defaultDbOptions: S.Options = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    // http:// docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
    operatorsAliases: false,
  }

  public init(dbConOpt: DbConOpt) {
    const { dbName, dbUserName, dbPassword, options } = dbConOpt
    Object.assign(options, this.defaultDbOptions)
    Log.info('DB options:\n %o', options)
    this.db_ = new Sequelize(dbName, dbUserName, dbPassword, options)
  }

  public defineModel<TModel>(modelConf: ModelConf<TModel>) {
    const { modelName, modelAttributes } = modelConf
    const model: ModelDef<TModel> = this.db_.define<S.Instance<TModel>, TModel>(
      modelName,
      modelAttributes
    )
    this.tables_[modelName] = model
    this.tableNames_.push(modelName)
  }

  public getActiveTable() {
    return this.tables_[this.activeTalbeName]
  }

  public getTable(tableName: string) {
    this.checkTableExistence(tableName)
    return this.tables_[tableName]
  }

  public initTable<TModel>(
    data: Array<S.DefineModelAttributes<TModel>>,
    modelName: string = this.activeTalbeName
  ) {
    const promises = []
    // data set could be large, so use a basic loop
    for (let i = 0; i < data.length; ++i) {
      promises.push(this.tables_[modelName].create(data[i]))
    }
    return Promise.all(promises)
  }

  private checkTableExistence(tableName: string) {
    if (!this.tableNames_.includes(tableName)) {
      Log.verbose('Current talbes: %s', this.tableNames_)
      throw Error(`Table with name ${tableName} does not exist!`)
    }
  }

  private static instance: DB

  public static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance
  }
}
