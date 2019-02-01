/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AddHollowInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddHollow
// ====================================================

export interface AddHollow_addHollow_tags {
  __typename: "Tag";
  name: string;
}

export interface AddHollow_addHollow {
  __typename: "Hollow";
  payload: string;
  tags: AddHollow_addHollow_tags[] | null;
}

export interface AddHollow {
  addHollow: AddHollow_addHollow;
}

export interface AddHollowVariables {
  hollow: AddHollowInput;
}
