# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a TFT (Teamfight Tactics) item learning game built with Next.js, TypeScript, and Tailwind CSS. The project aims to help players learn TFT item recipes through an interactive quiz game.

## Project Context
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (static site)
- **Game Logic**: React Hooks for state management

## Key Features
1. **Item Recipe Quiz**: Present composite items and let users select the correct base items
2. **Score System**: Track correct/incorrect answers
3. **Item Database**: JSON-based data structure for TFT items and recipes
4. **Responsive Design**: Mobile-friendly interface

## Code Style Preferences
- Use functional components with React Hooks
- Implement proper TypeScript types for all data structures
- Use Tailwind CSS for styling with a game-like aesthetic
- Prefer composition over inheritance
- Keep components small and focused

## Data Structure
- Items should have: id, name, description, image, tier
- Recipes should define: output item, required base items
- Game state should track: current question, score, progress

## UI/UX Guidelines
- Use card-based layouts for items
- Implement hover effects and animations
- Use appropriate colors for different item tiers
- Ensure accessibility with proper ARIA labels
