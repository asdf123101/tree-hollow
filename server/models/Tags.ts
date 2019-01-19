import * as S from 'sequelize'

import { ModelConf } from 'controllers/types'

interface TagType {
  name: string
  weight: number
}

const Tag: S.DefineModelAttributes<TagType> = {
  name: { type: S.STRING, allowNull: false, unique: true },
  weight: { type: S.INTEGER, allowNull: false, defaultValue: 0 },
}

export const TagModel: ModelConf<TagType> = {
  modelName: 'Tag',
  modelAttributes: Tag,
}
