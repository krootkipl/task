import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useAppSelector } from "../../hooks";
import {
  changeActivePage,
  getTransactions,
  removeTransaction,
} from "../../features/transactions";
import { parseDate } from "../../utils/helpers";
import styles from "./Table.module.scss";

const Navbar = () => {
  const { transactions, activePage, total, beneficiaryFilter } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    getTransactions(1, beneficiaryFilter);
  }, [beneficiaryFilter]);

  const paginationHandler = (page: number) => {
    changeActivePage(page, beneficiaryFilter);
  };

  const getColumns = () => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Beneficiary",
        dataIndex: "beneficiary",
        key: "beneficiary",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Account",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (_: any, record: any) => {
          return (
            <Button
              type={"primary"}
              danger={true}
              onClick={() => {
                removeTransaction(record.id);
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ];
  };

  const getData = () => {
    return transactions.map(
      (
        { id, beneficiary, description, amount, account, date, address },
        index: number
      ) => {
        return {
          key: `transaction-${id}-${index}`,
          id,
          beneficiary,
          description,
          amount,
          account,
          date: parseDate(date),
          address,
        };
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <Table
        className={styles.table}
        dataSource={getData()}
        columns={getColumns()}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          pageSize: 20,
          total,
          current: activePage,
          onChange: paginationHandler,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default Navbar;
