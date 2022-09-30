import { Restaurant } from "../../models/restaurant";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { updateRestaurant } from "../../util/database";

const RestaurantItem = ({ restaurant }: { restaurant: Restaurant }) => {
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(restaurant.favorite);

  async function toggleRestaurantFavorite() {
    try {
      const newFavorite = !favorite;
      await updateRestaurant({
        ...restaurant,
        favorite: newFavorite,
      });
      setFavorite(newFavorite);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.restaurantContainer}>
      <View style={styles.titleContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("ModifyRestaurant", {
              restaurantId: restaurant.id,
            } as any)
          }
        >
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.category}</Text>
        </Pressable>
      </View>
      <View style={styles.favoriteContainer}>
        <Pressable>
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            color="yellow"
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  titleContainer: {
    flex: 4,
  },
  favoriteContainer: {
    flex: 1,
  },
});
