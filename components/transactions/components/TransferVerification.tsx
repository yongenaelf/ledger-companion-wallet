import { Button, Modal, Typography, Flex } from "antd";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import BigNumber from "bignumber.js";
import FormField from '@/components/common/formField';
import { transfer } from "@/utils/transaction";
import { useAElf } from "@/hooks/useAElf";
import { chainState, addressState } from "@/state";
import { rpcUrlState } from "@/state/selector";
import { fetchMainAddress, getFormattedAddress } from "../utils";
import styles from '../style.module.css';

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
  tokenContract: {
    tokenContractAddress: string;
  };
}
const TransferVerification = ({
  isOpen,
  onConfirm,
  onCancel,
  data,
  tokenContract,
}: TransferVerificationProps) => {
  const address = useRecoilValue(addressState);
  const rpcUrl = useRecoilValue(rpcUrlState);
  const [isInsufficient, setInsufficient] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fees, setFees] = useState<number>(0);
  const chain = useRecoilValue(chainState);
  const aelfInstance = useAElf();
  const amount = new BigNumber(data.amount.replaceAll(",", ""));

  const calculateFees = async () => {
    const { to, amount, memo } = data;
    try {
      if (!tokenContract) throw new Error("no contract");
      const { tokenContractAddress } = tokenContract;

      const rawTx = await transfer(
        address,
        fetchMainAddress(to),
        new BigNumber(amount).multipliedBy(10 ** 8).toNumber(),
        memo,
        tokenContractAddress,
        aelfInstance
      );
      const feeResponse = await fetch(
        `${rpcUrl}/api/blockChain/calculateTransactionFee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            RawTransaction: rawTx,
          }),
        }
      );
      const {Success, TransactionFee } = await feeResponse.json();
      if (Success) {
        const calculatedFees = Number(new BigNumber(TransactionFee.ELF).dividedBy(10 ** 8).toNumber());
        setFees(calculatedFees);
        setInsufficient(false);
        setError('');
      } else {
        setInsufficient(true);
        setError('Your balance might be insufficient to cover the transaction fee.');
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    calculateFees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <Typography.Text type="secondary" className={styles.modalInfo}>Please verify the below transfer details before clicking confirm.</Typography.Text>
      {error && <Typography.Text className={styles.errorBlock} type='danger'>{error}</Typography.Text>}
      <FormField label="To">{getFormattedAddress(data.to, chain)}</FormField>
      <FormField label="Amount">{amount.toNumber().toFixed(amount.dp()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ELF</FormField>
      <FormField label="Memo">{data.memo}</FormField>
      {!isInsufficient && <FormField label="Transaction Fee">{fees} ELF</FormField>}
    </Modal>
  );
};

export default TransferVerification;