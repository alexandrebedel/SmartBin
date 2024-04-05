import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Screen() {
  const deleteBinId = () => {
    console.log("Delete Bin ID");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c03a50?s=500"
        style={{
          width: 150,
          height: 150,
          borderRadius: 150,
        }}
      />
      <Text
        style={{
          fontFamily: "Quicksand_700Bold",
          fontSize: 30,
        }}
      >
        Jean
      </Text>
      <Text
        style={{
          fontFamily: "Quicksand_500Medium",
          fontSize: 18,
          marginBottom: 30,
          color: "lightgrey",
        }}
      >
        @Jean1234
      </Text>
      <TouchableOpacity
        style={styles.StatusSections}
        onPress={() => deleteBinId()}
      >
        <View style={styles.StatusIcons}>
          <FontAwesomeIcon icon={faPenToSquare} size={20} />
        </View>
        <Text style={styles.SimpleText}>Modifier profil</Text>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={20}
          style={styles.RightIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.StatusSections}
        onPress={() => deleteBinId()}
      >
        <View style={styles.StatusIcons}>
          <FontAwesomeIcon icon={faTrashCan} size={20} />
        </View>
        <Text style={styles.SimpleText}>Supprimer poubelle enregistrée</Text>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={20}
          style={styles.RightIcon}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Quicksand_700Bold",
          fontSize: 22,
          marginBottom: 20,
        }}
      >
        Support
      </Text>
      <TouchableOpacity
        style={styles.StatusSections}
        onPress={() => deleteBinId()}
      >
        <View style={styles.StatusIcons}>
          <FontAwesomeIcon icon={faTrashCan} size={20} />
        </View>
        <Text style={styles.SimpleText}>Besoin d'aide ?</Text>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={20}
          style={styles.RightIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    width: "100%",
  },
  SimpleText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
  },
  StatusSections: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  StatusIcons: {
    backgroundColor: "#F2F5F1",
    padding: 15,
    borderRadius: 5,
  },
  RightIcon: {
    marginLeft: "auto",
  },
});
