// src/modules/common/data/headerData.ts

export const headerData = {
  logo: {
    src: "/assets/brandlogo.svg",
    alt: "The Builder's App Logo",
    // Remove fixed height and use a compact default that fits the header
    className: "h-6 sm:h-8 md:h-10 w-auto object-contain opacity-90 drop-shadow-md",
  },
  quickLinks: [
    { label: "Start", href: "/#hero" },
    { label: "Features", href: "/#features" },
    { label: "Contact", href: "/demo/#contact" },
  ],
}
