import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../fixture/categories";
import { GlobalStyles } from "../constants/styles";
import { Restaurant } from "../models/restaurant";
import { getRestaurants } from "../util/database";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useIsFocused } from "@react-navigation/native";

const Randomizer = ({}: NativeStackScreenProps<any, "Randomizer">) => {
  const isFocused = useIsFocused();
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const response = await getRestaurants();
        setRestaurants(response);
        if (response.length === 0) {
          Alert.alert(
            "You haven't added any restaurants yet",
            "Head to the restaurants tab and start adding your favorites places to eat"
          );
        }
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
        <Pressable style={({ pressed }) => pressed && styles.buttonPressed}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Randomize!</Text>
          </View>
        </Pressable>
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
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 22,
  },
  label: {
    fontSize: 18,
  },
  button: {
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.primary,
    height: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonLabel: {
    color: "white",
    fontSize: 20,
  },
});
