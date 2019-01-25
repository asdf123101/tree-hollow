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
      const hollowTbl = hollowCtrlr.getConn.getTable(HollowModel.modelName)
      const tagTbl = hollowCtrlr.getConn.getTable(TagModel.modelName)
      const tagsInstList = await Promise.all(
        tags.map(async tag => {
          const [tagInst] = await tagTbl.findOrCreate({
            where: tag as WhereOptions<TagInput>,
          })
          return tagInst
        })
      )
      // TODO: check tag existence
      const hollowInst = (await hollowTbl.create(hollow)) as HollowInstance
      hollowInst.setTags(tagsInstList)
      return {
        id: hollowInst.id,
        payload: hollowInst.payload,
        tags: tagsInstList,
      }
    },
  },
}
