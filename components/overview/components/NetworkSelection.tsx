import Image from 'next/image';
import { Select, Space } from "antd";
import { useRecoilState } from "recoil";
import globeImage from '../../../assets/icon/globe.svg';
import {
  ChainStateEnum,
  NetworkStateEnum,
  chainState,
  networkState,
} from "../../../state";
import {NETWORK_OPTIONS, MAINNET_SIDECHAIN_OPTIONS, TESTNET_SIDECHAIN_OPTIONS} from '../constants';
import useStyles from '../style';

function NetworkSelection() {
  const classes = useStyles;
  const [network, setNetwork] = useRecoilState(networkState);
  const [chain, setChain] = useRecoilState(chainState);

  return (
    <div style={classes.networkLayout}>
      <Space>
        <Select
          style={classes.selectField}
          options={[{ value: ChainStateEnum.AELF, label: "MainChain AELF" }].concat(
            network === NetworkStateEnum.mainnet
              ? MAINNET_SIDECHAIN_OPTIONS
              : TESTNET_SIDECHAIN_OPTIONS
          )}
          value={chain}
          onChange={(e) => {
            setChain(e);
          }}
        />
        <div style={classes.selectFieldIconWrapper} className='select-field-icon-wrapper'>
          <div style={classes.selectFieldIconCover}>
            <Image src={globeImage} alt="Wallet" style={classes.selectFieldIcon}/>
          </div>
          <Select
            style={{...classes.selectField, ...classes.SelectFieldWithIcon}}
            className='hidden-selected-value'
            options={NETWORK_OPTIONS}
            value={network}
            onChange={(e) => {
              setNetwork(e);
              setChain(ChainStateEnum.AELF);
            }}
            dropdownStyle={{width: '130px'}}
          />
        </div>
      </Space>
    </div>
  );
}

export default NetworkSelection;
