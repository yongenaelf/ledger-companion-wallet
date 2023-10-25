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
    error: null,
    publicKey: "",
    verifying: false
  });
  const explorerUrl = useRecoilValue(explorerUrlState);
  const { data: balance } = useBalance();

  const fetchAddress = async (verify = false) => {
    setState({...state, verifying: !!verify});
    try {
      const aelf = new AppAelf(transport);
      const path = "m/44'/1616'/0'/0/0"; // HD derivation path
      const { publicKey, address } = await aelf.getAddress(path, verify);
      this.props.setAddress(address);
      setState({ ...state, publicKey, error: null });
    } catch (error) {
      if (verify) {
        // in this case, user has rejected the verification

        setState({...state, error: "Rejected the address verification." });
        return;
      }

      // in this case, user is likely not on AElf app
      console.warn(
        `A problem occurred, make sure to open the AElf application on your Ledger. Failed: ${error.message}`
      );
      setState({...state, error });
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
        <Details label='Account' value='Account 1'/>
        <Details label='Address' value={<>ELF_${address}_${chain}&nbsp;&nbsp;
        <CopyToClipboard message={`ELF_${address}_${chain}`}/>
        </>}/>
      </div>
    </PaperLayout>
  );
}

export default Overview;