import React, { useState } from "react";
import AppAelf from "./Elf";
import { transfer } from "./transaction";
import { useMultiTokenContract } from "./useMultiTokenContract";
import { Input, InputNumber, Button, Modal, Result, Space } from "antd";
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

  const [to, setTo] = useState(
    "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US"
  );
  const [amount, setAmount] = useState(4200000000);
  const [memo, setMemo] = useState("a test memo");
  const [transactionId, setTransactionId] = useState("");
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
      <table>
        <tbody>
          <tr>
            <td>To: </td>
            <td>
              <TextArea
                rows={4}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Amount: </td>
            <td>
              <InputNumber value={amount} onChange={(e) => setAmount(e ?? 0)} />
            </td>
          </tr>
          <tr>
            <td>Memo: </td>
            <td>
              <Input value={memo} onChange={(e) => setMemo(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Space>
                <Button
                  loading={showTransferModal}
                  type="primary"
                  onClick={async () => {
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
                  Transfer
                </Button>
                <Button
                  type="primary"
                  href={`${explorerUrl}/address/ELF_${address}_AELF#txns`}
                  target="_blank"
                >
                  View all transactions on AElf Explorer
                </Button>
              </Space>
            </td>
          </tr>
        </tbody>
      </table>

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
