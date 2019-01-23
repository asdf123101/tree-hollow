/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHollows
// ====================================================

export interface GetHollows_hollows_tags {
  __typename: "Tag";
  name: string;
}

export interface GetHollows_hollows {
  __typename: "Hollow";
  payload: string;
  tags: (GetHollows_hollows_tags | null)[];
}

export interface GetHollows {
  hollows: GetHollows_hollows[];
}
