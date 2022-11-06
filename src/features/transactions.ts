import { fetchTransactions, deleteTransaction } from "../services/transactions";
import {
  setTransactions,
  setActivePage,
  setTotal,
} from "../actions/transactions";
import { store } from "../store";

export const getTransactions = async (
  page: number,
  beneficiaryFilter?: string
) => {
  const { transactions, total } = await fetchTransactions(
    page,
    beneficiaryFilter
  );
  store.dispatch(setTransactions(transactions));
  store.dispatch(setTotal(total));
};

export const changeActivePage = async (
  page: number,
  beneficiaryFilter?: string
) => {
  store.dispatch(setActivePage(page));
  getTransactions(page, beneficiaryFilter);
};

export const removeTransaction = async (id: number) => {
  await deleteTransaction(id);
  const { activePage, beneficiaryFilter } = store.getState().transactions;
  getTransactions(activePage, beneficiaryFilter);
};
