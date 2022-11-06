import React from "react";
import { Input } from "antd";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setBeneficiaryFilter } from "../../actions/transactions";

const Filter = () => {
  const dispatch = useAppDispatch();
  const { beneficiaryFilter } = useAppSelector((state) => state.transactions);

  const handler = (filter: string) => {
    dispatch(setBeneficiaryFilter(filter));
  };

  return (
    <Input
      value={beneficiaryFilter}
      onChange={(e) => {
        handler(e.target.value);
      }}
      placeholder="Beneficiary"
    />
  );
};

export default Filter;
