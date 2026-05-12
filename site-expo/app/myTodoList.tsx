import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import Task from "@/components/Task";
import { useTaskFilterStore } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

type TaskType = {
  objectId: string;
  description: string;
  done: boolean;
};

type TasksResponse = {
  results: TaskType[];
};

export default function MyTodoList() {
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery<TasksResponse>({
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

  const { taskDoneFilter, setTaskDoneFilter } = useTaskFilterStore(
    (state: any) => state
  );

  let tasks: TaskType[] = data?.results || [];

  if (taskDoneFilter) {
    tasks = tasks.filter((task: TaskType) => !task.done);
  }

  function handleSubmit() {
    if (!description.trim()) {
      alert("Descrição é um campo obrigatório!");
      return;
    }

    addMutation.mutate({ description });
    setDescription("");
  }

  function handleChange(updatedTask: TaskType) {
    updateMutation.mutate(updatedTask);
  }

  function handleDelete(task: TaskType) {
    deleteMutation.mutate(task);
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

  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#999",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  containerFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
  return (
    <>
      {error && <Text>Erro: {error.message}</Text>}

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
          thumbColor="#f5dd4b"
          ios_backgroundColor="#3e3e3e"
          onValueChange={setTaskDoneFilter}
          value={taskDoneFilter}
        />
      </View>

      <View style={styles.hr} />

      <FlatList
        data={tasks}
        renderItem={({ item }: { item: TaskType }) => (
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
        keyExtractor={(task: TaskType) => task.objectId}
      />
    </>
  );
}