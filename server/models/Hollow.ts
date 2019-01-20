import * as S from 'sequelize'

import { ModelConf } from 'controllers/types'
import { TagType } from './Tags'

export interface HollowType {
  payload: string
  // only for dev, these fields are added automatically
  createdAt?: Date
  updatedAt?: Date
}

const Hollow: S.DefineModelAttributes<HollowType> = {
  payload: { type: S.TEXT, allowNull: false },
  createdAt: S.DATE,
  updatedAt: S.DATE,
}

export const HollowModel: ModelConf<HollowType> = {
  modelName: 'Hollow',
  modelAttributes: Hollow,
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
