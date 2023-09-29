import React from "react";
import { Button, Modal } from "antd";

interface IAddressVerification {
  verifying: boolean;
  triggerVerification: () => void;
}
const AddressVerification = ({
  verifying,
  triggerVerification,
}: IAddressVerification) => {
  return (
    <>
      <Button
        type="primary"
        disabled={verifying}
        onClick={() => {
          triggerVerification();
        }}
      >
        Verify address {verifying && `(Please check your device)`}
      </Button>
      <Modal
        title="Verifying..."
        open={verifying}
        closable={false}
        footer={null}
        centered
      >
        <p>Please check device and verify your address.</p>
      </Modal>
    </>
  );
};

export default AddressVerification;
