# 🚧 **This project is a work in progress** 🚧

# Open Content CMS Abstraction Library

This is a TypeScript library that provides a unified interface to multiple CMS providers, similar to how OpenFeature abstracts feature flag providers.

## Project Structure

- `src/`: Source code files
  - `core/`: Core interfaces and classes
  - `providers/`: Mock CMS providers
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
npx tsgo main.ts
```

## Core Interface

The `CMSProvider` interface defines methods for interacting with CMS providers.

## Provider Registry

The `ProviderRegistry` class allows registering and switching between multiple CMS providers with a fallback mechanism.

## Example Providers

Mock providers (`StrapiProvider` and `ContentfulProvider`) are implemented to simulate API calls and return dummy data.

## Usage Example

The `main.ts` file demonstrates registering providers, switching between them, and using the unified interface to fetch and create content.

```

```
