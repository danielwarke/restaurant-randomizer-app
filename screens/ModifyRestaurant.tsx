import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useEffect, useState } from "react";
import { Restaurant } from "../models/restaurant";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurantDetails,
  updateRestaurant,
} from "../util/database";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import RestaurantForm from "../components/Forms/RestaurantForm";

const ModifyRestaurant = ({
  route,
  navigation,
}: NativeStackScreenProps<any, "ModifyRestaurant">) => {
  const restaurantId = route.params?.restaurantId;
  const isEditing = !!restaurantId;

  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadRestaurant() {
      try {
        if (!restaurantId) return;
        setIsLoading(true);
        const response = await getRestaurantDetails(restaurantId);
        setRestaurant(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to fetch reminder.");
      }
    }

    loadRestaurant();
  }, [restaurantId]);

  async function onDelete() {
    if (!restaurantId) return;
    setIsLoading(true);
    try {
      await deleteRestaurant(restaurantId);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage("Unable to delete restaurant");
    }
  }

  async function onSubmit(name: string, category: string) {
    setIsLoading(true);
    try {
      if (isEditing) {
        if (!restaurant) return;
        await updateRestaurant({
          ...restaurant,
          name,
          category,
        });
      } else {
        await createRestaurant(name, category);
      }

      navigation.navigate("RestaurantList");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setErrorMessage("Unable to save restaurant");
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (errorMessage) {
    return <ErrorOverlay message={errorMessage} />;
  }

  return (
    <View style={styles.container}>
      <RestaurantForm
        restaurant={restaurant}
        onSubmit={onSubmit}
        onCancel={() => navigation.goBack()}
        onDelete={onDelete}
      />
    </View>
  );
};

export default ModifyRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
