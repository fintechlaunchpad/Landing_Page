import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { ContactInputSchema } from "~/modules/contact/logic/contactSchema"
import { submitContact } from "~/modules/contact/logic/submitContact"
import { TRPCError } from "@trpc/server"
import { Prisma } from "@prisma/client"

export const contactRouter = createTRPCRouter({

  submit: publicProcedure
    .input(ContactInputSchema)
    .mutation(async ({ input }) => {
      try {
        return await submitContact(input)
      } catch (err) {
        console.error('Contact submission error:', err);
                
        const error = err as Error & { statusCode?: number }
        
        // Handle specific error cases
        if (error.statusCode === 409) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "This contact already exists.",
          })
        }

        // Handle Notion configuration errors
        if (error.message?.includes('Notion database ID is not configured')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Notion integration is not properly configured. Please check your environment variables.",
          })
        }

        // Handle Notion API errors
        if (error.message?.includes('Notion API Error')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save contact to Notion. Please try again later.",
          })
        }

        // Generic error fallback
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while submitting your contact information.",
        })
      }
    }),
})

