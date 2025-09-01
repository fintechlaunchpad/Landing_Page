import { describe, it, expect } from "vitest"
import { submitContact } from "./submitContact"

function generateTestEmail() {
  const timestamp = Date.now()
  return `test-${timestamp}@example.com`
}

describe("submitContact()", () => {
  it("saves contact to database", async () => {
    const testData = {
      firstName: "John",
      lastName: "Doe",
      phone: `09${Math.floor(Math.random() * 1_000_000_000)}`,
      email: generateTestEmail(),
      notes: "Interested in web development services",
    }

    const result = await submitContact(testData)

  expect(result).toHaveProperty("id")
  // Notion types can be partial in tests; assert email property exists somewhere
  const emailProp = (result as any)?.properties?.email ?? Object.values((result as any)?.properties || {}).find((p: any) => p?.type === 'email');
  expect(emailProp).toBeDefined();
  })
})
