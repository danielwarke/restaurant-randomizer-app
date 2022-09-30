import { Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";

const ModifyRestaurant = ({}: NativeStackScreenProps<
  any,
  "ModifyRestaurant"
>) => {
  return (
    <View>
      <Text>Modify Restaurant</Text>
    </View>
  );
};

export default ModifyRestaurant;
