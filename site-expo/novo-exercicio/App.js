import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

export default function App() {
  const links = [
    { title: "GitHub", url: "https://github.com/pedro-hma" },
    { title: "LinkedIn", url: "https://linkedin.com" },
    { title: "Portfólio", url: "https://google.com" },
  ];

  const projects = [
    "Mini Bio",
    "Sistema Web",
    "App Mobile",
    "Dashboard React",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/300",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Pedro Ayres</Text>
      <Text style={styles.role}>Desenvolvedor Full Stack</Text>

      <Text style={styles.bio}>
        Criando soluções web e mobile com React, Node.js e paixão por tecnologia.
      </Text>

      <View style={styles.linksContainer}>
        {links.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Projetos</Text>

      {projects.map((project, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardText}>{project}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    padding: 30,
    paddingTop: 60,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#38bdf8",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 15,
  },
  bio: {
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  linksContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  section: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
  },
});