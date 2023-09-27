import useSWR from "swr";
import useExplorerUrl from "./useExplorerUrl";
import { Button, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState } from "react";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { middleEllipsis } from "./utils";
import { List } from "../app/transactions/route";
import { SwapOutlined } from "@ant-design/icons";

export const AllTransactions = ({ address }: { address: string }) => {
  const explorerUrl = useExplorerUrl();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });
  const [showDate, setShowDate] = useState(false);
  const { data, isValidating, mutate } = useSWR(
    [explorerUrl, address, pagination, "all-tx"],
    async ([explorerUrl, address, pagination]) => {
      const res = await fetch(
        `/transactions?address=${address}&explorerUrl=${explorerUrl}&page=${pagination.current}&limit=${pagination.pageSize}`
      );

      const { data } = (await res.json()) as {
        data: {
          total: number;
          list: List[];
        };
      };

      setPagination((pagination) => ({ ...pagination, total: data.total }));

      return data;
    }
  );

  const columns: ColumnsType<List> = [
    {
      title: "Txn Hash",
      dataIndex: "txId",
      key: "txId",
      render: (text) => (
        <a href={`${explorerUrl}/tx/${text}`} target="_blank">
          {middleEllipsis(text)}
        </a>
      ),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: () => (
        <span onClick={() => setShowDate((show) => !show)}>
          {showDate ? "Date Time" : "Age"} <SwapOutlined />
        </span>
      ),
      dataIndex: "time",
      key: "time",
      render: (timestamp) => (
        <span>
          {showDate
            ? format(parseISO(timestamp), "yyyy-LL-dd kk:mm:ss")
            : formatDistanceToNow(parseISO(timestamp), {
                addSuffix: true,
              })}
        </span>
      ),
    },
    {
      title: "From",
      dataIndex: "addressFrom",
      key: "addressFrom",
      render: (text, record) => (
        <span>
          {middleEllipsis(`${record.symbol}_${text}_${record.relatedChainId}`)}
        </span>
      ),
    },
    {
      title: "Sent to",
      dataIndex: "addressTo",
      key: "addressTo",
      render: (text, record) => (
        <span>
          {middleEllipsis(`${record.symbol}_${text}_${record.relatedChainId}`)}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          setPagination((pagination) => ({ ...pagination, current: 1 }));
          mutate();
        }}
      >
        Refresh
      </Button>
      <Table
        columns={columns}
        dataSource={data?.list}
        rowKey={(record) => record.txId}
        pagination={pagination}
        loading={isValidating}
        onChange={(pagination) => setPagination(pagination)}
        size="middle"
      />
    </>
  );
};
