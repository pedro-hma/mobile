import { retrievingCurrentUser } from "@/api/users";
import { useUserStore } from "@/zustand";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function UserDetails() {
  const loggedUser = useUserStore((state) => state.loggedUser);
  const { data, isFetching, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => retrievingCurrentUser(loggedUser.sessionToken),
  });

  return (
    <>
      {error && <Text>Erro: {error.message}</Text>}
      {isFetching && <ActivityIndicator size="large" />}
      {(error || isFetching) && <View style={styles.hr} />}
      <View>
        <Text>{JSON.stringify(data ?? {}, null, 2)}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hr: {
    height: 1,
    width: "90%",
    backgroundColor: "black",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
});