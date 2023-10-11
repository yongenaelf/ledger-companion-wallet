import Image from 'next/image';
import { Button, Card, Typography } from "antd";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Transport from "@ledgerhq/hw-transport";
import logoImage from '../../assets/icon/logo.png';
import useStyles from "./style";

interface ConnectDeviceProps {
  onSelectDevice: (transport: Transport) => void;
}

function ConnectDevice({
  onSelectDevice,
}: ConnectDeviceProps) {
  const classes = useStyles;
  
  const connectUSBDevice = async () => {
    const transport = await TransportWebUSB.create();
    onSelectDevice(transport);
  };

  return (
    <Card style={classes.card}>
      <Image src={logoImage} alt="Aelf logo" width={60} />
      <Typography.Title style={classes.cardTitle}>Connect with USB</Typography.Title>
      <Typography.Text style={classes.cardContent}>Power up your Ledger device and enter your pin before continuing...</Typography.Text>
      <Button type="primary" onClick={connectUSBDevice} block>Connect with USB</Button>
    </Card>
  );
}

export default ConnectDevice;