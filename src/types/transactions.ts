export type tTransaction = {
  id: number;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: Date;
  description: string;
}

export type tTransactionsAPIData = {
  transactions: tTransaction[];
}
