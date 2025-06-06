import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterSheetPage from './pages/CharacterSheetPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ficha/:characterName" element={<CharacterSheetPage />} />
      </Routes>
    </div>
  );
};

export default App;