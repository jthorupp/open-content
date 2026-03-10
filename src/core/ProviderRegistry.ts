import { CMSProvider } from "../interfaces/CMSProvider";

/**
 * Registry for managing multiple CMS providers
 */
export class ProviderRegistry {
  private providers: Record<string, CMSProvider> = {};
  private activeProviderName: string | null = null;

  /**
   * Register a new CMS provider
   * @param name - Name of the provider
   * @param provider - The CMS provider instance
   */
  register(name: string, provider: CMSProvider): void {
    this.providers[name] = provider;
  }

  /**
   * Set the active provider
   * @param name - Name of the provider to activate
   * @throws Error if provider is not registered
   */
  setActive(name: string): void {
    if (!this.providers[name]) {
      throw new Error(`Provider ${name} not registered`);
    }
    this.activeProviderName = name;
  }

  /**
   * Get the active provider
   * @returns The active CMS provider or null if none set
   */
  getActiveProvider(): CMSProvider | null {
    if (!this.activeProviderName) {
      return null;
    }
    return this.providers[this.activeProviderName];
  }

  /**
   * Fetch content by ID using the active provider
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to the content or null if not found
   */
  async getContentById<T>(type: string, id: string): Promise<T | null> {
    const provider = this.getActiveProvider();
    if (!provider) {
      throw new Error("No active provider set");
    }

    try {
      return await provider.getContentById(type, id);
    } catch (error) {
      console.error(
        `Error fetching content by ID from ${this.activeProviderName}:`,
        error,
      );
      throw new Error(
        `Failed to fetch content: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * List content using the active provider
   * @param type - The content type
   * @param query - Optional query parameters
   * @returns Promise resolving to an array of content
   */
  async listContent<T>(
    type: string,
    query?: Record<string, any>,
  ): Promise<T[]> {
    const provider = this.getActiveProvider();
    if (!provider) {
      throw new Error("No active provider set");
    }

    try {
      return await provider.listContent(type, query);
    } catch (error) {
      console.error(
        `Error listing content from ${this.activeProviderName}:`,
        error,
      );
      throw new Error(
        `Failed to list content: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Create new content using the active provider
   * @param type - The content type
   * @param data - The content data
   * @returns Promise resolving to the created content
   */
  async createContent<T>(type: string, data: T): Promise<T> {
    const provider = this.getActiveProvider();
    if (!provider) {
      throw new Error("No active provider set");
    }

    try {
      return await provider.createContent(type, data);
    } catch (error) {
      console.error(
        `Error creating content from ${this.activeProviderName}:`,
        error,
      );
      throw new Error(
        `Failed to create content: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Update existing content using the active provider
   * @param type - The content type
   * @param id - The content ID
   * @param data - Content data to update
   * @returns Promise resolving to the updated content
   */
  async updateContent<TContentType>(
    type: string,
    id: string,
    data: Partial<TContentType>,
  ): Promise<TContentType> {
    const provider = this.getActiveProvider();
    if (!provider) {
      throw new Error("No active provider set");
    }
    const currentContent = await provider.getContentById<TContentType>(
      type,
      id,
    );
    if (!currentContent) {
      throw new Error(
        `Content entry with type ${type} and ID ${id} not found. Ensure it exists before updating it.`,
      );
    }
    try {
      return await provider.updateContent<TContentType>(type, id, {
        ...currentContent,
        ...data,
      });
    } catch (error) {
      console.error(
        `Error updating content from ${this.activeProviderName}:`,
        error,
      );
      throw new Error(
        `Failed to update content: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Delete content using the active provider
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to void
   */
  async deleteContent(type: string, id: string): Promise<void> {
    const provider = this.getActiveProvider();
    if (!provider) {
      throw new Error("No active provider set");
    }

    try {
      return await provider.deleteContent(type, id);
    } catch (error) {
      console.error(
        `Error deleting content from ${this.activeProviderName}:`,
        error,
      );
      throw new Error(
        `Failed to delete content: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
