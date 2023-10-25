import {useEffect} from 'react';
import { message as messagePopper } from "antd";
import {SnackbarContextType, SnackbarType} from '../../../context/snackbarContext';

export type SnackbarProps = SnackbarContextType;

const Snackbar = ({
    message,
    type,
}: SnackbarProps) => {
    const [messageApi, contextHolder] = messagePopper.useMessage();

    useEffect(() => {
        if (message) {
            switch(type) {
                case SnackbarType.ERROR:
                    messageApi.error(message, 7);
                    break;
                case SnackbarType.SUCCESS:
                    messageApi.success(message, 700);
                    break;
                case SnackbarType.INFO:
                    messageApi.info(message, 7);
                    break;
                case SnackbarType.WARNING:
                    messageApi.warning(message, 7);
                    break;
              }
        }
    }, [message])
    
    return (<>{contextHolder}</>)
}

export default Snackbar;