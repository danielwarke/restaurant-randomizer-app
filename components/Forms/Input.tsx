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
  children,
}: {
  label: string;
  textInputConfig?: TextInputProps;
  children?: React.ReactNode;
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {children || <TextInput {...textInputConfig} style={styles.input} />}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    borderColor: GlobalStyles.colors.primaryLight,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 24,
  },
});
