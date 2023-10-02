import React from "react";
import { Button, Statistic, Col, Row } from "antd";
import { useBalance } from "../hooks/useBalance";
import { useRecoilValue } from "recoil";
import { addressState } from "../state";
import { explorerUrlState } from "../state/selector";

export function Balance() {
  const explorerUrl = useRecoilValue(explorerUrlState);
  const address = useRecoilValue(addressState);
  const { data: balance } = useBalance();

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
