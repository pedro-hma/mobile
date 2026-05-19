# Pedro Ayres Portfolio - React Native + Expo

Aplicativo de curriculo/portfolio desenvolvido com React Native, Expo e Expo Router.

## Telas

- Home
- Sobre
- Experiencia Academica
- Experiencia Profissional
- Projetos
- Jogo

## Destaques

- Navegacao com Expo Router em abas.
- Visual mobile personalizado.
- Conteudo baseado no portfolio original publicado na Vercel.
- Tela de jogo integrada ao app, sem link externo.
- Jogo da memoria com pontuacao, pares encontrados e botao de reiniciar.

## Como rodar

```bash
npm install
npm start
```

Depois, abra com o app Expo Go pelo QR Code ou rode:

```bash
npm run web
```

## Publicacao no Expo

1. Entre na sua conta Expo:

```bash
npx expo login
```

2. Publique o projeto:

```bash
npx eas update --branch production --message "Portfolio React Native Expo"
```

Se o EAS ainda nao estiver configurado:

```bash
npx eas init
```

## Entrega da atividade

Anexe:

- Link do codigo no GitHub.
- Link do app publicado no Expo.
- Link do video no YouTube com ate 1 minuto, publico ou nao listado.
