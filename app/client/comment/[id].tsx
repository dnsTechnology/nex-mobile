import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "client" },
    { id: "2", text: "Hi bro!", sender: "user" },
  ]);

  const flatRef = useRef<FlatList>(null);

  const send = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  useEffect(() => {
    if (flatRef.current) {
      flatRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.msg,
                item.sender === "user" ? styles.user : styles.client,
              ]}
            >
              <Text style={{ color: "#000" }}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 12 }}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder='Message'
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.btn} onPress={send}>
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  msg: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    maxWidth: "75%",
  },
  user: {
    backgroundColor: "#0D6EFD",
    alignSelf: "flex-end",
  },
  client: {
    backgroundColor: "#e5e5e5",
    alignSelf: "flex-start",
  },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },

  btn: {
    backgroundColor: "#0D6EFD",
    paddingHorizontal: 15,
    marginLeft: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
