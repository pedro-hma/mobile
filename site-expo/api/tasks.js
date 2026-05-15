import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Task";
const headers = {
  "X-Parse-Application-Id": "ortn41B33LH89PU5JexteP1etYzjfH6AdtSi6CHb",
  "X-Parse-REST-API-Key": "5wPkNP3a0Aq3Kbn2ddeFTQOBVDaMT0giiSGYt5Sx",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export const getTasks = async () => {
  const { data } = await axios.get(urlBase, {
    headers,
  });
  return data;
};

export const addTask = async (newTask) => {
  const { data } = await axios.post(urlBase, newTask, {
    headers: headersJson,
  });
  return data;
};

export const updateTask = async (updatedTask) => {
  console.log("API updatedTask", updatedTask);
  const { data } = await axios.put(
    `https://parseapi.back4app.com/classes/Task/${updatedTask.objectId}`,
    {
      description: updatedTask.description,
      done: updatedTask.done,
    },
    {
      headers: headersJson,
    },
  );
  console.log("updatedTask: ", data);
  return data;
};

export const deleteTask = async (task) => {
  const { data } = await axios.delete(
    `https://parseapi.back4app.com/classes/Task/${task.objectId}`,
    {
      headers,
    },
  );
  return data;
};