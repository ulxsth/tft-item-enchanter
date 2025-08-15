# TFT Item Enchanter

An interactive learning game to master Teamfight Tactics (TFT) item recipes! Test your knowledge by identifying which base items are needed to craft composite items.

![TFT Item Enchanter Screenshot](https://via.placeholder.com/800x400?text=TFT+Item+Enchanter+Game+Screenshot)

## 🎮 Features

- **Interactive Quiz Game**: Answer questions about TFT item combinations
- **Real-time Scoring**: Track your correct/incorrect answers and accuracy
- **Progressive Difficulty**: Learn all the essential TFT item recipes
- **Responsive Design**: Play on desktop, tablet, or mobile
- **Visual Feedback**: Clear indication of correct and incorrect answers

## 🚀 Getting Started

### Development

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the static site for GitHub Pages:

```bash
npm run build
```

The static files will be generated in the `docs` folder.

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **State Management**: React Hooks

## 📱 How to Play

1. Click "Start Game" to begin
2. You'll see a composite TFT item and several base item options
3. Select the correct base items needed to craft the composite item
4. Click "Submit Answer" to check if you're correct
5. Continue through all questions to see your final score!

## 🎯 Game Features

- **10 Questions per Game**: Each game consists of 10 randomly selected item combinations
- **Real-time Scoring**: See your current score and accuracy as you play
- **Visual Feedback**: Correct answers are highlighted in green, incorrect in red
- **Responsive UI**: Optimized for all device sizes

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game interface
│   ├── ItemCard.tsx    # Individual item display
│   ├── QuestionDisplay.tsx # Question presentation
│   └── ScoreBoard.tsx  # Score tracking
├── data/
│   └── items.json      # TFT item database
├── hooks/
│   └── useGame.ts      # Game logic hook
├── types/
│   └── game.ts         # TypeScript type definitions
└── app/
    ├── page.tsx        # Home page
    └── layout.tsx      # App layout
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages. When you push to the main branch, GitHub Actions will:

1. Build the Next.js application
2. Export static files
3. Deploy to GitHub Pages

To set up deployment:

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the main branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Some areas for improvement:

- Add more TFT items and recipes
- Implement difficulty levels
- Add item images
- Create additional game modes
- Improve mobile responsiveness

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 About TFT

Teamfight Tactics is an auto-battler game mode in League of Legends where players combine base items to create powerful composite items for their champions. This game helps players memorize these crucial item combinations!
