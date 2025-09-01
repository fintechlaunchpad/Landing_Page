"use client"

import React from "react"
import { featuresSection } from "../data/features"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { LightbulbIcon, ZapIcon, RocketIcon, BeakerIcon, BriefcaseIcon } from "lucide-react"


const iconMap = {
  LightbulbIcon,
  ZapIcon,
  RocketIcon,
  BeakerIcon,
  BriefcaseIcon,
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full bg-muted/50 py-20 border-t border-border scroll-mt-16"
    >
      <div className="container px-4 mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#705D56]">
          {featuresSection.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresSection.items.map(({ title, description, icon }) => {
            const Icon = (iconMap[icon as keyof typeof iconMap] ?? LightbulbIcon)
            return (
              <div
                key={title}
                className="bg-black rounded-2xl p-6 border border-gray-700 shadow-sm text-center text-white"
              >
                <Icon className="mx-auto mb-4 h-8 w-8 text-white" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-white text-sm">{description}</p>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="default"
                    className="bg-[#705D56] text-white hover:bg-[#5f493f]"
                  >
                    <Link href="/demo">How it works</Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
