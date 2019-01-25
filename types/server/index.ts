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

interface defaultModelFields {
  // these fields are added automatically by Sequelize
  createdAt?: Date
  updatedAt?: Date
  id?: string
}

export interface TagType extends defaultModelFields {
  name: string
  weight?: number
}

export interface HollowType extends defaultModelFields {
  payload: string
}

export interface HollowInstance
  extends S.Instance<HollowType>,
    S.DefineModelAttributes<HollowType> {
  setTags: S.BelongsToManySetAssociationsMixin<
    S.Instance<TagType>,
    string,
    S.DefineModelAttributes<any>
  >
  getTags: S.BelongsToGetAssociationMixin<S.Instance<TagType>>
}

export interface TagInstance
  extends S.Instance<TagType>,
    S.DefineModelAttributes<TagType> {}
