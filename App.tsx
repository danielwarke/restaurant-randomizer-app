import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Randomizer from "./screens/Randomizer";
import RestaurantList from "./screens/RestaurantList";
import { GlobalStyles } from "./constants/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModifyRestaurant from "./screens/ModifyRestaurant";

SplashScreen.preventAutoHideAsync();

export type RestaurantStackParamList = {
  RestaurantList: undefined;
  ModifyRestaurant: { restaurantId: string } | undefined;
};

const TopTabs = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<RestaurantStackParamList>();

const RestaurantsOverview = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RestaurantList" component={RestaurantList} />
      <Stack.Screen name="ModifyRestaurant" component={ModifyRestaurant} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function onInit() {
      await SplashScreen.hideAsync();
    }

    if (dbInitialized) {
      onInit();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <TopTabs.Navigator
          initialRouteName="Restaurants"
          screenOptions={{
            tabBarStyle: {
              height: 100,
              justifyContent: "flex-end",
            },
            tabBarIndicatorStyle: {
              backgroundColor: GlobalStyles.colors.primary,
            },
          }}
        >
          <TopTabs.Screen name="Randomizer" component={Randomizer} />
          <TopTabs.Screen
            name="RestaurantOverview"
            component={RestaurantsOverview}
            options={{
              title: "Restaurants",
            }}
          />
        </TopTabs.Navigator>
      </NavigationContainer>
    </>
  );
}
