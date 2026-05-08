import Task from "@/components/Task";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [idade, setIdade] = useState("");
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
          readOnly
          value={calcularAnoNascimento()}
        />
        <View style={styles.hr} />
        <Link href="myTodoList">Lista de Tarefas</Link>
        <View style={styles.hr} />
        <Task task={{ description: "Tarefa teste", done: true }} />
        <Task task={{ description: "Outro teste", done: false }} />
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