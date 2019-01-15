import gql from 'graphql-tag'

export const GET_HOLLOWS = gql`
  {
    hollows {
      data
    }
  }
`
