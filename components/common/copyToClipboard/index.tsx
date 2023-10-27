import Image from 'next/image';
import { Tooltip, Flex } from "antd";
import useSnackbar from '../../../utils/snackbar';
import copyImage from '../../../assets/icon/copy.svg';
import useStyles from "./style";

interface CopyToClipboardProps {
  message: string;
}

const CopyToClipboard = ({
  message
}: CopyToClipboardProps) => {
  const classes = useStyles;
  const setSnackbar = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
  };
  return (
    <Flex style={{display: 'inline-flex'}} onClick={() => setSnackbar.success("Copied successfully")}>
      <Tooltip color='#014795' title='Copy to clipboard'>
        <Image onClick={handleCopy} style={classes.copyTag} src={copyImage} alt="Copy to the clipboard"/>
      </Tooltip>
    </Flex>
  );
}

export default CopyToClipboard;