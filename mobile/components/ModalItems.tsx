import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { FC } from "react";
import Modal from "react-native-modal";
import { formatDistance } from "date-fns";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faWineBottle,
  faBottleWater,
  faAppleWhole,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type ModalItemsProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  trashData: any[];
};

export const ModalItems: FC<ModalItemsProps> = ({
  modalVisible,
  setModalVisible,
  trashData,
}) => {
  return (
    <View style={styles.centeredView}>
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
          <Text style={styles.modalTitle}>Recycled Items</Text>
          <ScrollView>
            {trashData === undefined || trashData.length === 0 ? (
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                No items recolted yet
              </Text>
            ) : (
              trashData.reverse().map((item, index) => (
                <View style={styles.StatusSections} key={index}>
                  <View style={styles.StatusIcons}>
                    {item.image === null ? (
                      <FontAwesomeIcon
                        icon={
                          item.trashType === "recyclable"
                            ? faBottleWater
                            : item.trashType === "glass"
                            ? faWineBottle
                            : faAppleWhole
                        }
                        size={20}
                        style={{ margin: 10 }}
                        color="lightseagreen"
                      />
                    ) : (
                      <Image
                        style={{
                          width: 60,
                          height: 45,
                          resizeMode: "contain",
                          borderRadius: 5,
                        }}
                        source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                      ></Image>
                    )}
                  </View>

                  <View>
                    <Text style={styles.SimpleText}>
                      {item.trashType === "recyclable"
                        ? "Recyclable item"
                        : item.trashType === "glass"
                        ? "Glass item"
                        : "Other item"}
                    </Text>
                    <Text>
                      Thrown{" "}
                      {formatDistance(new Date(item.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
  },
  backdropContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  SimpleText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
  },
  StatusSections: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    alignItems: "flex-start",
    gap: 10,
  },
  StatusIcons: {
    backgroundColor: "#F2F5F1",
    borderRadius: 5,
  },
});
