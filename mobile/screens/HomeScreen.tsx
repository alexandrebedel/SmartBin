import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
import {
  faWineBottle,
  faBottleWater,
  faAppleWhole,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { LineChart } from "react-native-chart-kit";
import { Card } from "../components/Card";
import { StatusItem } from "../components/StatusItem";
import Constants from "expo-constants";
import { fetcher } from "../utils";
import useSWR from "swr";
import { NoBinId } from "../components/NoBinId";
import { useAppContext } from "../contexts/AppContext";
import { BleManager } from "react-native-ble-plx";
import { useEffect } from "react";

const manager = new BleManager();

const API_URL = Constants.expoConfig?.extra?.apiUrl as string;

export default function HomeScreen() {
  const { binId } = useAppContext();
  const { data, isLoading } = useSWR(
    binId ? `${API_URL}/trash/${binId}` : null,
    fetcher
  );

  const connect = async (id: string) => {
    try {
      await manager.connectToDevice(id).then((device) => {
        console.log("Connected to device:", device.name);

        // Add your logic for handling the connected device
        return device.discoverAllServicesAndCharacteristics();
      });
    } catch (error) {
      console.error("Error connecting to device:", error);
    }
  };

  useEffect(() => {
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      if (device?.name === "M5-Stack") {
        console.log("Found m5");
        // console.log(JSON.stringify(device, undefined, 2));
        // const res = await device.connect();

        // await connect(device.);
        // console.log(JSON.stringify(res, undefined, 2));
        manager.stopDeviceScan();

        const Buffer = require("buffer").Buffer;
        let encodedAuth = new Buffer("your text").toString("base64");
        await device.writeCharacteristicWithResponseForService(
          "4fafc201-1fb5-459e-8fcc-c5c9c331914b", // service UUID
          "beb5483e-36e1-4688-b7f5-ea07361b26a8", // characteristic UUID
          encodedAuth
        );
      }
    });
  }, []);

  // console.log(JSON.stringify(data, undefined, 2));

  if (isLoading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!binId) {
    return <NoBinId />;
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 30, marginBottom: 60 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.SimpleText}>Fill Level</Text>
            <Text style={styles.SimpleText}>80% full</Text>
          </View>
          <Progress.Bar
            progress={0.8}
            width={null}
            color="lightseagreen"
            height={8}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <Text style={styles.SimpleText}>Status</Text>
            <Text style={styles.SimpleText}>Full</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.SimpleText}>Products Recycled</Text>
            <Text style={styles.SimpleText}>20 items</Text>
          </View>
          <View>
            <LineChart
              data={{
                labels: [
                  "Lundi",
                  "Mardi",
                  "Mercredi",
                  "Jeudi",
                  "Vendredi",
                  "Samedi",
                  "Dimanche",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => "lightseagreen",
                labelColor: (opacity = 1) => `black`,
                style: {
                  borderRadius: 16,
                },
              }}
              withInnerLines={false}
              withOuterLines={false}
              withDots={false}
              bezier
              style={{
                marginTop: 30,
                alignSelf: "center",
                marginLeft: -30,
              }}
              fromZero={true}
            />
          </View>

          <Text style={styles.SectionTitle}>Recycling Summary</Text>
          <View style={styles.flexBox}>
            <Card title="Glass Items" value="5 items" icon={faWineBottle} />
            <Card title="Plastic Items" value="8 items" icon={faBottleWater} />
          </View>
          <Card title="Other Items" value="7 items" icon={faAppleWhole} />

          <Text style={styles.SectionTitle}>Status</Text>
          <StatusItem
            icon={faTrashCan}
            title="Glass Container"
            description={[
              "The bin is 70% full",
              "Last item recolted: 07/03/2024",
            ]}
          />

          <StatusItem
            icon={faTrashCan}
            title="Plastic Container"
            description={[
              "The bin is 40% full",
              "Last item recolted: 03/03/2024",
            ]}
          />

          <StatusItem
            icon={faTrashCan}
            title="Other Items Container"
            description={[
              "The bin is 20% full",
              "Last item recolted: 06/03/2024",
            ]}
          />
        </View>
      </ScrollView>
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
  activity: { flex: 1, justifyContent: "center", backgroundColor: "white" },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 18,
  },
  SimpleText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
  },
  SectionTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 22,
    marginTop: 40,
  },
  StatusIcons: {
    backgroundColor: "#F2F5F1",
    padding: 15,
    borderRadius: 5,
  },
});
