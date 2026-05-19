import { Screen } from "../components/Screen";
import { Card, SectionTitle, TimelineItem } from "../components/ui";
import { professionalExperience } from "../data/profile";

export default function Profissional() {
  return (
    <Screen>
      <SectionTitle eyebrow="Experiencia profissional" title="Pratica aplicada">
        Experiencias voltadas a entregas reais, organizacao de projetos e
        construcao de interfaces com foco em clareza.
      </SectionTitle>

      <Card>
        {professionalExperience.map((item) => (
          <TimelineItem key={item.title} {...item} />
        ))}
      </Card>
    </Screen>
  );
}
