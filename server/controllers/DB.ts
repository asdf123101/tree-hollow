import * as S from 'sequelize'
import Sequelize from 'sequelize'

import { DbConOpt, ModelConf, ModelDef } from './types'

class DB {
  get db() {
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

  constructor(public options: DbConOpt) {}

  private db_: S.Sequelize
  private tables_: { [key: string]: ModelDef<any> }
  private tableNames_: string[] = []
  private activeTableName_: string

  public init() {
    const { dbName, dbUserName, dbPassword, ...options } = this.options
    this.db_ = new Sequelize(dbName, dbUserName, dbPassword, options)
  }

  public async defineModel<TModel>(modelConf: ModelConf<TModel>) {
    const { modelName, modelAttibutes } = modelConf
    const model: ModelDef<TModel> = this.db_.define<S.Instance<TModel>, TModel>(
      modelName,
      modelAttibutes
    )
    try {
      await model.sync()
    } catch (e) {
      console.log(e)
    }
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
      throw Error(`Table with name ${tableName} does not exist!`)
    }
  }
}
