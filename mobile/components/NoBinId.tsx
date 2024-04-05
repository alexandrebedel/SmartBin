import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const logo = require("../assets/logo.png");

export const NoBinId: FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <Text
        style={{
          fontFamily: "Quicksand_700Bold",
          fontSize: 40,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        SMART BIN
      </Text>
      <Image
        source={logo}
        style={{
          width: 300,
          height: 250,
          alignSelf: "center",
          marginLeft: 50,
          marginBottom: 40,
        }}
      />
      <Text
        style={{
          fontFamily: "Quicksand_500Medium",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Veuillez scanner le QR Code situé sur l'écran de la poubelle pour vous
        connecter
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Scanner")}
        style={{
          backgroundColor: "lightseagreen",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Quicksand_600SemiBold",
            fontSize: 20,
          }}
        >
          Se Connecter
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
