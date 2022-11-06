import { createAction } from "@reduxjs/toolkit";
import { tTransaction } from "../types/transactions";

export const setTransactions = createAction<tTransaction[]>(
  "transactions/setTransactions"
);
export const setActivePage = createAction<number>("transactions/setActivePage");
export const setTotal = createAction<number | undefined>(
  "transactions/setTotal"
);
export const setBeneficiaryFilter = createAction<string>("transactions/setBeneficiaryFilter")

