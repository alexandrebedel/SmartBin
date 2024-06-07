import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { format, addDays, startOfWeek } from "date-fns";
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
import { ModalItems } from "../components/ModalItems";

const API_URL = Constants.expoConfig?.extra?.apiUrl as string;

export default function HomeScreen() {
  const { binId } = useAppContext();
  const { data, isLoading } = useSWR(
    binId ? `${API_URL}/trash/b65e90fb-9100-46b6-bdc1-14947f3beb9c` : null,
    fetcher
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

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

  const getLastRecycledItem = (type: string) => {
    const filteredItems = data.trashData.filter(
      (item: { trashType: string }) => item.trashType === type
    );

    const sortedItems = filteredItems.sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const lastItem = sortedItems.length > 0 ? sortedItems[0] : null;

    return lastItem;
  };

  const lastGlassItem = getLastRecycledItem("glass");
  const lastRecyclableItem = getLastRecycledItem("recyclable");
  const lastTrashItem = getLastRecycledItem("trash");

  const getTrashByType = (data: { trashData: any[] }, type: any) => {
    // Filtrer les déchets en fonction du type donné
    const filteredTrash = data.trashData.filter(
      (item) => item.trashType === type
    );

    // Retourner les déchets filtrés
    return filteredTrash;
  };

  const recyclableTrash = getTrashByType(data, "recyclable");
  const glassTrash = getTrashByType(data, "glass");
  const otherTrash = getTrashByType(data, "trash");

  const sortRecycledItemsByDay = () => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });

    const sortedData: { [key: string]: number } = {};

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(monday, i);
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      sortedData[formattedDate] = 0;
    }

    data.trashData.forEach((item: { createdAt: string | number | Date }) => {
      const date = format(new Date(item.createdAt), "yyyy-MM-dd");
      if (sortedData[date] !== undefined) {
        sortedData[date] += 1;
      }
    });

    return sortedData;
  };

  const sortedRecycledItemsByDay = sortRecycledItemsByDay();

  const daysNames = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalItems
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          trashData={
            modalType === "recyclable"
              ? recyclableTrash
              : modalType === "glass"
              ? glassTrash
              : otherTrash
          }
        />
        <View style={{ marginTop: 30, marginBottom: 60 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.SimpleText}>Niveau de remplissage</Text>
            <Text style={styles.SimpleText}>80% remplie</Text>
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
            <Text style={styles.SimpleText}>Remplie</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.SimpleText}>Produits Recyclés</Text>
            <Text style={styles.SimpleText}>{data.totalTrash} éléments</Text>
          </View>
          <View>
            <LineChart
              data={{
                labels: daysNames, // Utilisation des noms des jours en français comme labels
                datasets: [
                  {
                    data: Object.values(sortedRecycledItemsByDay), // Nombre de produits recyclés par jour
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

          <Text style={styles.SectionTitle}>Sommaire de recyclage</Text>
          <View style={styles.flexBox}>
            <Card
              onPress={() => {
                setModalVisible(true), setModalType("glass");
              }}
              title="Verre"
              value={data.stats.totalTrashByType.glass + " éléments"}
              icon={faWineBottle}
            />
            <Card
              onPress={() => {
                setModalVisible(true), setModalType("recyclable");
              }}
              title="Recyclable"
              value={data.stats.totalTrashByType.recyclable + " éléments"}
              icon={faBottleWater}
            />
          </View>
          <Card
            onPress={() => {
              setModalVisible(true), setModalType("trash");
            }}
            title="Organique"
            value={data.stats.totalTrashByType.trash + " éléments"}
            icon={faAppleWhole}
          />

          <Text style={styles.SectionTitle}>Status</Text>
          <StatusItem
            icon={faTrashCan}
            title="Bac verre"
            description={[
              "La poubelle est à 70% remplie",
              lastGlassItem
                ? `Dernier élément récolté: ${format(
                    lastGlassItem.createdAt,
                    "dd/MM/yyyy"
                  )}`
                : "No item recolted yet",
            ]}
          />

          <StatusItem
            icon={faTrashCan}
            title="Bac recyclable"
            description={[
              "La poubelle est à 40% remplie",
              lastRecyclableItem
                ? `Dernier élément récolté: ${format(
                    lastRecyclableItem.createdAt,
                    "dd/MM/yyyy"
                  )}`
                : "No item recolted yet",
            ]}
          />

          <StatusItem
            icon={faTrashCan}
            title="Bac organique"
            description={[
              "La poubelle est à 20% remplie",
              lastTrashItem
                ? `Dernier élément récolté: ${format(
                    lastTrashItem.createdAt,
                    "dd/MM/yyyy"
                  )}`
                : "No item recolted yet",
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
