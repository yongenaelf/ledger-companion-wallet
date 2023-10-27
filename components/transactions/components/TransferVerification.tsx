import { Button, Modal, Typography, Flex } from "antd";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import FormField from '../../common/formField';
import { chainState, ChainStateEnum } from "../../../state";
import { useBalance } from "../../../hooks/useBalance";
import {CHAIN_OPTIONS} from '../constants';
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
  const chain = useRecoilValue(chainState);
  const fees = 4.44444444;
  const getFormattedAddress = (address: string) => {
    if (!address.startsWith("ELF_")) {
      address = "ELF_".concat(address);
    }

    if (!address.endsWith(`_${ChainStateEnum.AELF}`) && !address.endsWith(`_${ChainStateEnum.tDVW}`)) {
      address = address.concat(`_${chain}`);
    }
    return address;
  };

  const getToChain = (formattedAddress: string) => {
    if (formattedAddress.endsWith(`_${ChainStateEnum.AELF}`)) {
      return CHAIN_OPTIONS[ChainStateEnum.AELF];
    } else if (formattedAddress.endsWith(`_${ChainStateEnum.tDVW}`)) {
      return CHAIN_OPTIONS[ChainStateEnum.tDVW];
    } 
  }

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
        {!getFormattedAddress(data.to).endsWith(chain) && <Typography.Text type="secondary" style={classes.modalInfo}>You are about to transfer from {CHAIN_OPTIONS[chain]} to {getToChain(getFormattedAddress(data.to))}. Double-check to ensure it is correct!</Typography.Text>}
        {isInsufficient && <Typography.Text style={classes.errorBlock} type='danger'>Your balance might be insufficient to cover the transaction fee.</Typography.Text>}
        <FormField label="To">{getFormattedAddress(data.to)}</FormField>
        <FormField label="Amount">{data.amount} ELF</FormField>
        <FormField label="Memo">{data.memo}</FormField>
        <FormField label="Transaction Fee">{fees} ELF</FormField>
    </Modal>
  );
};

export default TransferVerification;
