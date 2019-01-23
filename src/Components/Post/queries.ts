import gql from 'graphql-tag'
export const UPDATE_HOLLOW_LIST = gql`
  mutation UpdateHollowList($hollow: String!) {
    updateHollowList(hollow: $hollow) {
      payload
    }
  }
`
