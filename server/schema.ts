import { gql } from 'apollo-server'

import { HollowCtrlr } from 'controllers/HollowCtrlr'
import { HollowModel } from 'models/Hollow'

// The GraphQL schema
export const typeDefs = gql`
  type Query {
    hollows: [Hollow]
  }

  type Hollow {
    payload: String
  }

  type Mutation {
    updateHollowList(hollow: String): Hollow
  }
`
// init database
const hollowCtrlr = new HollowCtrlr()

export const resolvers = {
  Query: {
    hollows: () => {
      return hollowCtrlr.getConn
        .getTable(HollowModel.modelName)
        .findAll({ limit: 5 })
    },
  },
  Mutation: {
    updateHollowList: (_: any, { hollow }: { hollow: string }) => {
      const hollowTbl = hollowCtrlr.getConn.getTable(HollowModel.modelName)
      return hollowTbl.create({ payload: hollow })
    },
  },
}
