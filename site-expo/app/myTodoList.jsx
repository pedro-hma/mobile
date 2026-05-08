import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import Task from "@/components/Task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function MyTodoList() {
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const [description, setDescription] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!description) {
      alert("Descrição é um campo obrigatório!");
      return;
    }
    addMutation.mutate({ description });
    setDescription("");
  }

  function handleChange(updatedTask) {
    updateMutation.mutate(updatedTask);
  }

  function handleDelete(task) {
    deleteMutation.mutate(task);
  }

  return (
    <>
      <Text>Lista de Tarefas</Text>
      <View style={styles.hr} />
      {error && <Text>Erro: {error}</Text>}
      {isFetching && <Text>Carregando dados do servidor...</Text>}
      <View style={styles.hr} />
      <View>
        <TextInput
          placeholder="Descrição da tarefa"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          disabled={addMutation.isPending}
          title="Adicionar"
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.hr} />
      {data?.results.length === 0 && (
        <p>Adicione uma tarefa para exibir aqui.</p>
      )}
      <ScrollView>
        {data?.results.map((task) => (
          <Task
            key={task.objectId}
            task={task}
            onChange={handleChange}
            onDelete={handleDelete}
            disabled={
              addMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending
            }
          />
        ))}
      </ScrollView>
      <View style={styles.hr} />
      <Link href="/">Voltar</Link>
      <View style={styles.hr} />
      <Button
        onPress={async () => {
          const backEndTasks = await getTasks();
          console.log("backEndTasks", backEndTasks.data);
        }}
        title="Buscar tarefas no servidor"
      />
    </>
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