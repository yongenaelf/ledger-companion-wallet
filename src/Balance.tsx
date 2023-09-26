import React from "react";
import BigNumber from "bignumber.js";
import { useMultiTokenContract } from "./useMultiTokenContract";
import { Button, Statistic, Col, Row } from "antd";
import useSWR from "swr";

interface IBalanceProps {
  address?: string;
}
export function Balance({ address }: IBalanceProps) {
  const { data } = useMultiTokenContract();

  const {
    data: balance,
    isValidating,
    mutate,
  } = useSWR(
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
        <Button onClick={() => mutate()} loading={isValidating}>
          refresh
        </Button>
      </Col>
    </Row>
  );
}
