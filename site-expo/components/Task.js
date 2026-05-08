import { useState } from "react";
import { Button, StyleSheet, Switch, TextInput, View } from "react-native";

export default function Task({ task, onChange, onDelete, disabled }) {
  const [description, setDescription] = useState(task.description);
  function handleChange() {
    const updatedTask = { objectId: task.objectId, done: !task.done };
    onChange(updatedTask);
  }
  function handleDelete() {
    onDelete(task);
  }
  return (
    <View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        readOnly={true}
        maxLength={50}
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={!disabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleChange}
        disabled={disabled}
        value={task.done}
      />
      <Button onPress={handleDelete} disabled={disabled} title="🗑" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
});