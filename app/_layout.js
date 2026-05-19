import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const icons = {
  index: ["home-outline", "home"],
  sobre: ["person-outline", "person"],
  academica: ["school-outline", "school"],
  profissional: ["briefcase-outline", "briefcase"],
  projetos: ["code-slash-outline", "code-slash"],
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#0f6b5f",
          tabBarInactiveTintColor: "#8b8276",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700"
          },
          tabBarStyle: {
            minHeight: Platform.OS === "ios" ? 82 : 68,
            paddingTop: 8,
            paddingBottom: Platform.OS === "ios" ? 24 : 10,
            borderTopColor: "#ded6c7",
            backgroundColor: "#fffaf2"
          },
          tabBarIcon: ({ color, focused, size }) => {
            const icon = icons[route.name] ?? icons.index;
            return (
              <Ionicons
                name={focused ? icon[1] : icon[0]}
                color={color}
                size={size}
              />
            );
          }
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="sobre" options={{ title: "Sobre" }} />
        <Tabs.Screen name="academica" options={{ title: "Academica" }} />
        <Tabs.Screen name="profissional" options={{ title: "Carreira" }} />
        <Tabs.Screen name="projetos" options={{ title: "Projetos" }} />
      </Tabs>
    </>
  );
}
