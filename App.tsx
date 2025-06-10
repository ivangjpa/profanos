
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterSheetPage from './pages/CharacterSheetPage';
import RulebookPage from './pages/RulebookPage';
import MeleeWeaponsPage from './pages/MeleeWeaponsPage';
import RangedWeaponsPage from './pages/RangedWeaponsPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ficha/:characterName" element={<CharacterSheetPage />} />
        <Route path="/manual-del-juego" element={<RulebookPage />} />
        <Route path="/manual-de-armas/cuerpo-a-cuerpo" element={<MeleeWeaponsPage />} />
        <Route path="/manual-de-armas/a-distancia" element={<RangedWeaponsPage />} />
      </Routes>
    </div>
  );
};

export default App;
