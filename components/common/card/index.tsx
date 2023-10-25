import Image from 'next/image';
import { Button, Card as AntCard, Typography } from "antd";
import walletImage from '../../../assets/icon/wallet.svg';
import useStyles from "./style";

interface CardProps {
  title: string;
  content: string;
  buttonLabel: string;
  onClickButton: () => void;
  enablePrimaryBtn?: boolean;
  isCentered?: boolean;
  isError?: boolean;
}
const Card = ({
  title,
  content,
  enablePrimaryBtn,
  buttonLabel,
  onClickButton,
  isCentered,
  isError,
}: CardProps) => {
  const classes = useStyles;

  return (
    <AntCard style={isCentered ? {...classes.card, ...classes.cardCenter} : classes.card}>
      <div style={classes.cardContentContainer}>
        <Image src={walletImage} alt="Wallet"/>
        <Typography.Title style={classes.cardTitle}>{title}</Typography.Title>
        <Typography.Text style={classes.cardContent} {...(isError ? {type: 'danger'} : {})}>{content}</Typography.Text>
      </div>
      <Button type={enablePrimaryBtn ? 'primary' : 'default'} onClick={onClickButton} block>{buttonLabel}</Button>
    </AntCard>
  );
}

export default Card;