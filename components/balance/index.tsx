import { useRecoilValue } from "recoil";
import { Button, Statistic, Col, Row, Card } from "antd";
import { useBalance } from "../../hooks/useBalance";
import { addressState } from "../../state";
import { explorerUrlState } from "../../state/selector";
import NetworkSelection from "./components/NetworkSelection";

function Balance() {
  const explorerUrl = useRecoilValue(explorerUrlState);
  const address = useRecoilValue(addressState);
  const { data: balance } = useBalance();

  return (
    <Card>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Account Balance (ELF)"
            value={balance}
            precision={2}
            suffix={
              <Button
                type="link"
                href={`${explorerUrl}/address/ELF_${address}_AELF#txns`}
                target="_blank"
                style={{marginLeft: '-12px'}}
              >
                view all transactions
              </Button>
            }
          />
        </Col>
        <Col span={12}>
            <NetworkSelection />
        </Col>
      </Row>
    </Card>
  );
}

export default Balance;