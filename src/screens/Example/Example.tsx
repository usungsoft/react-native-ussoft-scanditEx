import ExSparkScanView from 'UssoftExample/src/components/ExSparkScanView';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface Props {}

const SparkScanTest: React.FC<Props> = ({ ...rest }) => {
  const [sparkScanVisible, setSparkScanVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <ExSparkScanView
        visible={sparkScanVisible}
        onBarcodeReceived={barcode =>
          console.log(`scan barcode ==> ${barcode}`)
        }
      />
      <Button
        title={!sparkScanVisible ? `Show SparkScanView` : `Hide SparkScanView`}
        onPress={e => setSparkScanVisible(!sparkScanVisible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default SparkScanTest;
