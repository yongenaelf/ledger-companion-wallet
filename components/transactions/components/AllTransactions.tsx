import Image from 'next/image';
import { useState } from "react";
import fromExponential from 'from-exponential';
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { Table, Tooltip, Flex, Space, Tag } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { parseISO, format } from "date-fns";
import { endEllipsis, middleEllipsis } from "@/utils";
import { explorerUrlState } from "@/state/selector";
import { addressState } from "@/state";
import PaperLayout from '@/components/common/paperLayout'
import CopyToClipboard from '@/components/common/copyToClipboard'
import {MIN_TRANSACTIONS_TO_SHOW_EXPLORER_LINK} from '@/utils/constants';
import {roundNumber} from '@/utils';
import rightArrowImage from '@/assets/icon/right-arrow.svg';
import rightArrowSuccessImage from '@/assets/icon/right-arrow-success.svg';
import { getLastTwoUnits } from '../constants';
import { List } from "../../../app/transactions/route";
import styles from "../style.module.css";

const AllTransactions = () => {
  const address = useRecoilValue(addressState);
  const explorerUrl = useRecoilValue(explorerUrlState);
  
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });
  const [showDate, setShowDate] = useState(false);
  const { data, isValidating } = useSWR(
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
          {endEllipsis(text)}
        </a>
      ),
      width: 190
    },
    {
      title: "Method",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <Tag className={styles.blockTag}>{text}</Tag>
      ),
      width: 190
    },
    {
      title: () => (
        <span onClick={() => setShowDate((show) => !show)}>
          {showDate ? "Date Time" : "Age"}  <SwapOutlined className={styles.pointer}/>
        </span>
      ),
      dataIndex: "time",
      key: "time",
      render: (timestamp) => {
        try {
          return (
            <span>
              {showDate
                ? format(parseISO(timestamp), "yyyy-LL-dd kk:mm:ss")
                : getLastTwoUnits(parseISO(timestamp))}
            </span>
          );
        } catch (err) {
          return "";
        }
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text, record) => (
        <Flex flex={1}>
          <Flex flex={1}>
            <Space align='center'>
              <Tooltip color='#014795' title={`${record.symbol}_${text}_${record.relatedChainId}`}>
                <a href={`${explorerUrl}/address/${record.symbol}_${text}_${record.relatedChainId}`} target="_blank">
                  {middleEllipsis(`${record.symbol}_${text}_${record.relatedChainId}`)}
                </a>
              </Tooltip>
              <CopyToClipboard message={`${record.symbol}_${text}_${record.relatedChainId}`}/>
            </Space>
          </Flex>
          <Flex flex={1} justify='center'><Image src={rightArrowSuccessImage} alt="Copy to the clipboard"/></Flex>
        </Flex>
      ),
    },
    {
      title: "Sent to",
      dataIndex: "to",
      key: "to",
      render: (text, record) => (
        <Space align='center'><Tooltip color='#014795' title={`${record.symbol}_${text}_${record.relatedChainId}`}>
          <a href={`${explorerUrl}/address/${record.symbol}_${text}_${record.relatedChainId}`} target="_blank">
            {middleEllipsis(`${record.symbol}_${text}_${record.relatedChainId}`)}
          </a>
        </Tooltip>
        <CopyToClipboard message={`${record.symbol}_${text}_${record.relatedChainId}`}/>
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (val) => (
        fromExponential(roundNumber(val))
      ),
    },
  ];

  return (
    <PaperLayout title="All Transactions" externalClasses={styles.paperlayoutContainer}>
      <Table
        columns={columns}
        dataSource={data?.list.slice(0, 8)}
        rowKey={(record) => record.txId}
        pagination={false}
        loading={isValidating}
        onChange={(pagination) => setPagination(pagination)}
        size="middle"
      />
      {data?.list.length > MIN_TRANSACTIONS_TO_SHOW_EXPLORER_LINK && <Flex justify='center' align='center' className={styles.btnContainer}>
        <a className={styles.btn} href={`${explorerUrl}/address/ELF_${address}_AELF#tokentxns`} target="_blank">
          View all transactions on AELF Explorer
        </a>&nbsp;<Image src={rightArrowImage} alt="Copy to the clipboard"/>
      </Flex>}
    </PaperLayout>
  );
};

export default AllTransactions;