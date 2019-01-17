import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { resolvers, typeDefs } from './schema'

const app = express()
const server = new ApolloServer({
  // These will be defined for both new or existing severs
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }) => ({
    req,
  }),
})
server.applyMiddleware({ app })

const port = 3001
const host = 'localhost'

app.listen(port, host, (err: any) => {
  if (err) {
    console.error(err)
  }
  console.log('Listening on ' + port)
})
