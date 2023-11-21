import clsx from 'clsx';
import Image from 'next/image';
import { Select, Space } from "antd";
import { useRecoilState } from "recoil";
import globeImage from '@/assets/icon/globe.svg';
import {
  ChainStateEnum,
  NetworkStateEnum,
  chainState,
  networkState,
} from "@/state";
import {NETWORK_OPTIONS, MAINNET_SIDECHAIN_OPTIONS, TESTNET_SIDECHAIN_OPTIONS} from '../constants';
import styles from '../style.module.css';

function NetworkSelection() {
  const [network, setNetwork] = useRecoilState(networkState);
  const [chain, setChain] = useRecoilState(chainState);

  return (
    <div className={styles.networkLayout}>
      <Space>
        <Select
          className={styles.selectField}
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
        <div className={clsx(styles.selectFieldIconWrapper, 'select-field-icon-wrapper')}>
          <div className={styles.selectFieldIconCover}>
            <Image src={globeImage} alt="Wallet" className={styles.selectFieldIcon}/>
          </div>
          <Select
            className={clsx(styles.selectField, styles.selectFieldWithIcon, 'hidden-selected-value')}
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
