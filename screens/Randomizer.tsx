import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../fixture/categories";
import { Restaurant } from "../models/restaurant";
import { getRestaurants } from "../util/database";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useIsFocused } from "@react-navigation/native";
import BigButton from "../components/UI/BigButton";

const Randomizer = ({}: NativeStackScreenProps<any, "Randomizer">) => {
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [chosenRestaurant, setChosenRestaurant] = useState<Restaurant | null>();
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

  function pickRandomRestaurant() {
    const categoryRestaurants =
      selectedCategory === "Any"
        ? restaurants
        : restaurants.filter(
            (restaurant) => restaurant.category === selectedCategory
          );

    if (categoryRestaurants.length === 0) {
      Alert.alert(
        `You haven't added any${
          selectedCategory !== "Any" ? " " + selectedCategory : ""
        } restaurants yet`,
        "Head to the restaurants tab and start adding your favorites places to eat"
      );
    }

    const randomIndex = Math.floor(Math.random() * categoryRestaurants.length);
    const restaurant = categoryRestaurants[randomIndex];
    setChosenRestaurant(restaurant);
  }

  if (chosenRestaurant) {
    return (
      <View style={[styles.container, styles.chosenRestaurantContainer]}>
        <Text style={styles.label}>Today you will eat at:</Text>
        <Text style={styles.chosenRestaurant}>{chosenRestaurant.name}</Text>
        <BigButton onPress={() => setChosenRestaurant(null)}>
          Pick again?
        </BigButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Randomizer</Text>
      <Text style={styles.description}>
        Can't decide what to get for dinner? Let the app pick one of your
        favorite restaurants for you!
      </Text>
      <View style={styles.section}>
        <Text style={styles.label}>1. Choose a Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          {["Any", ...CATEGORIES].map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>2. Press the Button</Text>
        <BigButton onPress={pickRandomRestaurant}>Randomize!</BigButton>
      </View>
    </View>
  );
};

export default Randomizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  chosenRestaurantContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  chosenRestaurant: {
    fontSize: 50,
  },
  section: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 50,
    lineHeight: 22,
  },
  label: {
    fontSize: 18,
  },
});
