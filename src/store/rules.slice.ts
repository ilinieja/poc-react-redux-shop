import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Rule } from "shared/interfaces/rule.interface";
import { MOCK_RULES } from "mock_data";

export const rulesAdapter = createEntityAdapter<Rule>({
  selectId: ({ productId }) => productId,
});

/*
 * Prepopulating rules with mock data to simplify the initial version.
 * In real-world scenario they would be received from an API on page init.
 */
const initialState = rulesAdapter.getInitialState();
const prepopulatedState = rulesAdapter.upsertMany(initialState, MOCK_RULES);

export const rulesSlice = createSlice({
  name: "rules",
  initialState: prepopulatedState,
  reducers: {
    ruleAdded: rulesAdapter.addOne,
    ruleRemoved: rulesAdapter.removeOne,
    rulesReceived(state, action) {
      rulesAdapter.setAll(state, action.payload.rules);
    },
  },
});
