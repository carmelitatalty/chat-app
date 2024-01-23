import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBEpvcTiHXiDsMe4YlBGLwHdhWKXbr1t3I",
    authDomain: "chat-app-carmelita.firebaseapp.com",
    projectId: "chat-app-carmelita",
    storageBucket: "chat-app-carmelita.appspot.com",
    messagingSenderId: "897168742904",
    appId: "1:897168742904:web:48451a1489f3c823a85e0d",
    measurementId: "G-6EWJE0E55W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Create the navigator
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
