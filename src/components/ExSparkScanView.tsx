import React from 'react';
import {
  Camera,
  CameraSettings,
  DataCaptureContext,
  FrameSourceState,
  VideoResolution,
} from 'scandit-react-native-datacapture-core';

import {
  SparkScan,
  SparkScanListener,
  SparkScanSettings,
  SparkScanView as SSView,
  SparkScanViewSettings,
  Symbology,
} from 'scandit-react-native-datacapture-barcode';
import { BackHandler, ViewStyle } from 'react-native';
import { requestCameraPermissionsIfNeeded, scanDitLicenseKey } from '../utils';

interface SparkScanViewProps {
  style?: ViewStyle;
  visible: boolean;
  onBarcodeReceived: (barcode: string | null) => void;
}

const ExSparkScanView: React.FC<SparkScanViewProps> = ({ ...rest }) => {
  const { visible, style, onBarcodeReceived } = { ...rest };

  const [dataCaptureContext, setDataCaptureContext] = React.useState(
    DataCaptureContext.forLicenseKey(scanDitLicenseKey),
  );
  const sparkScanView = React.useRef<SSView | null>(null);
  const [sparkScan, setSparkScan] = React.useState<SparkScan | null>(null);
  const [cameraState, setCameraState] = React.useState(FrameSourceState.Off);
  const [camera, setCamera] = React.useState<Camera | null>(null);

  React.useEffect(() => {
    setupScanning();
    startCamera();

    return () => {
      console.log('callback');

      if (sparkScanView.current) {
        sparkScanView.current.stopScanning();
      }

      sparkScan?.removeListener(sparkScanListener);
      dataCaptureContext.dispose();
    };
  }, []);

  React.useEffect(() => {
    if (camera) {
      camera.switchToDesiredState(cameraState);
    }

    if (visible === true) {
      console.log('visible');
      setupScanning();
    } else {
      sparkScan?.removeListener(sparkScanListener);
    }

    return () => {
      if (camera && !sparkScanView.current) {
        camera.switchToDesiredState(FrameSourceState.Off);
      }
    };
  }, [cameraState, visible]);

  const sparkScanListener: SparkScanListener = {
    // @ts-ignore
    didScan: (sparkScan, session, getFrameData) => {
      const barcode = session.newlyRecognizedBarcodes[0];

      if (__DEV__) {
        console.log(`============ Did Scan!! ============`);
        console.log(`${barcode.data!}`);
        console.log(`============ Did Scan!! ============`);
      }

      onBarcodeReceived(barcode.data);
    },
  };

  const setupScanning = () => {
    const sparkSettings = new SparkScanSettings();
    sparkSettings.enableSymbologies([
      Symbology.EAN13UPCA,
      Symbology.Code93,
      Symbology.Code128,
      Symbology.QR,
    ]);

    const sparkScan = SparkScan.forSettings(sparkSettings);
    sparkScan.addListener(sparkScanListener);
    setSparkScan(sparkScan);

    requestCameraPermissionsIfNeeded()
      .then(() => setCameraState(FrameSourceState.On))
      .catch(() => BackHandler.exitApp());
  };

  const startCamera = () => {
    if (!camera) {
      const camera = Camera.default;

      if (camera) {
        dataCaptureContext.setFrameSource(camera);

        const cameraSettings = new CameraSettings();
        cameraSettings.preferredResolution = VideoResolution.UHD4K;
        camera.applySettings(cameraSettings);
        setCamera(camera);
      }
    }
  };

  return visible && sparkScan ? (
    <SSView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        ...style,
      }}
      context={dataCaptureContext}
      sparkScan={sparkScan}
      sparkScanViewSettings={new SparkScanViewSettings()}
      ref={ref => {
        sparkScanView.current = ref;
        if (sparkScanView.current) {
          sparkScanView.current.uiListener = {
            onBarcodeCountButtonTappedIn: view =>
              console.log('onBarcodeCountButtonTappedIn'),
            onFastFindButtonTappedIn: view =>
              console.log('onFastFindButtonTappedIn'),
          };
        }
      }}
    />
  ) : (
    <></>
  );
};

export default React.memo(ExSparkScanView);
