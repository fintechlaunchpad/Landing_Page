# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Notion Integration Setup

This project includes Notion integration for contact form submissions. To set it up:

### 1. Create a Notion Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Contact Form Integration")
4. Select your workspace
5. Copy the "Internal Integration Token"

### 2. Set up your Notion Database
1. Create a new database in Notion or use an existing one
2. **Add these properties to match your contact form (you can name them whatever you want):**
   - **Email** (required) - Set type to "Email"
   - **Phone** (required) - Set type to "Phone number" (preferred) or "Text"
   - **First Name** (optional) - Text type field for first name
   - **Last Name** (optional) - Text type field for last name
   - **Notes** (optional) - Text type field for interest description
   
   **Note:** The integration will automatically detect your property names. You only need "Email" as a required field. Name fields and notes are optional and will work with whatever names you choose.
3. Share the database with your integration
4. Copy the database ID from the URL (the part after the last slash)

### 3. Configure Environment Variables
1. Copy `env.example` to `.env.local`
2. Fill in your values:
   ```bash
   NOTION_TOKEN=your_integration_token_here
   NOTION_DATABASE_ID=your_database_id_here
   NOTION_TEST_DATABASE_ID=your_test_database_id_here
   ```

### 4. Restart Your Development Server
After adding the environment variables, restart your Next.js server.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
