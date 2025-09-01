import { db } from "~/server/db"
import type { ContactInput } from "./contactSchema"
import { notion } from "~/utils/notion"
import { getNotionDatabaseId } from "~/utils/dbId";
import { getNotionDatabasePropertyMap, listNotionDatabasePropertyNames } from "~/utils/notionDb";

export async function submitContact(data: ContactInput) {
  // return db.contact.create({
  //   data,
  // })
  const dbId = getNotionDatabaseId();

  // Validate database ID
  if (!dbId) {
    throw new Error('Notion database ID is not configured. Please check your environment variables.');
  }

  try {
    // discover property names/types from the database
    const propMap = await getNotionDatabasePropertyMap(dbId);

    // Check for required properties - only email is truly required
    const required = ['email'];
    const missingRequired = required.filter((r) => !propMap[r as keyof typeof propMap]);
    if (missingRequired.length > 0) {
      const names = listNotionDatabasePropertyNames(propMap).join(', ');
      const err = new Error(`Notion database is missing required properties: ${missingRequired.join(', ')}. Found: ${names}`) as Error & { statusCode?: number };
      err.statusCode = 500;
      throw err;
    }

    // build filters using discovered property names
    const filters: any[] = [];
    if (propMap.email) {
      filters.push({
        property: propMap.email,
        email: { equals: data.email },
      });
    }

    if (propMap.phone) {
      // prefer phone_number type if present, otherwise rich_text
      const phoneType = propMap.raw[propMap.phone]?.type;
      if (phoneType === 'phone_number') {
        filters.push({
          property: propMap.phone,
          phone_number: { equals: data.phone },
        });
      } else {
        filters.push({
          property: propMap.phone,
          rich_text: { equals: data.phone },
        });
      }
    }

    const existing = await notion.databases.query({
      database_id: dbId,
      filter: filters.length > 0 ? { and: filters } : undefined,
    });

    if (existing.results.length > 0) {
      const error = new Error('A contact with this email and phone already exists.') as Error & { statusCode?: number };
      error.statusCode = 409;
      throw error;
    }

    // build properties for the new page using discovered names
    const properties: Record<string, any> = {};

    // Handle firstName if the property exists
    if (propMap.firstName) {
      properties[propMap.firstName] = { rich_text: [{ text: { content: data.firstName } }] };
    }

    // Handle lastName if the property exists
    if (propMap.lastName) {
      properties[propMap.lastName] = { rich_text: [{ text: { content: data.lastName } }] };
    }

    // Handle email
    if (propMap.email) {
      properties[propMap.email] = { email: data.email };
    }

    // Handle phone
    if (propMap.phone) {
      const phoneType = propMap.raw[propMap.phone]?.type;
      if (phoneType === 'phone_number') {
        properties[propMap.phone] = { phone_number: data.phone };
      } else {
        properties[propMap.phone] = { rich_text: [{ text: { content: data.phone } }] };
      }
    }

    // Handle notes if the property exists
    if (propMap.notes && data.notes) {
      properties[propMap.notes] = { rich_text: [{ text: { content: data.notes } }] };
    }

    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties,
    });

    return response;
  } catch (error) {
    // Enhanced error logging for debugging
    console.error('Notion API Error:', {
      error: error instanceof Error ? error.message : error,
      databaseId: dbId,
      data: { firstName: data.firstName, email: data.email, phone: data.phone }
    });
    
    // Re-throw the error with additional context
    if (error instanceof Error) {
      const enhancedError = new Error(`Notion API Error: ${error.message}`) as Error & { statusCode?: number };
      enhancedError.statusCode = (error as any).statusCode || 500;
      throw enhancedError;
    }
    
    throw error;
  }
}



