import { Coffee, Camera, Plane, Code2 } from "lucide-react"

const interests = [
  { icon: Coffee, label: "Coffee", emoji: "Fuels my mornings" },
  { icon: Camera, label: "Photography", emoji: "Capturing moments" },
  { icon: Plane, label: "Travel", emoji: "Exploring the world" },
  { icon: Code2, label: "Coding", emoji: "Building the future" },
]

export function About() {
  return (
    <section id="about" className="bg-muted/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get to know me
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            About Me
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <div className="lg:col-span-3">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                {"I'm a passionate web developer and designer based in San Francisco with over 5 years of experience building digital products. I specialize in creating responsive, accessible, and performant websites using modern technologies like React, Next.js, and Tailwind CSS."}
              </p>
              <p>
                {"My journey started with a curiosity for how things work on the internet. After earning my degree in Computer Science, I dove headfirst into the world of front-end development and never looked back. I love the intersection of design and code where creativity meets logic."}
              </p>
              <p>
                {"When I'm not coding, you can find me exploring local coffee shops, capturing street photography, or planning my next travel adventure. I believe the best designs come from diverse experiences and a fresh perspective."}
              </p>
            </div>
          </div>

          {/* Interests */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              Things I Enjoy
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-card-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.emoji}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
