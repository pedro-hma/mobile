import { loggingIn } from "@/api";
import { useUserStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const setLoggedUser = useUserStore((state) => state.setLoggedUser);
  const mutation = useMutation({
    mutationFn: loggingIn,
    onSuccess: (data) => {
      console.log("login data", data);
      setLoggedUser(data);
      router.navigate("/");
    },
  });
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
    if (!user.username || !user.password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }
    mutation.mutate(user);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
        autoComplete="username"
        autoCorrect={false}
        textContentType="username"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        secureTextEntry
        autoComplete="new-password"
        autoCorrect={false}
        textContentType="password"
      />
      <Button
        disabled={mutation.isPending}
        title="Log In"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 15,
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: "center",
  },
});