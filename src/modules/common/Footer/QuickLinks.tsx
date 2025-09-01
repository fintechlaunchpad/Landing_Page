import React from "react"
import Link from "next/link"
import { quickLinks } from "~/modules/common/data/footerData"

export function QuickLinks() {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-foreground">
        Quick Links
      </h4>
      <ul className="space-y-3 text-sm">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
