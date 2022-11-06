import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { tTransaction } from "../types/transactions";

interface TransactionsState {
  transactions: tTransaction[];
  activePage: number;
  total: number;
  beneficiaryFilter: string
}

const initialState: TransactionsState = {
  transactions: [],
  activePage: 1,
  total: 0,
  beneficiaryFilter: ''
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<tTransaction[]>) => {
      state.transactions = action.payload;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setTotal: (state, action: PayloadAction<number | undefined>) => {
      state.total = action.payload ?? 0;
    },
    setBeneficiaryFilter: (state, action: PayloadAction<string>) => {
      state.beneficiaryFilter = action.payload
    }
  },
});

export const { setTransactions, setActivePage, setTotal } = transactionsSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export default transactionsSlice.reducer;
