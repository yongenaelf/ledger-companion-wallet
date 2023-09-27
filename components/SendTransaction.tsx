import React, { useState } from "react";
import AppAelf from "./Elf";
import { transfer } from "./transaction";
import { useMultiTokenContract } from "./useMultiTokenContract";
import { Input, InputNumber, Button, Modal, Result, Space, Form } from "antd";
import Transport from "@ledgerhq/hw-transport";
import { useAElf } from "./useAElf";
import useRpcUrl from "./useRpcUrl";
import useExplorerUrl from "./useExplorerUrl";

const { TextArea } = Input;

interface ISendTransactionProps {
  address: string;
  transport: Transport;
}
export function SendTransaction({ address, transport }: ISendTransactionProps) {
  const { data } = useMultiTokenContract();

  const [transactionId, setTransactionId] = useState("");

  const [form] = Form.useForm();

  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const aelfInstance = useAElf();
  const rpcUrl = useRpcUrl();
  const explorerUrl = useExplorerUrl();

  const signAndSendTransaction = async (rawTx: string) => {
    try {
      const aelf = new AppAelf(transport);
      const path = "m/44'/1616'/0'/0/0"; // HD derivation path
      const { signature } = await aelf.signTransaction(path, rawTx);

      if (signature.length === 0) {
        setModalContent("User rejected the transaction.");
        setShowModal(true);
        throw new Error("User rejected the transaction.");
      }

      const response = await fetch(
        `${rpcUrl}/api/blockChain/sendRawTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Transaction: rawTx,
            Signature: signature,
            ReturnTransaction: true,
          }),
        }
      );

      const data: { TransactionId: string } = await response.json();

      return data;
    } catch (error) {
      // in this case, user is likely not on AElf app
      console.warn("Failed: " + error.message);
      setModalContent(error.message);
      setShowModal(true);
      return { TransactionId: "" };
    } finally {
      setShowTransferModal(false);
    }
  };

  const onClose = () => {
    setShowModal(false);
    setModalContent("");
    setShowSuccessModal(false);
  };

  return (
    <div>
      <Form
        layout="inline"
        form={form}
        initialValues={{
          to: "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
          amount: 4200000000,
          memo: "a test memo",
        }}
        onFinish={async (e) => {
          const { to, amount, memo } = e;

          try {
            setTransactionId("");
            setShowTransferModal(true);

            if (!data) throw new Error("no contract");

            const { tokenContractAddress } = data;

            const res = await transfer(
              address,
              to,
              amount,
              memo,
              tokenContractAddress,
              aelfInstance
            );

            const res2 = await signAndSendTransaction(res);

            setTransactionId(res2.TransactionId);

            if (res2.TransactionId) {
              setShowSuccessModal(true);
            }
          } catch (err) {
            console.error(err);
          } finally {
            setShowTransferModal(false);
          }
        }}
      >
        <Form.Item label="To" name="to">
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Memo" name="memo">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal open={!!showModal} onCancel={onClose} onOk={onClose}>
        {modalContent}
      </Modal>
      <Modal open={!!showTransferModal} footer={null} closeIcon={null}>
        Transfer in progress, check your Ledger device to continue...
      </Modal>
      <Modal open={showSuccessModal} onCancel={onClose} onOk={onClose}>
        <Result
          status="success"
          title="Successful transaction"
          subTitle={`TransactionId: ${transactionId}`}
          extra={[
            <Button
              key="explorer"
              type="primary"
              href={`${explorerUrl}/tx/${transactionId}`}
              target="_blank"
            >
              View transaction on AElf Explorer
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
}
