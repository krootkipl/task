import { ApiTransactionsService } from "./api/transactions";
import { tTransaction } from "../types/transactions";
import { AxiosResponse } from "axios";

export const fetchTransactions = async (
  page: number,
  beneficiaryFilter?: string
): Promise<{ transactions: tTransaction[]; total?: number }> => {
  return await ApiTransactionsService.getTransactions({
    page,
    beneficiaryFilter,
  }).then(({ data, headers }) => {
    return {
      transactions: data,
      // In normal conditions I would probably receive that kind of field from backend, but hey, it works :D
      total: Number(headers["x-total-count"]),
    };
  });
};

export const postTransaction = async (
  amount: number,
  account: string,
  address: string,
  description: string
): Promise<AxiosResponse<tTransaction>> => {
  return await ApiTransactionsService.postTransaction({
    account,
    address,
    amount,
    description,
  }).then((r) => r);
};

export const deleteTransaction = async (id: number) => {
  return await ApiTransactionsService.deleteTransaction(id);
};
