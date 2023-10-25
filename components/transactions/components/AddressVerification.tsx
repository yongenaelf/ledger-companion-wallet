import { Button, Modal, Typography } from "antd";
import useStyles from '../style';

interface AddressVerificationProps {
  verifying: boolean;
  triggerVerification: () => void;
}
const AddressVerification = ({
  verifying,
  triggerVerification,
}: AddressVerificationProps) => {
  const classes = useStyles;
  
  return (
    <>
      <Button
        type="link"
        disabled={verifying}
        onClick={() => {
          triggerVerification();
        }}
        style={classes.floatLink}
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
        <Typography.Title style={classes.modalTitle}>Verifying...</Typography.Title>
        <Typography.Text>Please check device and verify your address.</Typography.Text>
      </Modal>
    </>
  );
};

export default AddressVerification;
