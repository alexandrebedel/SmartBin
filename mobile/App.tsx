import { Text } from "react-native";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartLine, faGear } from "@fortawesome/free-solid-svg-icons";
import HomeScreen from "./HomeScreen";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Tab = createBottomTabNavigator();
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [Linking.createURL("/")],
};
const fonts = {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
};

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "lightseagreen",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused ? faChartLine : faChartLine;
            } else if (route.name === "Settings") {
              iconName = focused ? faGear : faGear;
            }
            return (
              <FontAwesomeIcon
                icon={iconName as IconProp}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={HomeScreen} />
        {/* <Tab.Screen name="Settings" component={QRCodeScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
