/* tslint:disable */
// This file was automatically generated and should not be edited.

import { AddHollowInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateHollowList
// ====================================================

export interface UpdateHollowList_updateHollowList {
  __typename: "Hollow";
  payload: string;
}

export interface UpdateHollowList {
  updateHollowList: UpdateHollowList_updateHollowList;
}

export interface UpdateHollowListVariables {
  hollow: AddHollowInput;
}