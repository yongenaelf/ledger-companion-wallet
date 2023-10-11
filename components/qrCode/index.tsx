import { PureComponent } from "react";
import qrcode, { QRCodeErrorCorrectionLevel } from "qrcode";

type QRCodeProps = {
  data: string;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  size: number;
  style?: any;
};

class QRCode extends PureComponent<QRCodeProps> {
  static defaultProps: Partial<QRCodeProps> = {
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

export default QRCode;