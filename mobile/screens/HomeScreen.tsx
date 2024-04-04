import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
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

export default function HomeScreen(props: any) {
  console.log(props);
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
