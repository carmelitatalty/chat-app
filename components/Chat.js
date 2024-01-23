import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);

  // Send first messages.
  useEffect(() => {
    let unsubMessages;
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubShoppinglists();
      unsubMessages = null;

      const qry = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(qry, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch {
      console.log(error.message);
    }
  };

  // Update messages when new message is created.
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "plum",
          },
          left: {
            backgroundColor: "lightblue",
          },
        }}
      />
    );
  };

  const { name, backgroundColor, userID } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Renders custom views for chat bubbles. IE Map.
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userID,
            name: name,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
