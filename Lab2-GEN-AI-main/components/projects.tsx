import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-commerce Store",
    description:
      "A full-featured online store with product filtering, cart management, and secure checkout built with Next.js and Stripe.",
    image: "/images/project-ecommerce.jpg",
    tags: ["Next.js", "Stripe", "Tailwind"],
  },
  {
    title: "Restaurant Website",
    description:
      "An elegant restaurant site with online reservations, dynamic menu display, and a beautiful gallery section.",
    image: "/images/project-restaurant.jpg",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Portfolio Blog",
    description:
      "A minimalist blog platform with markdown support, syntax highlighting, and a custom CMS for easy content management.",
    image: "/images/project-blog.jpg",
    tags: ["Next.js", "MDX", "Vercel"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Selected work
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            My Projects
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-bold text-card-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 gap-2 self-start rounded-full"
                  asChild
                >
                  <a href="#" aria-label={`View ${project.title} project`}>
                    View Project
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
