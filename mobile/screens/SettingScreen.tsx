import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../contexts/AppContext";
import { formatDistance } from "date-fns";
import Modal from "react-native-modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Screen() {
  const { removeId } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);

  const removeBin = () => {
    removeId();
    alert("Poubelle oubliée avec succès");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <FontAwesomeIcon icon={faClose} size={22} color="lightseagreen" />
          </Pressable>
          <Text style={styles.modalTitle}>
            Voulez-vous vraiment supprimer la poubelle enregistrée ?
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FF474C",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => removeBin()}
            >
              <Text style={{ color: "black", fontFamily: "Quicksand_700Bold" }}>
                Oui
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "lightgrey",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "black", fontFamily: "Quicksand_700Bold" }}>
                Non
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image
        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=500"
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
        onPress={() => setModalVisible(true)}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    maxHeight: "50%",
    padding: 10,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
  },
});
