import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";

import cutBoardFormReducer from "../features/cutBoardForm/cutBoardFormSlice";
import detailsDataTableReducer from "../features/detailsDataTable/detailsDataTableSlice";

export const store = configureStore({
  reducer: {
    cutBoardForm: cutBoardFormReducer,
    detailsDataTable: detailsDataTableReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
  
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }
  
    return middlewares;
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
