import React from "react"
import { Linkedin, Instagram, Youtube } from "lucide-react"
import { socialLinks } from "~/modules/common/data/footerData"

const icons = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
}

export function SocialLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-foreground">
        Follow On
      </h4>
      <div className="flex gap-4">
        {socialLinks.map((link) => {
          const Icon = icons[link.icon as keyof typeof icons]
          if (!Icon) {
            console.warn(`Icon not found for: ${link.icon}`)
            return null
          }
          return (
            <a
              key={link.icon}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 ring-ring transition-colors duration-200"
            >
              <Icon className="w-5 h-5" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
