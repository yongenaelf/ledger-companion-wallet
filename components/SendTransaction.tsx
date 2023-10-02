import React, { useState } from "react";
import AppAelf from "../utils/Elf";
import { transfer } from "../utils/transaction";
import { useMultiTokenContract } from "../hooks/useMultiTokenContract";
import { Input, InputNumber, Button, Modal, Result, Form } from "antd";
import Transport from "@ledgerhq/hw-transport";
import { useAElf } from "../hooks/useAElf";
import BigNumber from "bignumber.js";
import { validateAddress } from "../utils/validateAddress";
import SubmitButton from "./SubmitButton";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addressState,
  chainState,
  unconfirmedTransactionsState,
} from "../state";
import { explorerUrlState, rpcUrlState } from "../state/selector";
import { useBalance } from "../hooks/useBalance";

interface ISendTransactionProps {
  transport: Transport;
}
export function SendTransaction({ transport }: ISendTransactionProps) {
  const address = useRecoilValue(addressState);
  const chain = useRecoilValue(chainState);
  const [_, setUnconfirmedTransactions] = useRecoilState(
    unconfirmedTransactionsState
  );
  const { data } = useMultiTokenContract();

  const [transactionId, setTransactionId] = useState("");

  const [form] = Form.useForm();

  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const aelfInstance = useAElf();
  const rpcUrl = useRecoilValue(rpcUrlState);
  const explorerUrl = useRecoilValue(explorerUrlState);
  const { data: balance } = useBalance();

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

      setUnconfirmedTransactions((current) => [...current, data.TransactionId]);

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
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
        initialValues={{
          to: "cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US",
          amount: 42,
          memo: "a test memo",
        }}
        autoComplete="off"
        onFinish={async (e) => {
          const { to, amount, memo } = e;

          try {
            setTransactionId("");
            setShowTransferModal(true);

            if (!data) throw new Error("no contract");

            const { tokenContractAddress } = data;

            const rawTx = await transfer(
              address,
              to,
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

            const { Success } = await feeResponse.json();

            if (!Success) {
              const msg = "Insufficient funds for transaction fee.";
              setModalContent(msg);
              throw new Error(msg);
            }

            const res2 = await signAndSendTransaction(rawTx);

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
        <Form.Item
          label="To"
          name="to"
          rules={[
            {
              required: true,
              message: "Please enter to address",
            },
            {
              async validator(rule, value, callback) {
                validateAddress(value);
                return "";
              },
            },
          ]}
        >
          <Input addonBefore="ELF_" addonAfter={`_${chain}`} />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter amount" },
            {
              validator: async (_rule, value) => {
                console.log(balance);

                if (value <= 0) throw new Error("Amount must be more than 0");
                else if (value > balance)
                  throw new Error("Amount must be less than balance");
              },
            },
          ]}
        >
          <InputNumber
            addonAfter="ELF"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          label="Memo"
          name="memo"
          rules={[
            { required: true, message: "Please enter memo" },
            { max: 64, message: "Max length 64 characters." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <SubmitButton form={form} />
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
