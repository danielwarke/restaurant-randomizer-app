import { Text, View, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Restaurant } from "../models/restaurant";
import { getRestaurants } from "../util/database";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import RestaurantItem from "../components/Restaurants/RestaurantItem";
import FloatingCreateButton from "../components/UI/FloatingCreateButton";

const RestaurantList = ({
  navigation,
}: NativeStackScreenProps<any, "RestaurantList">) => {
  const isFocused = useIsFocused();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const response = await getRestaurants();
        setRestaurants(response);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch restaurants");
      }
    }

    if (isFocused) {
      loadRestaurants();
    }
  }, [isFocused]);

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} />;
  }

  const createButton = (
    <FloatingCreateButton
      onPress={() => navigation.navigate("ModifyRestaurant")}
    />
  );

  if (restaurants.length === 0) {
    return (
      <>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No restaurants have been added
          </Text>
        </View>
        {createButton}
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={restaurants}
          renderItem={(itemData) => (
            <RestaurantItem restaurant={itemData.item} />
          )}
        />
      </View>
      {createButton}
    </>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
  },
});
