import * as S from 'sequelize'

///////////////
// DB config //
///////////////
export interface DbConOpt extends S.Options {
  dbName: string
  dbUserName: string
  dbPassword: string
  options?: S.Options
}

/////////////////
// model types //
/////////////////
export type ModelDef<TModel> = S.Model<S.Instance<TModel>, TModel>

export interface ModelConf<TModel> {
  modelName: string
  modelAttributes: S.DefineModelAttributes<TModel>
}

export interface TagType {
  name: string
  weight?: number
}

export interface HollowType {
  payload: string
  // only for dev, these fields are added automatically
  createdAt?: Date
  updatedAt?: Date
}

export interface HollowInstance
  extends S.Instance<HollowType>,
    S.DefineModelAttributes<HollowType> {
  setTags: S.BelongsToManySetAssociationsMixin<
    S.Instance<TagType>,
    string,
    S.DefineModelAttributes<any>
  >
}
