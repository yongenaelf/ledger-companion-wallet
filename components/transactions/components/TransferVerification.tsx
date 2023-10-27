import { Button, Modal, Typography, Flex } from "antd";
import { useState, useEffect } from "react";
import FormField from '../../common/formField';
import { useBalance } from "../../../hooks/useBalance";
import useStyles from '../style';

interface TransferFormData {
  to: string;
  amount: string;
  memo?: string;
};

interface TransferVerificationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  data: TransferFormData;
}
const TransferVerification = ({
  isOpen,
  onConfirm,
  onCancel,
  data,
}: TransferVerificationProps) => {
  const classes = useStyles;
  const { data: balance } = useBalance();
  const [isInsufficient, setInsufficient] = useState<boolean>(false);
  const fees = 4.44444444;
  
  const getFormattedAddress = (address: string) => {
    if (!address.startsWith("ELF")) {
      address = "ELF_".concat(address);
    }
    if (!address.endsWith("AELF")) {
      address = address.concat("_AELF");
    }
    return address;
  };

  /* useEffect(() => {
    if (balance) {
      setInsufficient((4.44444444 + Number(data.amount)) > Number(balance))
    }
  }, [balance]); */
  return (
    <Modal
      open={isOpen}
      closable
      onCancel={onCancel}
      title='Transaction Summary'
      centered
      width={672}
      footer={() => (<Flex flex={1} gap={12}>
        <Flex flex={1}><Button onClick={onCancel} block>Cancel</Button></Flex>
        <Flex flex={1}><Button type="primary" onClick={onConfirm} block disabled={isInsufficient}>Confirm</Button></Flex>
      </Flex>)}
      >
        <Typography.Text type="secondary" style={classes.modalInfo}>You are about to transfer from $chain_name to $chain_name. Double-check to ensure it is correct!</Typography.Text>
        {isInsufficient && <Typography.Text style={classes.errorBlock} type='danger'>Your balance might be insufficient to cover the transaction fee.</Typography.Text>}
        <FormField label="To">{getFormattedAddress(data.to)}</FormField>
        <FormField label="Amount">{data.amount} ELF</FormField>
        <FormField label="Memo">{data.memo}</FormField>
        <FormField label="Transaction Fee">{fees} ELF</FormField>
    </Modal>
  );
};

export default TransferVerification;
