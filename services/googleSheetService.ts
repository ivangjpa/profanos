
import { SHEET_URL, DEFAULT_SHEET_URL_PLACEHOLDER } from '../constants';
import { CharacterData, CharacterFormData, GoogleSheetErrorResponse, ApiCharacterResponse, ApiCharacterListResponse, ApiMutationResponse } from '../types';

// Helper to create a standardized error object
function createErrorResponse(message: string): GoogleSheetErrorResponse {
  return { error: message };
}

async function fetchData<T>(url:string, options?: RequestInit): Promise<T> {
  if (SHEET_URL === DEFAULT_SHEET_URL_PLACEHOLDER || SHEET_URL === "URL_DE_TU_SCRIPT_DE_GOOGLE_APPS") {
    const errorMessage = "La URL del script de Google Apps no está configurada. Reemplaza la URL en constants.ts.";
    console.error("Error: SHEET_URL is not configured. Please replace 'URL_DE_TU_SCRIPT_DE_GOOGLE_APPS' in constants.ts with your Google Apps Script URL.");
    console.error("fetchData rejected due to unconfigured SHEET_URL:", errorMessage);
    return Promise.reject(createErrorResponse(errorMessage)) as unknown as T;
  }

  console.log(`[fetchData] Attempting request to: ${url}`, options ? `with options: ${JSON.stringify(options)}` : 'with no options');

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let message = `Error HTTP ${response.status}: ${response.statusText || 'Unknown server error'}`;
      try {
        const errorData = await response.json();
        if (typeof errorData === 'object' && errorData !== null) {
          if (typeof errorData.error === 'string') {
            message = errorData.error;
          } else if (typeof errorData.message === 'string') { 
            message = errorData.message;
          } else {
            const jsonDataString = JSON.stringify(errorData);
            if (jsonDataString !== '{}' && jsonDataString.length > 0 && jsonDataString.length < 200) {
                 message = `Error del servidor: ${jsonDataString}`;
            } else {
                message = `Error del servidor (cuerpo de error complejo). Estado: ${response.status}`;
            }
          }
        } else if (typeof errorData === 'string' && errorData.length > 0) {
            message = errorData; 
        }
      } catch (e) {
        // Failed to parse error JSON, or no JSON body. Stick with the initial message.
      }
      throw createErrorResponse(message);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json() as T;
    } else {
        const textResponse = await response.text(); 
        console.error('Respuesta inesperada (no JSON) del servidor:', textResponse);
        throw createErrorResponse(`Respuesta inesperada del servidor (no JSON): ${textResponse.substring(0,100)}`);
    }

  } catch (error: any) { 
    console.error('API request failed or error during processing:', error); // This line logs "Failed to fetch"

    if (typeof error === 'object' && error !== null && 'error' in error && typeof error.error === 'string') {
      throw error; // Re-throw if it's already a GoogleSheetErrorResponse
    }

    let errorMessage = 'Error de red, fallo en el procesamiento de la respuesta o URL de script incorrecta.';
    // Check if it's the generic "Failed to fetch" TypeError
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Falló la solicitud de red (Failed to fetch). Verifica la URL del script, la configuración de despliegue (CORS/permisos) y tu conexión a internet.';
    } else if (error instanceof Error && error.message) {
      errorMessage = error.message; 
    } else if (typeof error === 'string') { 
      errorMessage = error;
    }
    throw createErrorResponse(errorMessage);
  }
}

export const getCharacterList = async (): Promise<string[]> => {
  const url = `${SHEET_URL}?action=getCharacterNames`; 
  const response = await fetchData<ApiCharacterListResponse>(url);
  if (Array.isArray(response)) {
    return response.filter(name => name && typeof name === 'string'); 
  }
  if (typeof response === 'object' && response !== null && 'error' in response && typeof (response as GoogleSheetErrorResponse).error === 'string') {
     throw response as GoogleSheetErrorResponse; 
  }
  throw createErrorResponse("Respuesta inesperada al obtener la lista de personajes.");
};

export const getCharacterData = async (characterName: string): Promise<CharacterData> => {
  const url = `${SHEET_URL}?personaje=${encodeURIComponent(characterName)}`;
  const response = await fetchData<ApiCharacterResponse>(url);
   if (typeof response === 'object' && response !== null && 'error' in response && typeof (response as GoogleSheetErrorResponse).error === 'string') {
    throw response as GoogleSheetErrorResponse;
  }
  if (typeof response === 'object' && response !== null && !('error' in response) && !Array.isArray(response)) {
    return response as CharacterData;
  }
  throw createErrorResponse("Formato de datos de personaje inesperado.");
};

export const createCharacter = async (characterName: string): Promise<ApiMutationResponse> => {
  const payload = { action: 'create', personaje: characterName };
  const response = await fetchData<ApiMutationResponse>(SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload) 
  });

  if (typeof response === 'object' && response !== null && typeof response.success === 'boolean') {
    if (response.success) {
      return response; 
    } else {
      let errorMessage = "Error desconocido al crear el personaje (respuesta del script).";
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error) { 
        errorMessage = `Error del script al crear personaje: ${JSON.stringify(response.error).substring(0, 150)}`;
      } else if (typeof response.message === 'string') { 
        errorMessage = response.message;
      }
      throw createErrorResponse(errorMessage); 
    }
  }
  throw createErrorResponse("Respuesta inesperada del servidor al crear personaje (formato incorrecto).");
};

export const updateCharacterData = async (characterName: string, data: Partial<CharacterFormData>): Promise<ApiMutationResponse> => {
  const payload = {
    action: 'update',
    personaje: characterName,
    datos: data
  };
  const response = await fetchData<ApiMutationResponse>(SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (typeof response === 'object' && response !== null && typeof response.success === 'boolean') {
     if (response.success) {
      return response; 
    } else {
      let errorMessage = "Error desconocido al actualizar el personaje (respuesta del script).";
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error) { 
        errorMessage = `Error del script al actualizar personaje: ${JSON.stringify(response.error).substring(0, 150)}`;
      } else if (typeof response.message === 'string') {
        errorMessage = response.message;
      }
      throw createErrorResponse(errorMessage); 
    }
  }
  throw createErrorResponse("Respuesta inesperada del servidor al actualizar personaje (formato incorrecto).");
};
