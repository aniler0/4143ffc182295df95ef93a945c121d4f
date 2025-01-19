# 840d9cbe70467c19a6af873c7bd41220

A Vue 3 + TypeScript application that simulates a virtual aquarium where you can monitor and feed fish in real-time.

## Features

- 🐠 Real-time fish simulation with swimming animations
- 💙 Fish health monitoring system
- ⏱️ Time speed controls (1x, 60x, 120x, 3600x)
- 🔄 Automatic health degradation system
- 📊 Interactive fish information cards
- 🎯 Visual health indicators
- 🍽️ Feeding system with proper timing mechanics

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Ant Design Vue for UI components
- Vite as build tool
- Vitest for unit testing

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/aniler0/840d9cbe70467c19a6af873c7bd41220.git
cd 840d9cbe70467c19a6af873c7bd41220
```

2. Install dependencies:
```sh
npm install
```
3. Create a .env file in the root directory with:
```
VITE_FISH_API_URL=https://run.mocky.io/v3/e80be173-df55-404b-833b-670e53a4743d
```
4. Run development server:
```
npm run dev
```
## Available Scripts

- ```npm run dev``` - Development server
- ```npm run build``` - Production build
- ```npm run test:unit``` - Run tests
- ```npm run lint``` - ESLint check
- ```npm run format``` - Prettier format

## Project Structure

```
src/
├── components/       # Vue components
├── stores/           # Pinia state management
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── composables/      # Vue composables
```