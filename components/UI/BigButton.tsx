import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const BigButton = ({
  onPress,
  children,
}: {
  onPress: Function;
  children: React.ReactNode;
}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({ pressed }) => pressed && styles.buttonPressed}
    >
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default BigButton;

const styles = StyleSheet.create({
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
