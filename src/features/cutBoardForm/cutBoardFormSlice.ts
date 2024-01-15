import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export type CutBoardFormState = {
  width: number;
  height: number;
  quantity: number;
};

const initialState: CutBoardFormState = {
  width: 0,
  height: 0,
  quantity: 0,
};

export const cutBoardFormSlice = createSlice({
  name: "cutBoardForm",
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<CutBoardFormState>) => {
      state = action.payload;
    },
    resetFormData: (state) => {
      state = initialState;
    },
  },
});

export const { saveFormData, resetFormData } = cutBoardFormSlice.actions;

export const selectCutBoardForm = (state: RootState) => state.cutBoardForm;

export default cutBoardFormSlice.reducer;
