import { Restaurant } from "../../models/restaurant";
import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "../../fixture/categories";

const RestaurantForm = ({
  restaurant,
  onSubmit,
  onCancel,
  onDelete,
}: {
  restaurant?: Restaurant;
  onSubmit: (name: string, category: string) => void;
  onCancel: Function;
  onDelete: Function;
}) => {
  const [name, setName] = useState(restaurant?.name || "");
  const [category, setCategory] = useState(
    restaurant?.category || CATEGORIES[0]
  );

  return (
    <View style={styles.form}>
      <Input
        label="Name"
        textInputConfig={{
          placeholder: "Restaurant name",
          onChangeText: setName,
          value: name,
        }}
      />
      <Picker selectedValue={category} onValueChange={setCategory}>
        {CATEGORIES.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Cancel"
            onPress={() => onCancel()}
            color={GlobalStyles.colors.primaryDark}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Save"
            onPress={() => onSubmit(name, category)}
            disabled={!name || !category}
            color={GlobalStyles.colors.secondary}
          ></Button>
        </View>
      </View>
      {restaurant && (
        <View style={styles.deleteButtonContainer}>
          <View style={styles.deleteButton}>
            <Button
              title="Delete"
              onPress={() => onDelete()}
              color={GlobalStyles.colors.error}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default RestaurantForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
