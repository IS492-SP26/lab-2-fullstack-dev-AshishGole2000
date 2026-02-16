const skillGroups = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
  },
  {
    category: "Design Tools",
    skills: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    category: "Other",
    skills: ["WordPress", "Git", "Node.js", "Tailwind CSS"],
  },
]

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Frontend: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  "Design Tools": {
    bg: "bg-chart-2/10",
    text: "text-chart-2",
    border: "border-chart-2/20",
  },
  Other: {
    bg: "bg-chart-3/10",
    text: "text-chart-3",
    border: "border-chart-3/20",
  },
}

export function Skills() {
  return (
    <section id="skills" className="bg-muted/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            What I work with
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {"Skills & Technologies"}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group) => {
            const colors = categoryColors[group.category]
            return (
              <div
                key={group.category}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-5 font-heading text-base font-bold text-card-foreground">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-shadow hover:shadow-sm ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
