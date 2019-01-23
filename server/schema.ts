import { gql } from 'apollo-server'

import { HollowCtrlr } from 'controllers/HollowCtrlr'
import { HollowModel } from 'models/Hollow'
import { TagModel } from 'models/Tags'

// The GraphQL schema
export const typeDefs = gql`
  type Query {
    hollows: [Hollow!]!
  }

  type Hollow {
    payload: String!
    tags: [Tag]!
  }

  type Tag {
    name: String!
    weight: Int!
  }

  type Mutation {
    updateHollowList(hollow: String!): Hollow!
  }
`
// init database
const hollowCtrlr = new HollowCtrlr()

export const resolvers = {
  Query: {
    hollows: () => {
      return hollowCtrlr.getConn.getTable(HollowModel.modelName).findAll({
        limit: 5,
        include: [hollowCtrlr.getConn.getTable(TagModel.modelName)],
      })
    },
  },
  Mutation: {
    updateHollowList: (_: any, { hollow }: { hollow: string }) => {
      const hollowTbl = hollowCtrlr.getConn.getTable(HollowModel.modelName)
      return hollowTbl.create({ payload: hollow })
    },
  },
}
