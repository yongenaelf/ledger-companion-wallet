import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Transport from "@ledgerhq/hw-transport";
import Card from '@/components/common/card';

interface ConnectDeviceProps {
  // eslint-disable-next-line no-unused-vars
  onSelectDevice: (transport: Transport) => void;
}

function ConnectDevice({
  onSelectDevice,
}: ConnectDeviceProps) {

  const connectUSBDevice = async () => {
    const transport = await TransportWebUSB.create();
    onSelectDevice(transport);
  };

  return (
    <Card 
      title='Connect with Device' 
      content='Please connect your Ledger device and open the AELF app.' 
      enablePrimaryBtn 
      buttonLabel='Connect' 
      onClickButton={connectUSBDevice}
    />
  );
}

export default ConnectDevice;