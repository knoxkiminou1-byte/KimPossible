import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BookText, Trophy, Award, Users } from "lucide-react";

const milestones = [
  {
    icon: BookText,
    title: "Published Author",
    description: "Seven published works on faith, love, and mental survival, all written by age 19"
  },
  {
    icon: Trophy,
    title: "Multi Sport Athlete",
    description: "Varsity basketball captain and multi sport leader with NCAA eligibility registration"
  },
  {
    icon: Users,
    title: "Youth Brand Founder",
    description: "Co founder of The Tee Shirt Teens, a youth run creative brand building authentic voice"
  },
  {
    icon: Award,
    title: "Community Recognition",
    description: "Miles Hall Breaking Barriers Award winner, honored for public speaking and community voice"
  }
];

export default function Milestones() {
  const titleRef = useScrollAnimation();

  return (
    <section id="milestones" className="py-32 bg-muted/30" data-testid="milestones-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 animate-on-scroll"
            data-testid="milestones-title"
          >
            Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => {
            const cardRef = useScrollAnimation();
            const Icon = milestone.icon;

            return (
              <div
                key={index}
                ref={cardRef}
                className="animate-on-scroll"
                data-testid={`milestone-card-${index}`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3" data-testid={`milestone-title-${index}`}>
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`milestone-description-${index}`}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
