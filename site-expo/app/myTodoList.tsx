import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import Task from "@/components/Task";
import { useTaskFilterStore } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

// ✅ Definindo o tipo Task
type TaskType = {
  objectId: string;
  description: string;
  done: boolean;
};

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
      setDescription("");
    },
  });

  const [description, setDescription] = useState("");
  const { taskDoneFilter, setTaskDoneFilter } = useTaskFilterStore(
    (state) => state
  );

  let tasks: TaskType[] = data?.results || [];
  if (taskDoneFilter) {
    tasks = tasks.filter((task) => !task.done);
  }

  // ✅ Função para adicionar tarefa
  function handleSubmit() {
    if (!description) {
      Alert.alert("Erro", "Descrição é um campo obrigatório!");
      return;
    }
    addMutation.mutate({ description });
  }

  // ✅ Função para atualizar tarefa
  function handleChange(updatedTask: TaskType) {
    updateMutation.mutate(updatedTask);
  }

  // ✅ Função para deletar tarefa
  function handleDelete(task: TaskType) {
    deleteMutation.mutate(task);
  }

  return (
    <>
      {/* ✅ Convertendo o erro para string */}
      {error && <Text>Erro: {(error as Error).message}</Text>}

      {isFetching && <ActivityIndicator size="large" />}
      {(error || isFetching) && <View style={styles.hr} />}

      <View>
        <TextInput
          style={styles.input}
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

      <View style={styles.containerFilter}>
        <Text>Ocultar tarefas concluídas</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#f5dd4b"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setTaskDoneFilter}
          value={taskDoneFilter}
        />
      </View>

      <View style={styles.hr} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task
            task={item}
            onChange={handleChange}
            onDelete={handleDelete}
            disabled={
              addMutation.isPending ||
              updateMutation.isPending ||
              deleteMutation.isPending
            }
          />
        )}
        keyExtractor={(task) => task.objectId}
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
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
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
  containerFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});