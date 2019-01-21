import * as S from 'sequelize'

import { HollowType, ModelConf } from 'types/server'

const Hollow: S.DefineModelAttributes<HollowType> = {
  payload: { type: S.TEXT, allowNull: false },
  createdAt: S.DATE,
  updatedAt: S.DATE,
}

export const HollowModel: ModelConf<HollowType> = {
  modelName: 'Hollow',
  modelAttributes: Hollow,
}
