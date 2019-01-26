import { gql } from 'apollo-server'

import { HollowCtrlr } from 'controllers/HollowCtrlr'
import { HollowModel } from 'models/Hollow'
import { TagModel } from 'models/Tags'
import { WhereOptions } from 'sequelize'
import { AddHollowInput, TagInput } from '../types/client/gql/globalTypes'
import { HollowInstance } from '../types/server'

// The GraphQL schema
export const typeDefs = gql`
  type Hollow {
    id: ID!
    payload: String!
    tags: [Tag!]
  }

  type Tag {
    id: ID!
    name: String!
    weight: Int!
  }

  input AddHollowInput {
    hollow: HollowInput
    tags: [TagInput!]
  }

  input HollowInput {
    payload: String!
  }

  input TagInput {
    name: String
  }

  type Query {
    hollows: [Hollow!]!
    tags: [Tag!]!
  }

  type Mutation {
    addHollow(newHollow: AddHollowInput): Hollow!
  }
`
// init database
const hollowCtrlr = new HollowCtrlr()

export const resolvers = {
  Query: {
    hollows: async () =>
      await hollowCtrlr.getConn.getTable(HollowModel.modelName).findAll({
        limit: 10,
        include: [hollowCtrlr.getConn.getTable(TagModel.modelName)],
      }),
    tags: async () =>
      await hollowCtrlr.getConn.getTable(TagModel.modelName).findAll(),
  },
  Mutation: {
    addHollow: async (_: any, { newHollow }: { newHollow: AddHollowInput }) => {
      const { hollow, tags } = newHollow
      const tagLen = tags.length
      // limit number of tags
      if (tagLen > 5) {
        throw Error('Too many tags!')
      }
      const hollowTbl = hollowCtrlr.getConn.getTable(HollowModel.modelName)
      const tagTbl = hollowCtrlr.getConn.getTable(TagModel.modelName)
      const { count, rows: tagInstList } = await tagTbl.findAndCountAll({
        where: { name: tags.map(tag => tag.name) },
      })
      // verify tag existence
      if (count !== tagLen) {
        throw Error('Requested tag does not exist!')
      }
      const hollowInst = (await hollowTbl.create(hollow)) as HollowInstance
      hollowInst.setTags(tagInstList)
      return {
        id: hollowInst.id,
        payload: hollowInst.payload,
        tags: tagInstList,
      }
    },
  },
}
