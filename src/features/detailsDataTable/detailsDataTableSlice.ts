import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CutBoardFormState } from "../cutBoardForm/cutBoardFormSlice";
import generateId from "../../utils/generateId";

export type DetailsDataTableState = CutBoardFormState & { id: string };

const initialState: DetailsDataTableState[] =
  localStorage.getItem("details") !== null
    ? JSON.parse(localStorage.getItem("details")!)
    : [];

export const detailsDataTableSlice = createSlice({
  name: "detailsDataTable",
  initialState,
  reducers: {
    addNewDetailData: (state, action: PayloadAction<CutBoardFormState>) => {
      state.push({
        id: generateId(),
        ...action.payload,
      });

      localStorage.setItem("details", JSON.stringify(state));
    },
    deleteDetailFromTable: (state, action: PayloadAction<string>) => {
      const newState = state.filter((detail) => detail.id !== action.payload);
      localStorage.setItem("details", JSON.stringify(newState));

      return newState;
    },
    editDetailFromTable: (
      state,
      action: PayloadAction<DetailsDataTableState>
    ) => {
      const { id } = action.payload;

      const editableDetailIndex = state.findIndex((detail) => detail.id === id);

      state[editableDetailIndex] = {
        ...state[editableDetailIndex],
        ...action.payload,
      };

      localStorage.setItem("details", JSON.stringify(state));
    },
  },
});

export const { addNewDetailData, deleteDetailFromTable, editDetailFromTable } =
  detailsDataTableSlice.actions;

export const selectDetailsDataTable = (state: RootState) =>
  state.detailsDataTable;

export default detailsDataTableSlice.reducer;
