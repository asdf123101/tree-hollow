import gql from 'graphql-tag'

export const GET_HOLLOWS = gql`
  query GetHollows {
    hollows {
      payload
      tags {
        name
      }
    }
  }
`
