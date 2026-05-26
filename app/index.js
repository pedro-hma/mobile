import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card, Chip } from "../components/ui";
import { profile, technologies } from "../data/profile";

export default function Home() {
  return (
    <Screen>
      <LinearGradient
        colors={["#fff7e8", "#d7f2e8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>PA</Text>
        </View>
        <Text style={styles.kicker}>{profile.location}</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{profile.role}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <View style={styles.actions}>
          <Link href="/projetos" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="code-slash" size={18} color="#fffaf2" />
              <Text style={styles.primaryText}>Projetos</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/jogo" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="game-controller" size={18} color="#0f6b5f" />
              <Text style={styles.secondaryText}>Jogar</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </LinearGradient>

      <View style={styles.metrics}>
        <Card>
          <Text style={styles.metricNumber}>6</Text>
          <Text style={styles.metricLabel}>Telas no app</Text>
        </Card>
        <Card>
          <Text style={styles.metricNumber}>14+</Text>
          <Text style={styles.metricLabel}>Tecnologias</Text>
        </Card>
      </View>

      <Card tone="green">
        <Text style={styles.darkTitle}>Stack principal</Text>
        <View style={styles.chips}>
          {technologies.slice(0, 6).map((tech) => (
            <Chip key={tech} dark>
              {tech}
            </Chip>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e1d4bd",
    marginBottom: 14
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#103f39",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  avatarText: {
    color: "#fffaf2",
    fontSize: 24,
    fontWeight: "900"
  },
  kicker: {
    color: "#b4552e",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 8
  },
  name: {
    color: "#1f2b26",
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900"
  },
  role: {
    color: "#0f6b5f",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4
  },
  headline: {
    color: "#4d5a52",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22
  },
  primaryButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#0f6b5f",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  primaryText: {
    color: "#fffaf2",
    fontWeight: "900"
  },
  secondaryButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0f6b5f",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fffaf2"
  },
  secondaryText: {
    color: "#0f6b5f",
    fontWeight: "900"
  },
  metrics: {
    flexDirection: "row",
    gap: 12
  },
  metricNumber: {
    color: "#b4552e",
    fontSize: 28,
    fontWeight: "900"
  },
  metricLabel: {
    color: "#5f665f",
    fontWeight: "800",
    marginTop: 4
  },
  darkTitle: {
    color: "#ecfff9",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
