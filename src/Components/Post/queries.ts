import gql from 'graphql-tag'

export const ADD_HOLLOW = gql`
  mutation AddHollow($hollow: AddHollowInput!) {
    addHollow(newHollow: $hollow) {
      payload
      tags {
        name
      }
    }
  }
`
