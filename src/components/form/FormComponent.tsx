import React, { useState } from "react";
import { Button, Input, InputNumber } from "antd";
import { InputStatus } from "antd/lib/_util/statusUtils";
import styles from "./Form.module.scss";
import { toast } from "react-toastify";
import { postTransaction } from "../../services/transactions";
import { getTransactions } from '../../features/transactions';
import { useAppSelector } from '../../hooks';

const FormComponent = () => {
  const { activePage, beneficiaryFilter } = useAppSelector((state) => state.transactions);

  const [account, setAccount] = useState<{
    value: string;
    validateStatus: InputStatus;
  }>({ value: '', validateStatus: "" });

  const [amount, setAmount] = useState<{
    value: number;
    validateStatus: InputStatus;
  }>({ value: 0, validateStatus: "" });

  const [address, setAddress] = useState<{
    value: string;
    validateStatus: InputStatus;
  }>({ value: "", validateStatus: "" });

  const [description, setDescription] = useState<{
    value: string;
    validateStatus: InputStatus;
  }>({ value: "", validateStatus: "" });

  const validateInputs = () => {
    let validationCorrect = true;
    setAccount({ ...account, validateStatus: "" });
    setAmount({ ...amount, validateStatus: "" });
    setAddress({ ...address, validateStatus: "" });
    setDescription({ ...address, validateStatus: "" });

    if (isNaN(Number(account.value)) || Number(account.value) <= 0 || account.value.length !== 26) {
      setAccount({ ...account, validateStatus: "error" });
      toast.error("Input correct account number!");
      validationCorrect = false;
    }

    if (amount.value <= 0) {
      setAmount({ ...amount, validateStatus: "error" });
      toast.error("Transaction amount cannot be 0 or lower!");
      validationCorrect = false;
    }

    if (!address.value.length) {
      setAddress({ ...address, validateStatus: "error" });
      toast.error("Input correct address!");
      validationCorrect = false;
    }

    if (!description.value.length) {
      setDescription({ ...description, validateStatus: "error" });
      toast.error("Input correct description!");
      validationCorrect = false;
    }

    return validationCorrect;
  };

  const submit = async () => {
    const validationCorrect = validateInputs();

    if (validationCorrect) {
      const { status } = await postTransaction(
        amount.value,
        account.value,
        address.value,
        description.value
      );

      if (status < 200 || status >=300) {
        toast.error("Something went wrong, please try again");
      } else {
        toast.success("Transaction completed!");
        setAccount({ ...account, value: "" });
        setAmount({ ...amount, value: 0 });
        setAddress({ ...address, value: "" });
        setDescription({ ...description, value: "" });
        getTransactions(activePage, beneficiaryFilter);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        addonBefore={"Account number"}
        value={account.value}
        onChange={(e) => {
          setAccount({ ...account, value: e.target.value });
        }}
        style={{ width: 500 }}
        status={account.validateStatus}
      />
      <InputNumber
        addonBefore={"Amount"}
        min={0}
        value={amount.value}
        max={10000000000}
        onChange={(e) => {
          setAmount({ ...amount, value: e ?? 0 });
        }}
        style={{ width: 250 }}
        status={amount.validateStatus}
      />
      <Input
        addonBefore={"Address"}
        value={address.value}
        status={address.validateStatus}
        onChange={(e) => {
          setAddress({ ...address, value: e.target.value });
        }}
        style={{ width: 500 }}
      />
      <Input
        addonBefore={"Description"}
        value={description.value}
        status={description.validateStatus}
        onChange={(e) => {
          setDescription({ ...description, value: e.target.value });
        }}
        style={{ width: 500 }}
      />
      <Button type={"primary"} onClick={submit}>
        Send transaction
      </Button>
    </div>
  );
};

export default FormComponent;
