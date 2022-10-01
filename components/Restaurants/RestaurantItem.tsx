import { Restaurant } from "../../models/restaurant";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { updateRestaurant } from "../../util/database";
import { GlobalStyles } from "../../constants/styles";

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
          onPress={() => {
            // @ts-ignore
            navigation.navigate("ModifyRestaurant", {
              restaurantId: restaurant.id,
            });
          }}
        >
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.category}>{restaurant.category}</Text>
        </Pressable>
      </View>
      <View style={styles.favoriteContainer}>
        <Pressable onPress={toggleRestaurantFavorite}>
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            color={GlobalStyles.colors.secondary}
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb5b5",
  },
  titleContainer: {
    flex: 8,
  },
  name: {
    fontSize: 24,
    marginBottom: 6,
  },
  category: {
    fontSize: 16,
  },
  favoriteContainer: {
    flex: 1,
  },
});
