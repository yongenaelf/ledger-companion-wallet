import { Button, Modal, Typography } from "antd";
import styles from '../style.module.css';

interface AddressVerificationProps {
  verifying: boolean;
  triggerVerification: () => void;
}
const AddressVerification = ({
  verifying,
  triggerVerification,
}: AddressVerificationProps) => {
  
  return (
    <>
      <Button
        type="link"
        disabled={verifying}
        onClick={() => {
          triggerVerification();
        }}
        className={styles.floatLink}
      >
        Verify address
      </Button>
      <Modal
        open={verifying}
        closable={false}
        footer={null}
        centered
        width={442}
      >
        <Typography.Title className={styles.modalTitle}>Verifying...</Typography.Title>
        <Typography.Text>Please check device and verify your address.</Typography.Text>
      </Modal>
    </>
  );
};

export default AddressVerification;
