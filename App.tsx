import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Randomizer from "./screens/Randomizer";
import RestaurantList from "./screens/RestaurantList";

SplashScreen.preventAutoHideAsync();

const TopTabs = createMaterialTopTabNavigator();

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
        <TopTabs.Navigator initialRouteName="Restaurants">
          <TopTabs.Screen name="Randomizer" component={Randomizer} />
          <TopTabs.Screen name="Restaurants" component={RestaurantList} />
        </TopTabs.Navigator>
      </NavigationContainer>
    </>
  );
}
