import React from "react";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import Transport from "@ledgerhq/hw-transport";
import { Button } from "antd";

interface IDeviceSelectionScreenProps {
  onSelectDevice: (transport: Transport) => void;
}
export function DeviceSelectionScreen({
  onSelectDevice,
}: IDeviceSelectionScreenProps) {
  const createUSB = async () => {
    const transport = await TransportWebUSB.create();
    onSelectDevice(transport);
  };

  return (
    <div className="DeviceSelectionScreen">
      <p>Power up your Ledger device and enter your pin before continuing...</p>
      <Button onClick={createUSB}>Connect with USB</Button>
    </div>
  );
}
