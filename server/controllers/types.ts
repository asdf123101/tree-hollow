import * as S from 'sequelize'

export interface DbConOpt extends S.Options {
  dbName: string
  dbUserName: string
  dbPassword: string
}

export type ModelDef<TModel> = S.Model<S.Instance<TModel>, TModel>

export interface ModelConf<TModel> {
  modelName: string
  modelAttibutes: S.DefineModelAttributes<TModel>
}
