import { API_URL } from "../../utils/consts";
import axios, { AxiosResponse } from "axios";
import { tTransaction } from "../../types/transactions";

interface GetRequestParams {
  page: number;
  beneficiaryFilter?: string;
}

interface PostRequestParams {
  amount: number;
  account: string;
  address: string;
  description: string;
}

export class ApiTransactionsService {
  static async getTransactions(
    requestParams: GetRequestParams
  ): Promise<AxiosResponse<tTransaction[]>> {
    const { beneficiaryFilter, page } = requestParams;
    let response: unknown;

    try {
      response = await axios.get<tTransaction[]>(API_URL, {
        params: {
          _page: page,
          _limit: 20,
          beneficiary_like: beneficiaryFilter?.length
            ? beneficiaryFilter
            : undefined,
        },
      });
    } catch (e) {
      console.error(e);
    }

    return response as AxiosResponse<tTransaction[]>;
  }

  static async postTransaction(
    requestParams: PostRequestParams
  ): Promise<AxiosResponse<tTransaction>> {
    const { amount, address, account, description } = requestParams;
    let response: unknown;

    try {
      response = await axios.post<tTransaction>(API_URL, {
        amount,
        account,
        address,
        date: new Date().toISOString(),
        description,
        // Beneficiary input was not specified in README, so I added mock
        beneficiary: "Jan Kowalski",
      });
    } catch (e) {
      console.error(e);
    }

    return response as AxiosResponse<tTransaction>;
  }

  static async deleteTransaction(id: number): Promise<AxiosResponse<{}>> {
    let response: unknown;
    try {
      response = await axios.delete<tTransaction>(`${API_URL}/${id}`);
    } catch (e) {
      console.error(e);
    }

    return response as AxiosResponse<{}>;
  }
}
