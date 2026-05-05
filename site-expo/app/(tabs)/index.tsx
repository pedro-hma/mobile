import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Olá Turma!!!</Text>
      <View style={styles.hr} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "beige",
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