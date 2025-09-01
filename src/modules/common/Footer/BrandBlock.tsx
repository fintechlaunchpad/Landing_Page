import React from "react"
import { brandInfo } from "~/modules/common/data/footerData"

export function BrandBlock() {
  return (
    <div className="space-y-6 flex flex-col items-start">
      <div className="space-y-3">
        <h4 className="text-xl font-bold text-foreground text-[#705D56]">
          {brandInfo.title}
        </h4>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
          {brandInfo.description}
        </p>
      </div>

      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-foreground">Our Partners</h5>
        <div className="flex items-center gap-6 flex-wrap">
          {brandInfo.partners.map((partner) => (
            <div key={partner.alt} className="flex items-center">
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
