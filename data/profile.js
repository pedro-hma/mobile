import { Link } from "expo-router";

export const profile = {
  name: "Pedro Ayres",
  role: "Desenvolvedor Frontend",
  headline:
    "Construo interfaces modernas com React, Next.js, TypeScript e agora React Native com Expo.",
  location: "Recife, PE",
  email: "pedrohayres11@gmail.com",
  linkedin: "linkedin.com/in/pedro-henrique-ayres-563145246",
  github: "github.com/pedro-hma",
  portfolio: "portifolio-beta-ebon.vercel.app"
};

export const technologies = [
  "React Native",
  "Expo",
  "Expo Router",
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Java",
  "POO",
  "Estruturas de Dados",
  "C",
  "Git e GitHub",
  "Vercel",
  "UI Mobile"
];

export const academicExperience = [
  {
    title: "Ciencia da Computacao UNICAP",
    period: "Em andamento",
    description:
      "Curso bacharelado, com disciplinas tecnicas e desenvolvimento cientifico e tecnologico da computacao, a fim de atender as necessidades das organizacoes e da sociedade."
  }
];

export const professionalExperience = [
  {
    title: "Desenvolvedor Frontend em evolucao",
    period: "Atual",
    description:
      "Criacao de interfaces responsivas, componentes reutilizaveis e paginas com foco em experiencia de uso."
  },
  {
    title: "Projeto Final de Estagiario - CEO",
    period: "Experiencia pratica",
    description:
      "Projeto final desenvolvido durante estagio, aplicando desenvolvimento de software, organizacao de entrega e resolucao de problemas."
  }
];

export const projects = [
  {
    title: "Prontuario Psicologico",
    description:
      "Sistema web para gerenciamento de prontuarios psicologicos, com foco em organizacao clinica, usabilidade e seguranca das informacoes.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Projeto Vida Plena",
    description:
      "Aplicacao pratica com foco em organizacao, estrutura de funcionalidades e logica de negocio.",
    tags: ["Java"]
  },
  {
    title: "Projeto Final de Estagiario - CEO",
    description:
      "Aplicacao de jogo estilo RPG aplicando conceito de POO, interface e interatividade via terminal.",
    tags: ["Java"],
    link : Link 
  },
  {
    title: "Projeto POO",
    description:
      "Projeto academico focado nos pilares da Programacao Orientada a Objetos.",
    tags: ["Java", "POO"]
  },
  {
    title: "Estrutura de Dados",
    description:
      "Implementacoes de estruturas de dados classicas, com foco em logica e algoritmos. Sistema de gerenciamento de biblioteca.",
    tags: ["C"]
  },
  {
    title: "Projeto Final PE 2024.1",
    description:
      "Projeto final da disciplina de Programacao Estruturada. Aplicacao base de musica.",
    tags: ["C"]
  }
];
