import { notion } from "~/utils/notion";

type PropMap = {
  firstName: string | null;
  email: string | null;
  phone: string | null;
  lastName: string | null;
  notes: string | null;
  raw: Record<string, any>;
};

const cache = new Map<string, PropMap>();

function nameRegex(regex: RegExp, props: Record<string, any>) {
  return Object.keys(props).find((n) => regex.test(n));
}

export async function getNotionDatabasePropertyMap(databaseId: string): Promise<PropMap> {
  if (cache.has(databaseId)) return cache.get(databaseId)!;

  const db = await notion.databases.retrieve({ database_id: databaseId });
  const props: Record<string, any> = (db as any).properties || {};

  const propNames = Object.keys(props);

  const findByType = (type: string) => propNames.find((name) => props[name]?.type === type) || null;

  const mapping: PropMap = {
    firstName: nameRegex(/first|given/i, props) || null,
    email: findByType('email') || nameRegex(/email|e-?mail/i, props) || null,
    phone: findByType('phone_number') || nameRegex(/phone|tel|mobile/i, props) || null,
    lastName: (findByType('rich_text') || findByType('text')) ? (nameRegex(/last|surname|family/i, props) || null) : null,
    notes: nameRegex(/notes|interest|description|message/i, props) || null,
    raw: props,
  };

  cache.set(databaseId, mapping);
  return mapping;
}

export function listNotionDatabasePropertyNames(mapping: PropMap) {
  return Object.keys(mapping.raw || {});
}
