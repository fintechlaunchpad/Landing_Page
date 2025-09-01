
import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
// import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/server/api/root";
import { createContextInner } from "~/server/api/trpc";

import type { AppRouter } from "~/server/api/root";
import type { inferRouterInputs } from "@trpc/server";
import type { ContactInput } from "~/modules/contact/logic/contactSchema";



const createCaller = async () => {
  // tests run without a real Prisma client; pass an empty object cast to any to satisfy types
  const ctx = await createContextInner({ db: (null as unknown) as any });
  return appRouter.createCaller(ctx as any);
};

type RouterInputs = inferRouterInputs<AppRouter>;
type ContactSubmitInput = RouterInputs['contact']['submit'];

const validTestData: ContactInput = {
  firstName: "John",
  lastName: "Doe",
  phone: `09${Math.floor(Math.random() * 1_000_000_000)}`,
  email: "john.doe@example.com",
};

describe("contactRouter integration", () => {

  it("should submit contact successfully", async () => {
    const caller = await createCaller();
    const result = await caller.contact.submit(validTestData);

  expect(result).toHaveProperty("id");
  const emailProp = (result as any)?.properties?.email ?? Object.values((result as any)?.properties || {}).find((p: any) => p?.type === 'email');
  expect(emailProp).toBeDefined();
  });


  it("should reject an invalid contact submission", async () => {
    const caller = await createCaller();
    const invalidInput: Partial<ContactSubmitInput> = {
      firstName: "Test",
      email: "test@example.com",
    };
    await expect(caller.contact.submit(invalidInput as ContactSubmitInput)).rejects.toThrow(TRPCError);
    await expect(caller.contact.submit(invalidInput as ContactSubmitInput)).rejects.toHaveProperty('code', 'BAD_REQUEST');
  });


  it("should throw a CONFLICT error for a duplicate contact", async () => {
    const caller = await createCaller();
    // await caller.contact.submit(validTestData);
    const duplicateData: ContactInput = {
      firstName: "Jane",
      lastName: "Doe",
      phone: validTestData.phone,
      email: validTestData.email,
    };
    await expect(caller.contact.submit(duplicateData)).rejects.toThrow(TRPCError);
    await expect(caller.contact.submit(duplicateData)).rejects.toHaveProperty('code', 'CONFLICT');
    await expect(caller.contact.submit(duplicateData)).rejects.toHaveProperty('message', 'This contact already exists.');
  });
});




