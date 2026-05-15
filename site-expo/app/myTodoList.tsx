import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import Task from "@/components/Task";
import { useTaskFilterStore, useUserStore } from "@/zustand";
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

export default function MyTodoList() {
  const loggedUser = useUserStore((state) => state.loggedUser);
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      console.log("addTarefas sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log("addTarefas erro!", error);
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
    (state) => state,
  );

  let tasks = data?.results || [];
  if (taskDoneFilter) {
    tasks = tasks.filter((task) => !task.done);
  }

  function handleSubmit() {
    if (!description) {
      Alert.alert("Erro", "Descrição é um campo obrigatório!");
      return;
    }
    addMutation.mutate({ description, sessionToken: loggedUser?.sessionToken });
  }

  function handleChange(updatedTask) {
    updateMutation.mutate(updatedTask);
  }

  function handleDelete(task) {
    deleteMutation.mutate(task);
  }

  return (
    <>
      {error && <Text>Erro: {error}</Text>}
      {isFetching && <ActivityIndicator size="large" />}
      {(error || isFetching) && <View style={styles.hr} />}
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