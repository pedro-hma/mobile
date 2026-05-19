import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card, Chip, SectionTitle } from "../components/ui";
import { projects } from "../data/profile";

export default function Projetos() {
  return (
    <Screen>
      <SectionTitle eyebrow="Projetos" title="Trabalhos em destaque">
        Abaixo projetos em destaques durante a graduação.
      </SectionTitle>

      {projects.map((project) => (
        <Card key={project.title}>
          <View style={styles.header}>
            <View style={styles.icon}>
              <Ionicons name="terminal-outline" size={20} color="#0f6b5f" />
            </View>
            <Text style={styles.title}>{project.title}</Text>
          </View>
          <Text style={styles.description}>{project.description}</Text>
          <View style={styles.chips}>
            {project.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#e4f3ed",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#1f2b26",
    flex: 1,
    fontSize: 18,
    fontWeight: "900"
  },
  description: {
    color: "#5f665f",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
