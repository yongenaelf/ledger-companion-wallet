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
import styles from '../style';

function NetworkSelection() {
  const [network, setNetwork] = useRecoilState(networkState);
  const [chain, setChain] = useRecoilState(chainState);

  return (
    <div style={styles.networkLayout}>
      <Space>
        <Select
          style={styles.selectField}
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
        <div style={styles.selectFieldIconWrapper} className='select-field-icon-wrapper'>
          <div style={styles.selectFieldIconCover}>
            <Image src={globeImage} alt="Wallet" style={styles.selectFieldIcon}/>
          </div>
          <Select
            style={{...styles.selectField, ...styles.SelectFieldWithIcon}}
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
