/**
 * Interface for CMS providers to implement
 */
export interface CMSProvider {
  /**
   * Fetch content by ID
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to the content or null if not found
   */
  getContentById<T>(type: string, id: string): Promise<T | null>;

  /**
   * List content
   * @param type - The content type
   * @param query - Optional query parameters
   * @returns Promise resolving to an array of content
   */
  listContent<T>(type: string, query?: Record<string, any>): Promise<T[]>;

  /**
   * Create new content
   * @param type - The content type
   * @param data - The content data
   * @returns Promise resolving to the created content
   */
  createContent<T>(type: string, data: T): Promise<T>;

  /**
   * Update existing content
   * @param type - The content type
   * @param id - The content ID
   * @param data - Partial content data to update
   * @returns Promise resolving to the updated content
   */
  updateContent<T>(type: string, id: string, data: T): Promise<T>;

  /**
   * Delete content
   * @param type - The content type
   * @param id - The content ID
   * @returns Promise resolving to void
   */
  deleteContent(type: string, id: string): Promise<void>;
}
