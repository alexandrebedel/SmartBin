import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import ScannerScreen from "./screens/ScannerScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartLine, faGear } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useAppContext } from "./contexts/AppContext";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = createNativeStackNavigator();
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [Linking.createURL("/")],
};

const Tabs: FC = () => {
  const { binId } = useAppContext();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: "lightseagreen",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faChartLine} size={size} color={color} />
          ),
        }}
      />
      {binId && (
        <Tab.Screen
          name="Paramètres"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faGear} size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export const Routes: FC = () => (
  <NavigationContainer linking={linking}>
    <Navigator initialRouteName="Tabs">
      <Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ presentation: "modal" }}
      />
    </Navigator>
  </NavigationContainer>
);
