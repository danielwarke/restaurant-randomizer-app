import { Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/native-stack";

const RestaurantList = ({}: NativeStackScreenProps<any, "Restaurants">) => {
  return (
    <View>
      <Text>Restaurant list</Text>
    </View>
  );
};

export default RestaurantList;
