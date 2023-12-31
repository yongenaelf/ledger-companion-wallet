import {useEffect} from 'react';
import { message as messagePopper } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import {SnackbarContextType, SnackbarType} from '@/context/snackbarContext';
import styles from "./style.module.css";

export type SnackbarProps = SnackbarContextType;

const Snackbar = ({
  message = '',
  type,
}: SnackbarProps) => {
  const [messageApi, contextHolder] = messagePopper.useMessage();

  useEffect(() => {
    if (message) {
      switch(type) {
      case SnackbarType.ERROR:
        showMessageWithCloseIcon(message, 'error');
        break;
      case SnackbarType.SUCCESS:
        showMessageWithCloseIcon(message, 'success');
        break;
      case SnackbarType.INFO:
        showMessageWithCloseIcon(message, 'info');
        break;
      case SnackbarType.WARNING:
        showMessageWithCloseIcon(message, 'warning');
        break;
      }
    }
  });

  const showMessageWithCloseIcon = (message, messageType) => {
    const closeIcon = (
      <CloseOutlined
        onClick={() => {
          messageApi.destroy();
        }}
        className={styles.closeIcon}
      />
    );

    messageApi.open({
      content: (
        <div>
          {message}{ messageType !== 'success' && closeIcon}
        </div>
      ),
      type: messageType,
      duration: 7,
    });
  };

  return contextHolder;
};

export default Snackbar;