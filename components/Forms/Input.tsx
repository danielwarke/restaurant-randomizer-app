import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({
  label,
  textInputConfig,
}: {
  label: string;
  textInputConfig?: TextInputProps;
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderColor: GlobalStyles.colors.primaryLight,
    borderWidth: 1,
    color: GlobalStyles.colors.primaryDark,
    padding: 6,
    borderRadius: 6,
    fontSize: 24,
  },
});
