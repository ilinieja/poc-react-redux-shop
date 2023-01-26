import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Rule } from "../shared/checkout/interfaces/rule.interface";

export const rulesAdapter = createEntityAdapter<Rule>();

export const rulesSlice = createSlice({
  name: "rules",
  initialState: rulesAdapter.getInitialState(),
  reducers: {
    ruleAdded: rulesAdapter.addOne,
    ruleRemoved: rulesAdapter.removeOne,
    rulesReceived(state, action) {
      rulesAdapter.setAll(state, action.payload.rules);
    },
  },
});
