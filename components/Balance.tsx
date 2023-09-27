import React from "react";
import BigNumber from "bignumber.js";
import { useMultiTokenContract } from "./useMultiTokenContract";
import { Button, Statistic, Col, Row } from "antd";
import useSWR from "swr";
import useExplorerUrl from "./useExplorerUrl";

interface IBalanceProps {
  address?: string;
}
export function Balance({ address }: IBalanceProps) {
  const { data } = useMultiTokenContract();
  const explorerUrl = useExplorerUrl();

  const { data: balance } = useSWR(
    [data, "balance"],
    async () => {
      if (!address) throw new Error("No address!");
      if (!data) return;

      const result = await data.multiTokenContract.GetBalance.call({
        symbol: "ELF",
        owner: address,
      });

      const balance = new BigNumber(result?.balance)
        .dividedBy(10 ** 8)
        .toFixed(4);

      return balance;
    },
    {
      fallbackData: "-",
      refreshInterval: 2000,
    }
  );

  return (
    <Row gutter={16}>
      <Col>
        <Statistic
          title="Account Balance (ELF)"
          value={balance}
          precision={2}
        />
      </Col>
      <Col>
        <Button
          type="primary"
          href={`${explorerUrl}/address/ELF_${address}_AELF#txns`}
          target="_blank"
        >
          View all transactions
        </Button>
      </Col>
    </Row>
  );
}
