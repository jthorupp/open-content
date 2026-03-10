import { ProviderRegistry } from "./core/ProviderRegistry";
import { StrapiProvider } from "./providers/StrapiProvider";
import { ContentfulProvider } from "./providers/ContentfulProvider";

/**
 * Article content type interface
 */
interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

async function main() {
  console.log("=== Open Content CMS Abstraction Demo ===\n");

  // Create the provider registry
  const registry = new ProviderRegistry();

  // Register mock providers
  console.log("1. Registering CMS providers...");
  registry.register("strapi", new StrapiProvider());
  registry.register("contentful", new ContentfulProvider());
  console.log("   Providers registered successfully!\n");

  // Test Strapi provider
  console.log("2. Testing Strapi provider...");
  registry.setActive("strapi");

  // Get content by ID
  const article1 = await registry.getContentById<Article>("Article", "1");
  console.log("   Retrieved article from Strapi:", article1);

  // List content
  const articles = await registry.listContent<Article>("Article");
  console.log(
    "   Listed articles from Strapi:",
    articles.length,
    "articles found",
  );

  // Create new content
  const newArticle = await registry.createContent<Article>("Article", {
    title: "New Article",
    content: "This is a new article created via Strapi",
    author: "Test User",
    id: "some-test-id-1",
  });
  console.log("Created new article:", newArticle);

  // Update content
  const updatedArticle = await registry.updateContent<Article>(
    "Article",
    newArticle.id,
    {
      title: "Updated Article Title",
    },
  );
  console.log("   Updated article:", updatedArticle);

  console.log("\n3. Switching to Contentful provider...");
  registry.setActive("contentful");

  // Get content by ID from Contentful
  const article2 = await registry.getContentById<Article>("Article", "1");
  console.log("   Retrieved article from Contentful:", article2);

  // List content from Contentful
  const contentfulArticles = await registry.listContent<Article>("Article");
  console.log(
    "   Listed articles from Contentful:",
    contentfulArticles.length,
    "articles found",
  );

  // Create new content with Contentful
  const newContentfulArticle = await registry.createContent<Article>(
    "Article",
    {
      title: "New Contentful Article",
      content: "This is a new article created via Contentful",
      author: "Test User",
      id: "some-test-id-2",
    },
  );
  console.log("   Created new article with Contentful:", newContentfulArticle);

  // Update content with Contentful
  const updatedContentfulArticle = await registry.updateContent<Article>(
    "Article",
    newContentfulArticle.id,
    {
      content: "Updated content from Contentful",
    },
  );
  console.log("   Updated article with Contentful:", updatedContentfulArticle);

  console.log("\n=== Demo completed successfully! ===");
}

// Run the demo
main().catch(console.error);
