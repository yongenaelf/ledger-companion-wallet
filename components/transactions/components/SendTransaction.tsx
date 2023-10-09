import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Input, InputNumber, Button, Modal, Result, Form, Row, Col } from "antd";
import BigNumber from "bignumber.js";
import AppAelf from "../../../utils/Elf";
import { transfer } from "../../../utils/transaction";
import { useMultiTokenContract } from "../../../hooks/useMultiTokenContract";
import Transport from "@ledgerhq/hw-transport";
import { useAElf } from "../../../hooks/useAElf";
import { validateAddress } from "../../../utils/validateAddress";
import SubmitButton from "./SubmitButton";
import useSnackbar from '../../../utils/snackbar';
import {
  addressState,
  chainState,
  unconfirmedTransactionsState,
} from "../../../state";
import { explorerUrlState, rpcUrlState } from "../../../state/selector";
import { useBalance } from "../../../hooks/useBalance";

interface SendTransactionProps {
  transport: Transport;
}
function SendTransaction({ 
  transport 
}: SendTransactionProps) {
  const address = useRecoilValue(addressState);
  const setSnackbar = useSnackbar();
  const chain = useRecoilValue(chainState);
  const [_, setUnconfirmedTransactions] = useRecoilState(
    unconfirmedTransactionsState
  );
  const { data } = useMultiTokenContract();

  const [transactionId, setTransactionId] = useState("");

  const [form] = Form.useForm();

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
        setSnackbar.error("User rejected the transaction");
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
      setSnackbar.error(error.message);
      return { TransactionId: "" };
    } finally {
      setShowTransferModal(false);
    }
  };

  const onClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        style={{ maxWidth: 'none' }}
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
              setSnackbar.error(msg);
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
        <Row>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter amount" },
                {
                  validator: async (_rule, value) => {
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
                style={{display: 'block'}}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item style={{textAlign: 'right'}}>
              <SubmitButton form={form} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal open={!!showTransferModal} footer={null} closeIcon={null}>
        Transfer in progress, check your Ledger device to continue...
      </Modal>
      <Modal 
        open={showSuccessModal} 
        footer={() => <Button onClick={onClose}>Close</Button>}>
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
    </>
  );
}

export default SendTransaction;