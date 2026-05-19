import { Screen } from "../components/Screen";
import { Card, SectionTitle, TimelineItem } from "../components/ui";
import { academicExperience } from "../data/profile";

export default function Academica() {
  return (
    <Screen>
      <SectionTitle eyebrow="Experiencia academica" title="Base de formacao">
        UNICAP (2022 - HOJE)
      </SectionTitle>

      <Card>
        {academicExperience.map((item) => (
          <TimelineItem key={item.title} {...item} />
        ))}
      </Card>
    </Screen>
  );
}
