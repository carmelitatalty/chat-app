import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Alert } from "react-native";

const Start = ({ navigation }) => {
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackgroundImage.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.appTitle}>App Title</Text>
        <View style={styles.mainContainer}>
          <TextInput
            style={[styles.textInput, styles.component]}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          <Text style={[styles.chooseColor, styles.component]}>
            Choose Background Color
          </Text>
          <View style={[styles.colorButtonContainer, styles.component]}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  backgroundColor === color && styles.selectedColor,
                ]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
          <TouchableOpacity
            title="Start Chatting"
            onPress={signInUser}
            style={[styles.component, styles.startChattingButton]}
          >
            <Text style={[styles.startChattingText]}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "99%",
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    marginLeft: "6%",
    marginRight: "6%",
    marginBottom: "6%",
    borderRadius: 10,
  },
  component: {
    // flex: 1,
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    // color: "#757083",
    height: 50,
    width: "88%",
  },
  textInput: {
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "800",
    width: "100%",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    margin: 30,
    textAlign: "center",
  },
  chooseColor: {
    textAlign: "left",
  },
  colorButtonContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  colorButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
    marginTop: -20,
    marginLeft: 20,
  },
  startChattingButton: {
    backgroundColor: "#757083",
    padding: 15,
    margin: 20,
    alignItems: "center",
    width: "88%",
    borderRadius: 10,
  },
  startChattingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  padding: 50,
  selectedColor: {},
});

export default Start;
