import Image from 'next/image';
import { Button, Card as AntCard, Typography } from "antd";
import walletImage from '../../../assets/icon/wallet.svg';
import styles from "./style.module.css";

interface CardProps {
  title: string;
  content: string;
  buttonLabel: string;
  onClickButton: () => void;
  enablePrimaryBtn?: boolean;
  isError?: boolean;
}
const Card = ({
  title,
  content,
  enablePrimaryBtn,
  buttonLabel,
  onClickButton,
  isError,
}: CardProps) => {

  return (
    <AntCard className={styles.card}>
      <div className={styles.cardContentContainer}>
        <Image src={walletImage} alt="Wallet"/>
        <Typography.Title className={styles.cardTitle}>{title}</Typography.Title>
        <Typography.Text className={styles.cardContent} {...(isError ? {type: 'danger'} : {})}>{content}</Typography.Text>
      </div>
      <Button type={enablePrimaryBtn ? 'primary' : 'default'} onClick={onClickButton} block>{buttonLabel}</Button>
    </AntCard>
  );
}

export default Card;