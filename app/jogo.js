import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card, SectionTitle } from "../components/ui";

const MAX_ERRORS = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ROUNDS = [
  { word: "REACT", hint: "Biblioteca usada para criar interfaces." },
  { word: "EXPO", hint: "Plataforma usada para executar este aplicativo." },
  { word: "ROUTER", hint: "Modulo responsavel pelas telas e navegacao." },
  { word: "MOBILE", hint: "Tipo de experiencia criada neste portfolio." },
  { word: "GITHUB", hint: "Lugar onde o codigo do projeto e publicado." },
  { word: "COMPONENTE", hint: "Bloco reutilizavel de uma interface." }
];

function chooseRound(previousWord) {
  const options = ROUNDS.filter((round) => round.word !== previousWord);
  return options[Math.floor(Math.random() * options.length)];
}

export default function Jogo() {
  const [round, setRound] = useState(() => chooseRound());
  const [guesses, setGuesses] = useState([]);

  const errors = guesses.filter((letter) => !round.word.includes(letter));
  const correctLetters = guesses.filter((letter) => round.word.includes(letter));
  const won = round.word.split("").every((letter) => correctLetters.includes(letter));
  const lost = errors.length >= MAX_ERRORS;
  const finished = won || lost;
  const maskedWord = useMemo(
    () =>
      round.word
        .split("")
        .map((letter) => (correctLetters.includes(letter) || lost ? letter : "_"))
        .join(" "),
    [correctLetters, lost, round.word]
  );

  function guess(letter) {
    if (finished || guesses.includes(letter)) {
      return;
    }
    setGuesses((current) => [...current, letter]);
  }

  function restart() {
    setRound((current) => chooseRound(current.word));
    setGuesses([]);
  }

  return (
    <Screen>
      <SectionTitle eyebrow="Jogo" title="Forca Dev">
        Descubra a palavra relacionada ao universo de desenvolvimento.
      </SectionTitle>

      <Card tone="green">
        <View style={styles.topRow}>
          <View>
            <Text style={styles.label}>Erros</Text>
            <Text style={styles.score}>{errors.length}/{MAX_ERRORS}</Text>
          </View>
          <TouchableOpacity style={styles.restart} onPress={restart}>
            <Ionicons name="refresh" size={17} color="#0f6b5f" />
            <Text style={styles.restartText}>Nova palavra</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card>
        <View style={styles.playArea}>
          <Hangman errors={errors.length} />
          <View style={styles.clueArea}>
            <Text style={styles.clueLabel}>Dica</Text>
            <Text style={styles.clue}>{round.hint}</Text>
          </View>
        </View>

        <Text style={styles.word}>{maskedWord}</Text>

        {finished ? (
          <View style={[styles.feedback, won ? styles.success : styles.failure]}>
            <Text style={styles.feedbackTitle}>
              {won ? "Voce acertou!" : "Fim de jogo"}
            </Text>
            <Text style={styles.feedbackText}>
              A palavra era {round.word}.
            </Text>
          </View>
        ) : null}
      </Card>

      <View style={styles.keyboard}>
        {LETTERS.map((letter) => {
          const selected = guesses.includes(letter);
          const missed = selected && !round.word.includes(letter);
          const matched = selected && round.word.includes(letter);

          return (
            <TouchableOpacity
              key={letter}
              accessibilityLabel={`Letra ${letter}`}
              disabled={selected || finished}
              onPress={() => guess(letter)}
              style={[
                styles.key,
                matched && styles.keyMatched,
                missed && styles.keyMissed,
                finished && !selected && styles.keyDisabled
              ]}
            >
              <Text
                style={[
                  styles.keyText,
                  (matched || missed) && styles.keyTextSelected
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Screen>
  );
}

function Hangman({ errors }) {
  return (
    <View style={styles.hangman}>
      <View style={styles.ground} />
      <View style={styles.post} />
      <View style={styles.beam} />
      <View style={styles.rope} />
      {errors >= 1 ? <View style={styles.head} /> : null}
      {errors >= 2 ? <View style={styles.bodyLine} /> : null}
      {errors >= 3 ? <View style={[styles.arm, styles.leftArm]} /> : null}
      {errors >= 4 ? <View style={[styles.arm, styles.rightArm]} /> : null}
      {errors >= 5 ? <View style={[styles.leg, styles.leftLeg]} /> : null}
      {errors >= 6 ? <View style={[styles.leg, styles.rightLeg]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  label: {
    color: "#aee8dc",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  score: {
    color: "#ecfff9",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 2
  },
  restart: {
    minHeight: 44,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: "#fffaf2",
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  restartText: {
    color: "#0f6b5f",
    fontWeight: "900"
  },
  playArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginBottom: 18
  },
  hangman: {
    width: 122,
    height: 156,
    position: "relative"
  },
  ground: {
    position: "absolute",
    left: 2,
    bottom: 3,
    width: 94,
    height: 4,
    backgroundColor: "#0f6b5f",
    borderRadius: 2
  },
  post: {
    position: "absolute",
    left: 22,
    bottom: 3,
    height: 145,
    width: 4,
    backgroundColor: "#0f6b5f"
  },
  beam: {
    position: "absolute",
    left: 22,
    top: 8,
    width: 74,
    height: 4,
    backgroundColor: "#0f6b5f"
  },
  rope: {
    position: "absolute",
    left: 91,
    top: 10,
    width: 3,
    height: 22,
    backgroundColor: "#b4552e"
  },
  head: {
    position: "absolute",
    left: 80,
    top: 31,
    width: 25,
    height: 25,
    borderWidth: 3,
    borderColor: "#b4552e",
    borderRadius: 13
  },
  bodyLine: {
    position: "absolute",
    left: 91,
    top: 55,
    height: 43,
    width: 3,
    backgroundColor: "#b4552e"
  },
  arm: {
    position: "absolute",
    top: 67,
    width: 28,
    height: 3,
    backgroundColor: "#b4552e"
  },
  leftArm: {
    left: 66,
    transform: [{ rotate: "-30deg" }]
  },
  rightArm: {
    left: 92,
    transform: [{ rotate: "30deg" }]
  },
  leg: {
    position: "absolute",
    top: 107,
    width: 34,
    height: 3,
    backgroundColor: "#b4552e"
  },
  leftLeg: {
    left: 62,
    transform: [{ rotate: "-50deg" }]
  },
  rightLeg: {
    left: 89,
    transform: [{ rotate: "50deg" }]
  },
  clueArea: {
    flex: 1
  },
  clueLabel: {
    color: "#b4552e",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 7
  },
  clue: {
    color: "#46544c",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  word: {
    color: "#1f2b26",
    textAlign: "center",
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "900",
    marginBottom: 18
  },
  feedback: {
    borderRadius: 8,
    padding: 13
  },
  success: {
    backgroundColor: "#e2f4ec"
  },
  failure: {
    backgroundColor: "#f8e3da"
  },
  feedbackTitle: {
    color: "#1f2b26",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4
  },
  feedbackText: {
    color: "#4d5a52",
    fontWeight: "700"
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    paddingBottom: 12
  },
  key: {
    width: 42,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffaf2",
    borderWidth: 1,
    borderColor: "#dfd5c5"
  },
  keyMatched: {
    backgroundColor: "#0f6b5f",
    borderColor: "#0f6b5f"
  },
  keyMissed: {
    backgroundColor: "#b4552e",
    borderColor: "#b4552e"
  },
  keyDisabled: {
    opacity: 0.46
  },
  keyText: {
    color: "#314139",
    fontSize: 16,
    fontWeight: "900"
  },
  keyTextSelected: {
    color: "#fffaf2"
  }
});
