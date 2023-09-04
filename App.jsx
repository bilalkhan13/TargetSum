import { StatusBar } from 'expo-status-bar';
import Game from './src/components/Game';
import { useState } from 'react';

export default function App() {
  const [gameId, setGameId] = useState(1);

  const resetGame = () => {
    setGameId(gameId + 1);
  }

  return <Game key={gameId} onPlayAgain={resetGame} randomNumberCount={6} initialSeconds={10} />;
}
