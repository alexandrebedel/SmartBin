import {
  BarcodeScanningResult,
  BarcodeSettings,
  CameraView,
} from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useCameraPermissions } from "../hooks";
import { useAppContext } from "../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

const BARCODE_SETTINGS = { barcodeTypes: ["qr"] } satisfies BarcodeSettings;

export default function Screen() {
  const navigation = useNavigation();
  const { registerId } = useAppContext();
  const hasPermission = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    const id = data.split("/--/")[1];

    setScanned(true);
    if (id) {
      registerId(id);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={BARCODE_SETTINGS}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
