import { useRecoilValue } from "recoil";
import { useState} from 'react';
import { Button, Typography, Space } from "antd";
import Transport from "@ledgerhq/hw-transport";
import { useBalance } from "@/hooks/useBalance";
import AppAelf from "@/utils/Elf";
import { explorerUrlState } from "@/state/selector";
import PaperLayout from '@/components/common/paperLayout';
import CopyToClipboard from '@/components/common/copyToClipboard';
import AddressVerification from '@/components/transactions/components/AddressVerification';
import Details from '@/components/common/details';
import useSnackbar from '@/utils/snackbar';
import {formatNumber} from '@/utils';
import {HD_DERIVATION_PATH, ERROR_CODE} from "@/constants";;
import styles from './style.module.css';

interface OverviewProps {
  chain: string;
  address: string;
  transport: Transport;
  setError: () => void;
};

function Overview({
  chain,
  address,
  transport,
  setError,
}: OverviewProps) {
  
  const [state, setState] = useState({
    publicKey: "",
    verifying: false
  });
  const setSnackbar = useSnackbar();
  const explorerUrl = useRecoilValue(explorerUrlState);
  const { data: balance } = useBalance();

  const fetchAddress = async (verify = false) => {
    setState({...state, verifying: !!verify});
    try {
      const aelf = new AppAelf(transport);
      const path = HD_DERIVATION_PATH; // HD derivation path
      const { publicKey } = await aelf.getAddress(path, verify);
      setState({ ...state, publicKey });
      if (verify) {
        // in this case, user has verfied the address successfully
        setSnackbar.success("Address verified successfully.");
      }
    } catch (error) {
      if (error instanceof Error && error.name == ERROR_CODE.DEVICE_LOCKED) {
        setError();
        return;
      }
      if (verify) {
        // in this case, user has rejected the verification
        setSnackbar.error("Rejected the address verification."); 
        return;
      }
      setSnackbar.error("Something went wrong. Please try again later.");
      return null;
    } finally {
      setState({...state, verifying: false });
    }
  };

  return (
    <PaperLayout 
      title='Account Balance'
      subtitle={<Button type="link" href={`${explorerUrl}/address/ELF_${address}_AELF#txns`} target="_blank" className={styles.btnNoSpacing}>View All Txns</Button>}>
      <Space className={styles.spaceIndent}>
        <Typography.Text className={styles.balanceValue}>{formatNumber(balance)}</Typography.Text>
        <Typography.Text className={styles.balanceLabel}>ELF</Typography.Text>
      </Space>
      <div className={styles.accountLayout}>
        <AddressVerification
          verifying={state.verifying}
          triggerVerification={() => fetchAddress(true)}
        />
        <div className={styles.detailsContainer}>
          <Details label='Address' value={<>ELF_{address}_{chain}&nbsp;&nbsp;
            <CopyToClipboard message={`ELF_${address}_${chain}`}/>
          </>}/>
        </div>
      </div>
    </PaperLayout>
  );
}

export default Overview;