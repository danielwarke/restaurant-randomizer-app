import { Pressable, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const FloatingCreateButton = ({ onPress }: { onPress: Function }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <View style={styles.button}>
        <Ionicons name="add" color="white" size={50} />
      </View>
    </Pressable>
  );
};

export default FloatingCreateButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: GlobalStyles.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
