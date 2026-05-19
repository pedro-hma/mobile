import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card, Chip, SectionTitle } from "../components/ui";
import { profile, technologies } from "../data/profile";

export default function Sobre() {
  return (
    <Screen>
      <SectionTitle eyebrow="Sobre" title="Perfil tecnico e criativo">
        Sou desenvolvedor com forte interesse em tecnologia, programacao e
        criacao de solucoes digitais. Gosto de escrever codigo organizado e
        transformar ideias em experiencias simples de usar.
      </SectionTitle>

      <Card>
        <Text style={styles.body}>
          Tenho experiencia com Java, Programacao Orientada a Objetos,
          Estruturas de Dados e desenvolvimento web utilizando React, Next.js e
          TypeScript. Nesta versao mobile, o curriculo foi reconstruido com
          React Native, Expo e Expo Router.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Tecnologias e modulos usados</Text>
        <View style={styles.chips}>
          {technologies.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </View>
      </Card>

      <Card tone="green">
        <Text style={styles.darkTitle}>Contato</Text>
        <Contact icon="mail-outline" text={profile.email} />
        <Contact icon="logo-linkedin" text={profile.linkedin} />
        <Contact icon="logo-github" text={profile.github} />
        <Contact icon="globe-outline" text={profile.portfolio} />
      </Card>
    </Screen>
  );
}

function Contact({ icon, text }) {
  return (
    <View style={styles.contact}>
      <Ionicons name={icon} size={18} color="#aee8dc" />
      <Text style={styles.contactText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    color: "#4d5a52",
    fontSize: 16,
    lineHeight: 24
  },
  cardTitle: {
    color: "#1f2b26",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  darkTitle: {
    color: "#ecfff9",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },
  contactText: {
    color: "#ecfff9",
    flex: 1,
    fontWeight: "700"
  }
});
