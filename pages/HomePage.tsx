
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterList, createCharacter } from '../services/googleSheetService';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { APP_COLORS, SHEET_URL, DEFAULT_SHEET_URL_PLACEHOLDER } from '../constants';

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const isSheetUrlDefault = !SHEET_URL || SHEET_URL === DEFAULT_SHEET_URL_PLACEHOLDER;

  const fetchCharacters = useCallback(async () => {
    if (isSheetUrlDefault) {
      setError("La URL del script de Google Apps no está configurada en constants.ts.");
      setIsLoading(false);
      setCharacters([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const charList = await getCharacterList();
      setCharacters(charList);
    } catch (err: any) {
      setError(err.error || 'Error al cargar la lista de personajes.');
      console.error(err);
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  }, [isSheetUrlDefault]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSheetUrlDefault) {
      alert("Configuración requerida: La URL del script de Google Apps no está configurada en constants.ts.");
      return;
    }
    if (!newCharacterName.trim()) {
      alert('Por favor, introduce un nombre para el nuevo personaje.');
      return;
    }
    
    const trimmedName = newCharacterName.trim();
    // Basic validation, Google Apps Script might have more robust validation
    if (trimmedName.includes('/') || trimmedName.includes('?')) {
        alert('El nombre del personaje no puede contener "/" o "?".');
        return;
    }

    setIsCreating(true);
    setError(null);
    try {
      const result = await createCharacter(trimmedName);
      if (result.success) {
        alert(result.message || `Personaje "${trimmedName}" creado con éxito.`);
        setNewCharacterName('');
        fetchCharacters(); 
      } else {
        setError(result.error || 'No se pudo crear el personaje.');
        alert(result.error || 'No se pudo crear el personaje.');
      }
    } catch (err: any) {
      setError(err.error || 'Error de conexión al intentar crear el personaje.');
      console.error(err);
      alert(err.error || 'Error de conexión al intentar crear el personaje.');
    } finally {
      setIsCreating(false);
    }
  };
  

  return (
    <div className={`w-full max-w-2xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-lg rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
      <h1 className={`font-serif text-3xl font-bold text-center text-[${APP_COLORS.titleTextHex}] mb-2 border-b-2 pb-3 border-[${APP_COLORS.accentGreenPrimaryHex}]`}>
        Equipo de Investigadores
      </h1>
      <p className={`text-base font-medium text-center mb-6 text-[${APP_COLORS.noteTextHex}]`}>Profanos de Armitage</p>

      {isSheetUrlDefault && (
        <div className={`${APP_COLORS.alertDangerBgClass} border-l-4 border-[${APP_COLORS.alertDangerBorderColorHex}] text-[${APP_COLORS.alertDangerTextHex}] p-4 mb-6 rounded-sm`} role="alert">
          <p className="font-bold">Configuración Requerida</p>
          <p>La URL del script de Google Apps (<code>SHEET_URL</code>) no está configurada en el archivo <code>constants.ts</code>. Por favor, añade la URL de tu script desplegado.</p>
        </div>
      )}

      {isLoading && <LoadingSpinner />}
      {error && !isSheetUrlDefault && <p className={`text-center my-4 text-[${APP_COLORS.alertDangerTextHex}]`}>Error: {error}</p>}
      
      {!isLoading && !error && characters.length === 0 && !isSheetUrlDefault && (
        <p className={`text-[${APP_COLORS.bodyTextHex}] text-center my-4`}>No hay personajes disponibles. ¡Crea el primero!</p>
      )}

      {!isLoading && characters.length > 0 && (
        <ul className="space-y-3 mb-8">
          {characters.map((name) => (
            <li key={name} className={`border border-[${APP_COLORS.inputBorderColorHex}] rounded-sm hover:shadow-md transition-shadow`}>
              <Link
                to={`/ficha/${encodeURIComponent(name)}`}
                className={`block p-3 text-[${APP_COLORS.accentOchrePrimaryHex}] hover:text-[${APP_COLORS.accentOchreSecondaryHex}] transition-colors font-semibold`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className={`creation-form border-t border-[${APP_COLORS.cardBorderColorHex}] pt-6 mt-6`}>
        <h2 className={`font-serif text-xl font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mb-4`}>Crear Nuevo Investigador</h2>
        <form onSubmit={handleCreateCharacter} className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-grow">
            <label htmlFor="newCharacterName" className="sr-only">Nombre del nuevo personaje</label>
            <input
              type="text"
              id="newCharacterName"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
              placeholder="Nombre del personaje"
              className={`w-full p-2.5 border rounded-sm shadow-sm ${APP_COLORS.inputBgClass} border-[${APP_COLORS.inputBorderColorHex}] focus:border-[${APP_COLORS.inputFocusBorderColorHex}] focus:ring-1 focus:ring-[${APP_COLORS.inputFocusBorderColorHex}] placeholder:text-sm placeholder:text-[${APP_COLORS.noteTextHex}]`}
              disabled={isCreating || isSheetUrlDefault}
            />
          </div>
          <Button type="submit" disabled={isCreating || !newCharacterName.trim() || isSheetUrlDefault} className="w-full sm:w-auto">
            {isCreating ? 'Creando...' : 'Crear Personaje'}
          </Button>
        </form>
        {error && isCreating && <p className={`text-[${APP_COLORS.alertDangerTextHex}] text-sm mt-2`}>{error}</p>}
      </div>

      {/* Manual de Campo */}
      <div className={`rulebook-section border-t border-[${APP_COLORS.cardBorderColorHex}] pt-6 mt-8`}>
        <h2 className={`font-serif text-xl font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mb-3`}>Manual de Campo</h2>
        <p className={`text-[${APP_COLORS.bodyTextHex}] mb-4 text-sm`}>
          Consulta las reglas, mecánicas y el lore esencial para sobrevivir a los horrores que acechan en las sombras.
        </p>
        <Link to="/manual-del-juego">
          <Button variant="default" className="w-full sm:w-auto">
            Consultar Manual de Juego
          </Button>
        </Link>
      </div>

      {/* Manual de Armas */}
      <div className={`weapons-manual-section border-t border-[${APP_COLORS.cardBorderColorHex}] pt-6 mt-8`}>
        <h2 className={`font-serif text-xl font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mb-3`}>Manual de Armas</h2>
        <p className={`text-[${APP_COLORS.bodyTextHex}] mb-4 text-sm`}>
          Un compendio de armamento disponible, desde herramientas improvisadas hasta equipo más especializado para enfrentar los peligros.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/manual-de-armas/cuerpo-a-cuerpo" className="flex-1">
            <Button variant="default" className="w-full">
              Armas Cuerpo a Cuerpo
            </Button>
          </Link>
          <Link to="/manual-de-armas/a-distancia" className="flex-1">
            <Button variant="default" className="w-full">
              Armas a Distancia
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
