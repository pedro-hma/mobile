import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [idade, setIdade] = useState('');
  const anoAtual = new Date().getFullYear();

  const idadeNumero = parseInt(idade) || 0;
  const anoNascimento = idade ? anoAtual - idadeNumero : '';

  function handleIdade(texto: string) {
    // Permite apenas números
    const somenteNumeros = texto.replace(/[^0-9]/g, '');
    setIdade(somenteNumeros);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Linha horizontal */}
      <ThemedView style={styles.linha} />

      {/* Campo idade */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Digite sua idade:</ThemedText>

        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={handleIdade}
          keyboardType="numeric"
          maxLength={3}
          placeholder="Sua idade"
        />

        <ThemedText>Você nasceu em:</ThemedText>

        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={anoNascimento.toString()}
          editable={false}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to
          see changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>

          <Link.Preview />

          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert('Action pressed')}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter
          app.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },

  linha: {
    height: 2,
    width: '95%',
    backgroundColor: '#3498db',
    alignSelf: 'center',
    marginVertical: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '95%',
    backgroundColor: '#fff',
  },

  inputDisabled: {
    backgroundColor: '#ddd',
    color: '#555',
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});