import React, { PureComponent } from "react";
import qrcode, { QRCodeErrorCorrectionLevel } from "qrcode";

type Props = {
  data: string;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  size: number;
  style?: any;
};

export default class QRCode extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    size: 200,
    errorCorrectionLevel: "H",
  };

  componentDidMount() {
    this.drawQRCode();
  }

  componentDidUpdate() {
    this.drawQRCode();
  }

  _canvas: HTMLCanvasElement | null = null;

  drawQRCode() {
    const { data, size, errorCorrectionLevel } = this.props;
    qrcode.toCanvas(this._canvas, data, {
      width: size,
      margin: 0,
      errorCorrectionLevel,
      color: {
        light: "#ffffff",
      },
    });
  }

  render() {
    return <canvas style={this.props.style} ref={(n) => (this._canvas = n)} />;
  }
}
