
// Theme provider is now a no-op, always light mode, no theme panel
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
