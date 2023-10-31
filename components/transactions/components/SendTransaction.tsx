import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { InfoCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Input, InputNumber, Button, Modal, Result, Form, Row, Col, Tooltip } from "antd";
import BigNumber from "bignumber.js";
import AppAelf from "../../../utils/Elf";
import { transfer } from "../../../utils/transaction";
import { useMultiTokenContract } from "../../../hooks/useMultiTokenContract";
import Transport from "@ledgerhq/hw-transport";
import { useAElf } from "../../../hooks/useAElf";
import { validateAddress } from "../../../utils/validateAddress";
import useSnackbar from '../../../utils/snackbar';
import TransferVerification from './TransferVerification';
import SubmitButton from "./SubmitButton";
import {
  addressState,
  unconfirmedTransactionsState,
  networkState,
  chainState,
} from "../../../state";
import { explorerUrlState, rpcUrlState } from "../../../state/selector";
import { useBalance } from "../../../hooks/useBalance";
import PaperLayout from '../../common/paperLayout';
import {HD_DERIVATION_PATH} from '../../../utils/constants';
import useStyles from "../style";

interface SendTransactionProps {
  transport: Transport;
  setError: () => void;
}
function SendTransaction({ 
  transport,
  setError,
}: SendTransactionProps) {
  const classes = useStyles;
  const address = useRecoilValue(addressState);
  const network = useRecoilValue(networkState);
  const chain = useRecoilValue(chainState);
  const [amountValue, setAmountValue] = useState(null);
  const setSnackbar = useSnackbar();
  const [formData, setFormData] = useState({
    to: '',
    amount: '',
    memo: ''
  })
  const [_, setUnconfirmedTransactions] = useRecoilState(
    unconfirmedTransactionsState
  );
  const { data } = useMultiTokenContract();

  const [transactionId, setTransactionId] = useState("");

  const [form] = Form.useForm();

  const [showTransferVerifyModal, setShowTransferVerifyModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const aelfInstance = useAElf();
  const rpcUrl = useRecoilValue(rpcUrlState);
  const explorerUrl = useRecoilValue(explorerUrlState);
  const { data: balance } = useBalance();

  const signAndSendTransaction = async (rawTx: string) => {
    try {
      const aelf = new AppAelf(transport);
      const path = HD_DERIVATION_PATH; // HD derivation path
      const { signature, errorCode } = await aelf.signTransaction(path, rawTx);
      if (errorCode == '6985') {
        setSnackbar.error("User rejected the transaction.");
        throw new Error("User rejected the transaction.");
      }
      // Device locked
      if (errorCode == '5515') {
        setError();
        return;
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
      setSnackbar.error(error.message);
      return { TransactionId: "" };
    } finally {
      setShowTransferModal(false);
    }
  };

  const onClose = () => {
    setShowSuccessModal(false);
    setShowFailureModal(false);
  };

  const onConfirm = async () => {
    const { to, amount, memo } = formData;
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
        setShowFailureModal(true)
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
  }

  useEffect(() => {
    setFormData({to: '', amount: '', memo: ''});
    form.setFieldsValue({to: '', amount: '', memo: ''});
    setAmountValue(null);
  }, [chain, network]);

  // cDPLA9axUVeujnTTk4Cyr3aqRby3cHHAB6Rh28o7BRTTxi8US
  return (
    <PaperLayout title='Transfer'>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        style={{ maxWidth: 'none' }}
        initialValues={{
          to: "",
          amount: '',
          memo: "",
        }}
        autoComplete="off"
        onFinish={(e) => {
          const { to, amount, memo } = e;
          setFormData({to, amount, memo});
          setShowTransferVerifyModal(true);
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              colon={false}
              labelAlign='left'
              label={
                <>To:&nbsp;&nbsp;&nbsp;<Tooltip color='#014795' title="An aelf address contains an 'ELF_' prefix and a suffix according to the chain you intend to interact with - '_AELF' for the main chain">
                  <InfoCircleOutlined
                    style={{
                      color: '#5C6876',
                    }}
                  />
                </Tooltip></>
              }
              name="to"
              rules={[
                {
                  required: true,
                  message: "Please enter recipient (to) address",
                },
                {
                  async validator(rule, value, callback) {
                    validateAddress(value, network, chain);
                    return "";
                  },
                },
              ]}
              labelCol={{span: 3}}
            >
              <Input 
              style={classes.inputfield}
              allowClear/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              labelAlign='left'
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter amount" },
                {
                  validator: async (_rule, value) => {
                    const onlyNumberPattern = /^-?\d*\.?\d+$/;
                    value = value.replace(/,/g, '');
                    if (value) {
                      if (!onlyNumberPattern.test(value)) {
                        throw new Error("Only number allowed");
                      }
                      value = Number(value);
                      if (value < 0.00000001) throw new Error("The amount should not be smaller than 0.00000001");
                      else if (value > balance)
                        throw new Error("Insufficient Balance.");
                    }
                  },
                },
              ]}
              labelCol={{span: 3}}
            >
              <div style={{position: 'relative'}}>
              <InputNumber
                style={classes.inputfield}
                min={0.00000001 as any}
                value={amountValue}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                stringMode
                parser={(value) => value.replace(/[\s$,]/g, "")}
                onChange={setAmountValue}
              />
              {amountValue !== null && (
                <CloseCircleFilled style={classes.clearIcon} onClick={() => {
                  form.setFieldsValue({ amount: '' });
                  setAmountValue(null);
                  setFormData({...formData, amount: ''});
                }} />
              )}
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              labelAlign='left'
              label={<>&nbsp;&nbsp;&nbsp;Memo</>}
              name="memo"
              labelCol={{span: 3}}
              rules={[
                { max: 64, message: "Max length 64 characters." },
                {
                  async validator(rule, value) {
                    const alphanumericPattern = /^[a-zA-Z0-9 \[\.,'"\?!(){}\-_;&:\]]+$/;
                    if (value && !alphanumericPattern.test(value)) {
                      throw new Error('Oops! Only alphanumeric characters and standard punctuation are allowed!');
                    }
                  },
                }

              ]}
            >
              <Input style={classes.inputfield} showCount maxLength={64} allowClear/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{textAlign: 'right', marginBottom: 0}}>
        <SubmitButton form={form} />
        </Form.Item>
      </Form>
      <Modal open={!!showTransferModal} footer={null} closeIcon={null} centered width={442} style={{textAlign: 'center'}}>
        Please verify your transaction details on your<br/>Ledger device to continue....
      </Modal>
      <Modal 
        onCancel={onClose}
        open={showSuccessModal} 
        centered width={442} 
        footer={() => <Button type="primary" onClick={onClose} block>Close</Button>}>
        <Result
          status="success"
          title="Successful transaction"
          subTitle={<div style={{marginTop: '20px'}}>TransactionId: <a href={`${explorerUrl}/tx/${transactionId}`} target="_blank">{transactionId}</a></div>}
        />
      </Modal>
      <Modal 
        onCancel={onClose}
        open={showFailureModal} 
        centered width={442} 
        footer={() => <Button type="primary" onClick={onClose} block>Close</Button>}>
        <Result
          status="error"
          title="Transaction Failure"
          subTitle={<div style={{marginTop: '20px', color: '#FC493A'}}>Transaction fee is insufficient.</div>}
        />
      </Modal>
      {showTransferVerifyModal && <TransferVerification 
        isOpen={showTransferVerifyModal} 
        onConfirm={() => {
          setShowTransferVerifyModal(false);
          onConfirm();
        }}
        onCancel={() => {
          setShowTransferVerifyModal(false);
        }}
        tokenContract={data}
        data={formData}/>}
    </PaperLayout>
  );
}

export default SendTransaction;