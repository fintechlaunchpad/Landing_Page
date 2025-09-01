"use client"

import React from "react"
import Link from "next/link"
import { hero } from "../data/hero"
import { Button } from "~/components/ui/button"

export function HeroSection() {
  return (
    <section id="hero" className="bg-background text-foreground w-full py-20 border-b border-border scroll-mt-16">
      <div className="container px-4 mx-auto max-w-5xl text-center">
  <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-[#705D56]">
          {hero.headline}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8">
          {hero.subheadline}
        </p>
  <Button asChild variant="default">
          <Link href={hero.ctaHref}>{hero.ctaLabel}</Link>
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">{hero.tagline}</p>
      </div>
    </section>
  )
}
