import { env } from '~/env';

export function getNotionDatabaseId(): string {
  return env.NODE_ENV === "test"
    ? env.NOTION_TEST_DATABASE_ID
    : env.NOTION_DATABASE_ID;
}

