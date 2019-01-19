import * as S from 'sequelize'

export interface DbConOpt extends S.Options {
  dbName: string
  dbUserName: string
  dbPassword: string
  options?: S.Options
}

export type ModelDef<TModel> = S.Model<S.Instance<TModel>, TModel>

export interface ModelConf<TModel> {
  modelName: string
  modelAttributes: S.DefineModelAttributes<TModel>
}
