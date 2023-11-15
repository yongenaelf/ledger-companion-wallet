import Image from 'next/image';
import { Tooltip, Flex } from "antd";
import useSnackbar from '../../../utils/snackbar';
import copyImage from '../../../assets/icon/copy.svg';
import styles from "./style.module.css";

interface CopyToClipboardProps {
  message: string;
}

const CopyToClipboard = ({
  message
}: CopyToClipboardProps) => {
  const setSnackbar = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
  };
  return (
    <Flex className={styles.inline} onClick={() => setSnackbar.success("Copied successfully")}>
      <Tooltip color='#014795' title='Copy to clipboard'>
        <Image onClick={handleCopy} className={styles.copyTag} src={copyImage} alt="Copy to the clipboard"/>
      </Tooltip>
    </Flex>
  );
}

export default CopyToClipboard;