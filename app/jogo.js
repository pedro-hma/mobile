import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card, SectionTitle } from "../components/ui";

const baseCards = ["RN", "EX", "JS", "UX", "API", "GIT"];

function shuffleCards() {
  return [...baseCards, ...baseCards]
    .map((label, index) => ({
      id: `${label}-${index}-${Math.random()}`,
      label,
      matched: false
    }))
    .sort(() => Math.random() - 0.5);
}

export default function Jogo() {
  const [cards, setCards] = useState(() => shuffleCards());
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const matchedCount = useMemo(
    () => cards.filter((card) => card.matched).length,
    [cards]
  );
  const finished = matchedCount === cards.length;

  function restart() {
    setCards(shuffleCards());
    setSelected([]);
    setMoves(0);
    setLocked(false);
  }

  function chooseCard(card) {
    if (locked || card.matched || selected.some((item) => item.id === card.id)) {
      return;
    }

    const nextSelected = [...selected, card];
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((current) => current + 1);
      setLocked(true);

      if (nextSelected[0].label === nextSelected[1].label) {
        setCards((current) =>
          current.map((item) =>
            item.label === card.label ? { ...item, matched: true } : item
          )
        );
        setSelected([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setSelected([]);
          setLocked(false);
        }, 700);
      }
    }
  }

  return (
    <Screen>
      <SectionTitle eyebrow="Jogo" title="Memoria Dev">
        Encontre os pares das tecnologias. O jogo roda dentro do app, sem link
        externo.
      </SectionTitle>

      <Card tone="green">
        <View style={styles.scoreRow}>
          <View>
            <Text style={styles.scoreLabel}>Movimentos</Text>
            <Text style={styles.scoreValue}>{moves}</Text>
          </View>
          <View>
            <Text style={styles.scoreLabel}>Pares</Text>
            <Text style={styles.scoreValue}>{matchedCount / 2}/6</Text>
          </View>
          <TouchableOpacity style={styles.restart} onPress={restart}>
            <Text style={styles.restartText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <View style={styles.board}>
        {cards.map((card) => {
          const visible =
            card.matched || selected.some((item) => item.id === card.id);

          return (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.85}
              style={[styles.card, visible && styles.cardVisible]}
              onPress={() => chooseCard(card)}
            >
              <Text style={[styles.cardText, visible && styles.cardTextVisible]}>
                {visible ? card.label : "?"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {finished ? (
        <Card>
          <Text style={styles.winTitle}>Parabens!</Text>
          <Text style={styles.winText}>
            Voce completou o jogo em {moves} movimentos.
          </Text>
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  scoreLabel: {
    color: "#aee8dc",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  scoreValue: {
    color: "#ecfff9",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 2
  },
  restart: {
    minHeight: 42,
    borderRadius: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffaf2"
  },
  restartText: {
    color: "#0f6b5f",
    fontWeight: "900"
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 14
  },
  card: {
    width: "30.5%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#173a36",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0f6b5f"
  },
  cardVisible: {
    backgroundColor: "#fffaf2",
    borderColor: "#b4552e"
  },
  cardText: {
    color: "#ecfff9",
    fontSize: 28,
    fontWeight: "900"
  },
  cardTextVisible: {
    color: "#b4552e",
    fontSize: 22
  },
  winTitle: {
    color: "#1f2b26",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6
  },
  winText: {
    color: "#5f665f",
    fontSize: 16
  }
});
