import { useTaskFilterStore, useUserStore } from "@/zustand";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [idade, setIdade] = useState("");
  const taskDoneFilter = useTaskFilterStore((state) => state.taskDoneFilter);
  const loggedUser = useUserStore((state) => state.loggedUser);

  function calcularAnoNascimento() {
    const idadeNum = parseInt(idade);

    if (isNaN(idadeNum) || idadeNum < 0) {
      return "-";
    }

    const anoAtual = new Date().getFullYear();
    return (anoAtual - idadeNum).toString();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Olá Turma!!!</Text>

      <View style={styles.hr} />

      <View style={styles.containerIdade}>
        <Text>Digite a sua idade</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        <Text>Você nasceu em</Text>

        <TextInput
          style={styles.input}
          editable={false}
          value={calcularAnoNascimento()}
        />

        <View style={styles.hr} />

        <Link href="/myTodoList">
          Lista de Tarefas (filtro {taskDoneFilter ? "ativado" : "desativado"})
        </Link>

        <View style={styles.hr} />

        <Text style={styles.username}>
          Usuário Logado:{" "}
          {loggedUser ? (
            <Link href="/userDetails">{loggedUser.username}</Link>
          ) : (
            "Nenhum"
          )}
        </Text>

        {loggedUser ? (
          <Link href="/logout">Sair</Link>
        ) : (
          <>
            <Link href="/login">Login Usuário</Link>
            <Link href="/signUp">Signing Up</Link>
          </>
        )}

        <View style={styles.hr} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  hr: {
    height: 1,
    width: "90%",
    backgroundColor: "black",
    marginVertical: 30,
  },
  containerIdade: {
    backgroundColor: "yellow",
    width: "90%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});