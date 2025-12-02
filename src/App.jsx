import PhaserGame from './components/PhaserGame';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Portfolio Game
        </h1>
        <p className="text-xl text-gray-300">Phaser + React + Vite + Tailwind</p>
      </div>
      <PhaserGame />
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-400">✅ Phaser canvas loaded successfully!</p>
      </div>
    </div>
  );
}

export default App;
