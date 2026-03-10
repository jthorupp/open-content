import { CMSProvider } from "../interfaces/CMSProvider";

/**
 * Mock Strapi provider implementation
 */
export class StrapiProvider implements CMSProvider {
  /**
   * Fetch content by ID from Strapi
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to the content or null if not found
   */
  async getContentById<T>(type: string, id: string): Promise<T | null> {
    console.log(`Fetching ${type} with ID ${id} from Strapi`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock data - in a real implementation this would be an actual API call
    if (type === "Article" && id === "1") {
      return {
        id: "1",
        title: "Sample Article from Strapi",
        content: "This is sample content from Strapi CMS",
        author: "John Doe",
      } as unknown as T;
    }

    return null;
  }

  /**
   * List content from Strapi
   * @param type - The content type
   * @param query - Optional query parameters
   * @returns Promise resolving to an array of content
   */
  async listContent<T>(
    type: string,
    query?: Record<string, any>,
  ): Promise<T[]> {
    console.log(`Listing ${type} from Strapi with query`, query);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock data - in a real implementation this would be an actual API call
    if (type === "Article") {
      return [
        {
          id: "1",
          title: "Sample Article from Strapi",
          content: "This is sample content from Strapi CMS",
          author: "John Doe",
        },
        {
          id: "2",
          title: "Another Article from Strapi",
          content: "This is another sample article",
          author: "Jane Smith",
        },
      ] as unknown as T[];
    }

    return [];
  }

  /**
   * Create new content in Strapi
   * @param type - The content type
   * @param data - The content data
   * @returns Promise resolving to the created content
   */
  async createContent<T>(type: string, data: T): Promise<T> {
    console.log(`Creating ${type} in Strapi with data`, data);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock response - in a real implementation this would be an actual API call
    const createdData = {
      ...data,
      id: Math.floor(Math.random() * 1000).toString(),
      createdAt: new Date().toISOString(),
    } satisfies T;

    console.log(`Created ${type} with ID: ${createdData.id}`);
    return createdData;
  }

  /**
   * Update existing content in Strapi
   * @param type - The content type
   * @param id - The content ID
   * @param data - Content data to update
   * @returns Promise resolving to the updated content
   */
  async updateContent<T>(type: string, id: string, data: T): Promise<T> {
    console.log(`Updating ${type} with ID ${id} in Strapi with data`, data);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock response - in a real implementation this would be an actual API call
    const updatedData = {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    } satisfies T;

    console.log(`Updated ${type} with ID: ${id}`);
    return updatedData;
  }

  /**
   * Delete content from Strapi
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to void
   */
  async deleteContent(type: string, id: string): Promise<void> {
    console.log(`Deleting ${type} with ID ${id} from Strapi`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log(`Deleted ${type} with ID: ${id}`);
  }
}
