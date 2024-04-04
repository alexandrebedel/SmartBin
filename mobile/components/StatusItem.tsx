import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type StatusItemProps = {
  icon: IconDefinition;
  /**
   * The title of the item
   */
  title: string;
  /**
   * The description of the item
   *
   * Will go under the title, and if provided as an
   * array, each entries will be displayed line
   * by line
   */
  description: string | string[];
};

export const StatusItem: FC<StatusItemProps> = ({
  icon,
  title,
  description,
}) => (
  <View style={styles.StatusSections}>
    <View style={styles.StatusIcons}>
      <FontAwesomeIcon icon={icon} size={20} />
    </View>

    <View>
      <Text style={styles.SimpleText}>{title}</Text>

      {typeof description === "string" ? (
        <Text>{description}</Text>
      ) : (
        description.map((item, index) => <Text key={index}>{item}</Text>)
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  SimpleText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
  },
  StatusSections: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    alignItems: "flex-start",
    gap: 10,
  },
  StatusIcons: {
    backgroundColor: "#F2F5F1",
    padding: 15,
    borderRadius: 5,
  },
});
