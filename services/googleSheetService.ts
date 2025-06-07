
import { SHEET_URL, DEFAULT_SHEET_URL_PLACEHOLDER } from '../constants';
import { 
  CharacterData, 
  ApiCharacterResponse, 
  ApiCharacterListResponse, 
  ApiMutationResponse,
  GoogleSheetErrorResponse 
} from '../types';

// Helper para gestionar errores de fetch y formato
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  console.log(`[fetchData] Attempting request to: ${url} with options:`, options ? JSON.stringify(options) : 'no options');
  
  if (!SHEET_URL || SHEET_URL === DEFAULT_SHEET_URL_PLACEHOLDER) {
    console.error('[fetchData] SHEET_URL is not configured.');
    const errorResponse: GoogleSheetErrorResponse = { error: "La URL del script de Google Apps no está configurada en constants.ts." };
    throw errorResponse;
  }

  try {
    // For GET requests, ensure options is undefined or method is GET
    const fetchOptions = options?.method === 'POST' ? options : undefined;

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: response.statusText || `Error HTTP ${response.status}` };
      }
      console.error('[fetchData] Network response was not ok:', response.status, errorData);
      throw errorData as GoogleSheetErrorResponse;
    }
    const data = await response.json();
    console.log('[fetchData] Response data:', data);
    return data as T;
  } catch (error: any) {
    console.error('[fetchData] Fetch operation failed:', error);
    if (error.error) { 
      throw error;
    }
    throw { error: error.message || 'Falló la solicitud de red. Verifica la URL del script, la configuración de despliegue (CORS/permisos) y tu conexión a internet.' } as GoogleSheetErrorResponse;
  }
}


export const getCharacterList = async (): Promise<string[]> => {
  try {
    const cacheBust = `&_cb=${new Date().getTime()}`;
    const url = `${SHEET_URL}?action=getCharacterNames${cacheBust}`;
    const response = await fetchData<ApiCharacterListResponse>(url);
    if (Array.isArray(response)) {
      return response.filter(name => typeof name === 'string' && name.trim() !== '' && !name.startsWith('*'));
    } else if (response && (response as GoogleSheetErrorResponse).error) {
      throw response as GoogleSheetErrorResponse;
    }
    throw { error: 'Respuesta inesperada del servidor al obtener la lista de personajes.' } as GoogleSheetErrorResponse;
  } catch (err) {
    console.error('[getCharacterList] Error:', err);
    throw err; 
  }
};

export const getCharacterData = async (characterName: string): Promise<CharacterData> => {
  try {
    const cacheBust = `&_cb=${new Date().getTime()}`;
    const url = `${SHEET_URL}?personaje=${encodeURIComponent(characterName)}${cacheBust}`;
    const response = await fetchData<ApiCharacterResponse>(url);
    if (response && !(response as GoogleSheetErrorResponse).error) {
      return response as CharacterData;
    } else if (response && (response as GoogleSheetErrorResponse).error) {
      throw response as GoogleSheetErrorResponse;
    }
    throw { error: `Respuesta inesperada del servidor al obtener datos para ${characterName}.` } as GoogleSheetErrorResponse;
  } catch (err) {
    console.error(`[getCharacterData] Error for ${characterName}:`, err);
    throw err;
  }
};

export const createCharacter = async (characterName: string): Promise<ApiMutationResponse> => {
  try {
    const cacheBust = `&_cb=${new Date().getTime()}`;
    const url = `${SHEET_URL}?action=create&personaje=${encodeURIComponent(characterName)}${cacheBust}`;
    // No options needed for GET request in fetchData helper, it will use default fetch
    const response = await fetchData<ApiMutationResponse>(url);
    return response;
  } catch (err) {
    console.error(`[createCharacter] Error for ${characterName}:`, err);
    throw err; 
  }
};

export const updateCharacterData = async (characterName: string, data: Partial<CharacterData>): Promise<ApiMutationResponse> => {
  try {
    const dataString = JSON.stringify(data);
    const encodedData = encodeURIComponent(dataString);
    const cacheBust = `&_cb=${new Date().getTime()}`;
    const url = `${SHEET_URL}?action=update&personaje=${encodeURIComponent(characterName)}&datos=${encodedData}${cacheBust}`;
    // No options needed for GET request in fetchData helper
    const response = await fetchData<ApiMutationResponse>(url);
    return response;
  } catch (err) {
    console.error(`[updateCharacterData] Error for ${characterName}:`, err);
    throw err;
  }
};