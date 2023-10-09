import { Select, Space, Tag } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ChainStateEnum,
  NetworkStateEnum,
  chainState,
  networkState,
} from "../../../state";
import {NETWORK_OPTIONS, MAINNET_SIDECHAIN_OPTIONS, TESTNET_SIDECHAIN_OPTIONS} from '../constants';
import { explorerUrlState } from "../../../state/selector";
import useStyles from '../style';

function NetworkSelection() {
  const classes = useStyles;
  const [network, setNetwork] = useRecoilState(networkState);
  const [chain, setChain] = useRecoilState(chainState);
  const explorerUrl = useRecoilValue(explorerUrlState);

  return (
    <div style={classes.leftContainer}>
      <Tag color="#2db7f5">
        <a href={explorerUrl} target="_blank">
          {explorerUrl}
        </a>
      </Tag>
      <Space>
        <Select
          options={NETWORK_OPTIONS}
          value={network}
          onChange={(e) => {
            setNetwork(e);
            setChain(ChainStateEnum.AELF);
          }}
        />
        <Select
          options={[{ value: ChainStateEnum.AELF, label: "AELF" }].concat(
            network === NetworkStateEnum.mainnet
              ? MAINNET_SIDECHAIN_OPTIONS
              : TESTNET_SIDECHAIN_OPTIONS
          )}
          value={chain}
          onChange={(e) => {
            setChain(e);
          }}
        />
      </Space>
    </div>
  );
}

export default NetworkSelection;
