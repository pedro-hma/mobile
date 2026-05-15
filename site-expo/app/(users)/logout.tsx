import { loggingOut } from "@/api";
import { useUserStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Logout() {
  const router = useRouter();
  const { loggedUser, removeLoggedUser } = useUserStore((state) => state);
  const mutation = useMutation({
    mutationFn: loggingOut,
    onSuccess: () => {
      removeLoggedUser();
      router.navigate("/");
    },
  });
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
    mutation.mutate(loggedUser?.sessionToken);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deseja realmente sair?</Text>
      <Button
        disabled={mutation.isPending}
        title="Log Out"
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
    marginBottom: 15,
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