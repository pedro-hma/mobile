import axios from "axios";

const urlBase = "https://parseapi.back4app.com/";
const headers = {
  "X-Parse-Application-Id": "ortn41B33LH89PU5JexteP1etYzjfH6AdtSi6CHb",
  "X-Parse-REST-API-Key": "5wPkNP3a0Aq3Kbn2ddeFTQOBVDaMT0giiSGYt5Sx",
};
const headerJson = {
  "Content-Type": "application/json",
};
const headerRevocableSession = {
  "X-Parse-Revocable-Session": "1",
};
const instance = axios.create({
  baseURL: urlBase,
  headers,
});

// user = { password: "", username: "", email: "" }
export const signingUp = async (user) => {
  const { data } = await instance.post("/users", user, {
    headers: { ...headerJson, ...headerRevocableSession },
  });
  return data;
};

export const loggingIn = async (user) => {
  const { data } = await instance.post("/login", user, {
    headers: { ...headerJson, ...headerRevocableSession },
  });
  return data;
};

export const loggingOut = async (sessionToken) => {
  const { data } = await instance.post("/logout", {
    headers: { "X-Parse-Session-Token": sessionToken },
  });
  return data;
};

export const retrievingCurrentUser = async (sessionToken) => {
  const { data } = await instance.get("/users/me", {
    headers: { "X-Parse-Session-Token": sessionToken },
  });
  return data;
};