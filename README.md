# Tafutanga - Property Listing App

Tafutanga helps Kenyans in Nairobi make house hunting easier. This frontend repository is built using Next.js (App Router), Tailwind CSS v4, Zustand, and Lucide React.

## File Structure & Architecture

The project has been architected to strictly flatten business logic and UI components, eliminating deep nesting and redundant subdirectories. All primary source code lives inside `src/`.

### 1. `src/app/`
Contains Next.js App Router definitions. Next.js enforces a folder-based routing mechanism, so this directory contains the flat layout of routing folders required.
- `browse/`: The public browsing pages for house hunters.
- `landlord/`: The protected landlord portal, which houses flat routing subdirectories (`signin/`, `signup/`, `units/`, `rooms/`, `listings/`) governed by a single unified layout.
- `globals.css`: Global styles including Tailwind directives.
- `layout.js` & `page.js`: The root layout and index page.

### 2. `src/domain/`
Contains purely flat business logic. **Zero subfolders exist here.** It organizes logic across our bounded contexts (Auth, Browse, Properties) using file prefixes instead of folders.
- **`authClient.js`**: API calls related to landlord authentication.
- **`authStore.js`**: Global state (Zustand) for landlord sessions.
- **`authActions.js`**: Use cases and business actions for signing in and signing up.
- **`browseClient.js`**: API calls for public house hunters to fetch listings.
- **`browseStore.js`**: Global state (Zustand) for search filters and browsing state.
- **`browseActions.js`**: Use cases for fetching listings and search logic.
- **`browseTime.js`**: Shared time formatting utilities for the browse domain.
- **`propertyStore.js`**: Global state (Zustand) for landlord's registered units and active room listings.
- **`propertyTypes.js`**: Shared data transformations and labels (e.g., formatting a unit name).
- **`propertyActions.js`**: Centralized CRUD operations for units and room listings (create, read, update, delete).

### 3. `src/ui/`
Contains shared React components and UI stores in a flat structure. **Zero subfolders exist here.**
- **`AppHeader.jsx`**: The main navigation header used across the app.
- **`ConfirmModal.jsx`**: Reusable generic modal for destructive actions (e.g., deleting a unit).
- **`ListingCard.jsx`**: Component to render an individual room listing visually.
- **`ThemeToggle.jsx`**: A button component to toggle between light and dark modes.
- **`ToastViewport.jsx`**: The toast notification UI container.
- **`themeStore.js`**: Global state (Zustand) tracking user's light/dark mode preference.
- **`toastStore.js`**: Global state (Zustand) tracking active notifications.

## Project Rules

1. **Flat Structure**: Do not create subdirectories inside `src/domain/` or `src/ui/`. Group related functionality into single prefixed files (e.g., `propertyActions.js`).
2. **Tailwind Only**: Use Tailwind CSS utility classes exclusively. No CSS modules or styled-components.
3. **No Emojis**: Do not use emojis in UI copy, documentation, or commit messages. Keep the tone professional.
4. **Zustand for State**: Use Zustand for global state management.
5. **Robustness**: Always validate inputs, preserve invariants, and handle errors intentionally. Add short 1-line comments explaining *why* specific logic exists.

## Running Locally

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
