# 🚧 **This project is a work in progress** 🚧

# Open Content CMS Abstraction Library

This is a TypeScript library that provides a unified interface to multiple CMS providers, similar to how OpenFeature abstracts feature flag providers.

## Project Structure

- `src/`: Source code files
  - `interfaces/`: CMS provider interfaces
  - `core/`: Core classes like ProviderRegistry
  - `providers/`: Mock CMS providers (StrapiProvider, ContentfulProvider)
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project dependencies
- `main.ts`: Example usage

## Usage Instructions

1. Install dependencies:

```sh
npm install
```

2. Run the example:

```sh
npm run build
```

## Core Interface

The `CMSProvider` interface defines methods for interacting with CMS providers:

- `getContentById<T>(type: string, id: string): Promise<T | null>`
- `listContent<T>(type: string, query?: Record<string, any>): Promise<T[]>`
- `createContent<T>(type: string, data: T): Promise<T>`
- `updateContent<T>(type: string, id: string, data: Partial<T>): Promise<T>`
- `deleteContent(type: string, id: string): Promise<void>`

## Provider Registry

The `ProviderRegistry` class allows registering and switching between multiple CMS providers with a fallback mechanism.

## Example Providers

Mock providers (`StrapiProvider` and `ContentfulProvider`) are implemented to simulate API calls and return dummy data.

## Usage Example

The `main.ts` file demonstrates registering providers, switching between them, and using the unified interface to fetch and create content.

```typescript
// Register providers
registry.register("strapi", new StrapiProvider());
registry.register("contentful", new ContentfulProvider());

// Set active provider
registry.setActive("strapi");

// Perform content operations consistently across providers
const article = await registry.getContentById<Article>("Article", "1");
const articles = await registry.listContent<Article>("Article");
```
