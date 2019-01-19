import * as S from 'sequelize'

import { ModelConf } from 'controllers/types'

interface HollowType {
  payload: string
  // only for dev, these fields are added automatically
  createdAt: Date
  updatedAt: Date
}

const Hollow: S.DefineModelAttributes<HollowType> = {
  payload: { type: S.STRING, allowNull: false },
  createdAt: S.DATE,
  updatedAt: S.DATE,
}

export const HollowModel: ModelConf<HollowType> = {
  modelName: 'Hollow',
  modelAttributes: Hollow,
}
