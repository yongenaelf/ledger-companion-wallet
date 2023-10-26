import { useRecoilValue } from "recoil";
import { useState } from 'react';
import { Button, Typography, Space } from "antd";
import Transport from "@ledgerhq/hw-transport";
import { useBalance } from "../../hooks/useBalance";
import AppAelf from "../../utils/Elf";
import { explorerUrlState } from "../../state/selector";
import PaperLayout from '../common/paperLayout';
import CopyToClipboard from '../common/copyToClipboard';
import AddressVerification from '../transactions/components/AddressVerification';
import Details from '../common/details';
import useSnackbar from '../../utils/snackbar';
import {HD_DERIVATION_PATH} from '../../utils/constants';
import useStyles from './style';

interface OverviewProps {
  chain: string;
  address: string;
  transport: Transport;
};

function Overview({
  chain,
  address,
  transport,
}: OverviewProps) {
  const classes = useStyles;
  
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
      subtitle={<Button type="link" href={`${explorerUrl}/address/ELF_${address}_AELF#txns`} target="_blank" style={classes.btnNoSpacing}>View All Txns</Button>}>
      <Space style={{marginTop: '-28px'}}>
        <Typography.Text style={classes.balanceValue}>{balance}</Typography.Text>
        <Typography.Text style={classes.balanceLabel}>ELF</Typography.Text>
      </Space>
      <div style={classes.accountLayout}>
        <AddressVerification
          verifying={state.verifying}
          triggerVerification={() => fetchAddress(true)}
        />
        <div style={classes.detailsContainer}>
          <Details label='Address' value={<>ELF_{address}_{chain}&nbsp;&nbsp;
            <CopyToClipboard message={`ELF_${address}_${chain}`}/>
          </>}/>
        </div>
      </div>
    </PaperLayout>
  );
}

export default Overview;