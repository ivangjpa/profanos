
export interface CharacterData {
  // Fields from the allowed list, typically as strings from the sheet initially
  'Profesión'?: string;
  'Motivación Principal'?: string;
  'Pilares de Estabilidad'?: string;
  'Constitución'?: string;
  'Estabilidad Mental'?: string;
  'Fuerza'?: string;
  'Agilidad'?: string;
  'Inteligencia'?: string;
  'Carisma'?: string;
  'Percepción'?: string;
  'Voluntad'?: string;
  'Puntos de Estabilidad'?: string; // Max value from sheet
  'Crédito Social'?: string;
  'Puntos de Cordura'?: string; // Max value from sheet
  'Crédito Clandestino'?: string;
  'Puntos de Aguante'?: string; // Max value from sheet
  'Fondos disponibles'?: string;
  'Puntos de Experiencia'?: string;
  'Puntos de Fortuna'?: string;
  'Inventario'?: string;
  'Aguante actual'?: string; // Current editable value
  'Cordura actual'?: string; // Current editable value
  'Estabilidad actual'?: string; // Current editable value

  // Index signature to acknowledge other data might come from the sheet,
  // but the application will primarily use the fields defined above.
  [key: string]: string | number | undefined;
}

export interface CharacterFormData {
  // All fields are typed for form handling
  'Profesión': string;
  'Motivación Principal': string;
  'Pilares de Estabilidad': string;
  'Constitución': number;
  'Estabilidad Mental': number;
  'Fuerza': number;
  'Agilidad': number;
  'Inteligencia': number;
  'Carisma': number;
  'Percepción': number;
  'Voluntad': number;
  'Puntos de Estabilidad': number; // Max value
  'Crédito Social': number;
  'Puntos de Cordura': number; // Max value
  'Crédito Clandestino': number;
  'Puntos de Aguante': number; // Max value
  'Fondos disponibles': number;
  'Puntos de Experiencia': number;
  'Puntos de Fortuna': number;
  'Inventario': string;
  'Aguante actual': number; // Current editable value
  'Cordura actual': number; // Current editable value
  'Estabilidad actual': number; // Current editable value

  // Index signature can be useful if any unexpected data needs to be temporarily held,
  // though form logic will be driven by explicitly defined fields.
  [key: string]: string | number | undefined;
}

export interface GoogleSheetErrorResponse {
  error: string;
}

export interface GoogleSheetSuccessResponse {
  success: boolean;
  message?: string;
  error?: string; 
}

export type ApiCharacterResponse = CharacterData | GoogleSheetErrorResponse;
export type ApiCharacterListResponse = string[] | GoogleSheetErrorResponse;
export type ApiMutationResponse = GoogleSheetSuccessResponse;

export interface FieldDefinition {
  id: string; 
  label: string;
  type: 'number' | 'textarea'; // Simplified to 'number' or 'textarea' as per current usage.
  group: string;
  note?: string;
  rows?: number; // For textarea
}

export interface Weapon {
  damage: string;
  name: string;
  ability: string;
  cost: string;
  notes: string;
}
