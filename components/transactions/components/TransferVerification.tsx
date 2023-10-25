import { Button, Modal, Typography, Flex } from "antd";
import FormField from '../../common/formField';
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
        <Flex flex={1}><Button type="primary" onClick={onConfirm} block>Confirm</Button></Flex>
      </Flex>)}
      >
        <Typography.Text type="secondary">Please verify the below transfer details before clicking confirm?</Typography.Text>
        <FormField label="To">{data.to}</FormField>
        <FormField label="Amount">{data.amount}</FormField>
        <FormField label="Memo">{data.memo}</FormField>
    </Modal>
  );
};

export default TransferVerification;
