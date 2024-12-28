import react from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Background from "../components/Background";
import { Colors } from "../constants/Colors";

const SuccessRegister = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const roundedHeight = Math.ceil(height / 100) * 100;
  const marginTop = roundedHeight <= 400 ? 60 : 200;

  return (
    <>
      <Background>
        <View style={[styles.container, { marginTop: marginTop }]}>
          <Ionicons
            name="checkmark"
            size={65}
            color="white"
            style={styles.check}
          />
        </View>
        <View>
          <Text style={styles.text}>
            Your account has been successfully registered.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </Background>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  check: {
    padding: 15,
    backgroundColor: "green",
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.brown50,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.brown500,
    paddingVertical: 8,
    marginHorizontal: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.brown50,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SuccessRegister;
