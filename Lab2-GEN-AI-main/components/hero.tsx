import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Welcome to my portfolio
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {"Hi, I'm "}
            <span className="text-primary">Sarah Johnson</span>
          </h1>
          <p className="mt-3 font-heading text-lg font-medium text-muted-foreground sm:text-xl">
            Web Developer & Designer
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
            I create beautiful, functional websites that help businesses grow.
            Combining clean code with thoughtful design to deliver digital
            experiences that make an impact.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="gap-2 rounded-full px-7">
              <a href="#projects">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-7"
            >
              <a href="#contact">
                <Mail className="h-4 w-4" />
                Get In Touch
              </a>
            </Button>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative flex-shrink-0">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <Image
              src="/images/hero-portrait.jpg"
              alt="Sarah Johnson, web developer and designer"
              fill
              priority
              className="object-cover"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute inset-0 -m-3 rounded-full border-2 border-dashed border-primary/20" />
        </div>
      </div>
    </section>
  )
}
