import { StyleSheet, Text, View } from "react-native";

export function SectionTitle({ eyebrow, title, children }) {
  return (
    <View style={styles.sectionTitle}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {children ? <Text style={styles.lead}>{children}</Text> : null}
    </View>
  );
}

export function Card({ children, tone = "light" }) {
  return <View style={[styles.card, styles[tone]]}>{children}</View>;
}

export function Chip({ children, dark = false }) {
  return (
    <View style={[styles.chip, dark && styles.chipDark]}>
      <Text style={[styles.chipText, dark && styles.chipTextDark]}>
        {children}
      </Text>
    </View>
  );
}

export function TimelineItem({ title, period, description }) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.dot} />
      <View style={styles.timelineContent}>
        <Text style={styles.period}>{period}</Text>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.body}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 18
  },
  eyebrow: {
    color: "#b4552e",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8
  },
  title: {
    color: "#1f2b26",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900"
  },
  lead: {
    color: "#5f665f",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10
  },
  card: {
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    marginBottom: 14
  },
  light: {
    backgroundColor: "#fffaf2",
    borderColor: "#e7dece"
  },
  green: {
    backgroundColor: "#103f39",
    borderColor: "#0f6b5f"
  },
  chip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d6cbbb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fbf5ea"
  },
  chipDark: {
    borderColor: "#5eb7a8",
    backgroundColor: "#15564e"
  },
  chipText: {
    color: "#34413a",
    fontSize: 12,
    fontWeight: "800"
  },
  chipTextDark: {
    color: "#ecfff9"
  },
  timelineItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#b4552e",
    marginTop: 5
  },
  timelineContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#d8cebf",
    paddingLeft: 16,
    paddingBottom: 4
  },
  period: {
    color: "#0f6b5f",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4,
    textTransform: "uppercase"
  },
  itemTitle: {
    color: "#1f2b26",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6
  },
  body: {
    color: "#626b63",
    fontSize: 15,
    lineHeight: 22
  }
});
