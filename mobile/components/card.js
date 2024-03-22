import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default Card = ({ title, value, icon }) => {
  return (
    <TouchableOpacity style={styles.CardContainer}>
      <FontAwesomeIcon icon={icon} size={22} color="lightseagreen" />
      <Text style={styles.CardTitle}>{title}</Text>
      <Text style={styles.CardText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CardTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  CardText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
    color: "grey",
  },
  CardContainer: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    padding: 15,
    width: "48%",
  },
});