
import { FieldDefinition, CharacterFormData } from './types';

// !!! IMPORTANT: Replace this URL with your actual Google Apps Script URL !!!
export const SHEET_URL: string = "https://script.google.com/macros/s/AKfycbyA_3MftEhy8OOxS82LxCEpiubahcGZzJAUHvoKmfEihYpOtcPn-pIkLn3YVd0X0qOv/exec"; 
export const DEFAULT_SHEET_URL_PLACEHOLDER: string = "URL_DE_TU_SCRIPT_DE_GOOGLE_APPS";

export const CHARACTER_FIELDS_CONFIG: FieldDefinition[] = [
  // Detalles del Personaje
  { id: 'Profesión', label: 'Profesión', type: 'textarea', rows: 2, group: "Detalles del Personaje" },
  { id: 'Motivación Principal', label: 'Motivación Principal', type: 'textarea', rows: 3, group: "Detalles del Personaje" },
  { id: 'Pilares de Estabilidad', label: 'Pilares de Estabilidad', type: 'textarea', rows: 3, group: "Detalles del Personaje" },

  // Atributos Primarios
  { id: 'Constitución', label: 'Constitución', type: 'number', group: "Atributos Primarios" },
  { id: 'Estabilidad Mental', label: 'Estabilidad Mental', type: 'number', group: "Atributos Primarios" },
  { id: 'Fuerza', label: 'Fuerza', type: 'number', group: "Atributos Primarios" },
  { id: 'Agilidad', label: 'Agilidad', type: 'number', group: "Atributos Primarios" },
  { id: 'Inteligencia', label: 'Inteligencia', type: 'number', group: "Atributos Primarios" },
  { id: 'Carisma', label: 'Carisma', type: 'number', group: "Atributos Primarios" },
  { id: 'Percepción', label: 'Percepción', type: 'number', group: "Atributos Primarios" },
  { id: 'Voluntad', label: 'Voluntad', type: 'number', group: "Atributos Primarios" },

  // Campos para Puntos Esenciales (Maximos desde la hoja, Actuales editables)
  { id: 'Puntos de Aguante', label: 'Puntos de Aguante (Max)', type: 'number', group: "Recursos y Estado", note: '(Valor de Hoja)' },
  { id: 'Aguante actual', label: 'Aguante Actual', type: 'number', group: "Recursos y Estado" },
  { id: 'Puntos de Cordura', label: 'Puntos de Cordura (Max)', type: 'number', group: "Recursos y Estado", note: '(Valor de Hoja)' },
  { id: 'Cordura actual', label: 'Cordura Actual', type: 'number', group: "Recursos y Estado" },
  { id: 'Puntos de Estabilidad', label: 'Puntos de Estabilidad (Max)', type: 'number', group: "Recursos y Estado", note: '(Valor de Hoja)' },
  { id: 'Estabilidad actual', label: 'Estabilidad Actual', type: 'number', group: "Recursos y Estado" },

  // Otros Recursos
  { id: 'Crédito Social', label: 'Crédito Social', type: 'number', group: "Otros Recursos" },
  { id: 'Crédito Clandestino', label: 'Crédito Clandestino', type: 'number', group: "Otros Recursos" },
  { id: 'Fondos disponibles', label: 'Fondos Disponibles', type: 'number', group: "Otros Recursos" },
  { id: 'Puntos de Experiencia', label: 'Puntos de Experiencia', type: 'number', group: "Otros Recursos" },
  { id: 'Puntos de Fortuna', label: 'Puntos de Fortuna', type: 'number', group: "Otros Recursos" },
  
  // Inventario
  { id: 'Inventario', label: 'Inventario', type: 'textarea', rows: 5, group: "Inventario y Equipamiento" },
];


export const DEFAULT_CHARACTER_FORM_DATA: CharacterFormData = {
  'Profesión': '',
  'Motivación Principal': '',
  'Pilares de Estabilidad': '',
  'Constitución': 0,
  'Estabilidad Mental': 0,
  'Fuerza': 0,
  'Agilidad': 0,
  'Inteligencia': 0,
  'Carisma': 0,
  'Percepción': 0,
  'Voluntad': 0,
  'Puntos de Estabilidad': 0,
  'Crédito Social': 0,
  'Puntos de Cordura': 0,
  'Crédito Clandestino': 0,
  'Puntos de Aguante': 0,
  'Fondos disponibles': 0,
  'Puntos de Experiencia': 0,
  'Puntos de Fortuna': 0,
  'Inventario': '',
  'Aguante actual': 0,
  'Cordura actual': 0,
  'Estabilidad actual': 0,
};

export const APP_COLORS = {
  // Page: Applied in index.html body style & App.tsx
  pageBgHex: '#edeae3', // Vintage Paper
  pageTextHex: '#2c2a28', // Darker Ink for base page text

  // Card / Main content areas
  cardBgClass: 'bg-[#f5f2ed]', // Dossier Page
  cardBorderColorHex: '#c0b8ac', // Muted Sepia/Greyish Border for cards

  // Text Hierarchy
  titleTextHex: '#1a2e24', // Very Dark Green (almost black) - H1
  sectionTitleTextHex: '#3a5a40', // Tentacular Green - H2/Section Titles
  bodyTextHex: '#3a352f', // Dark Ink for main body text on cards/elements (labels, etc.)
  noteTextHex: '#8c6d3f', // Earthy Ochre for notes, secondary text

  // Accents
  accentGreenPrimaryHex: '#3a5a40', // Tentacular Green (same as section titles for consistency)
  accentGreenSecondaryHex: '#588157', // Slightly Lighter Green for hover or secondary green elements
  accentOchrePrimaryHex: '#a57f4b', // Richer Ochre for links, highlights
  accentOchreSecondaryHex: '#c49a6c', // Lighter Ochre for hover or secondary ochre elements

  // Button styles
  buttonDefaultBgHex: '#3a5a40', // Tentacular Green
  buttonDefaultHoverBgHex: '#2d4732', // Darker Tentacular Green
  buttonDefaultTextHex: '#f5f2ed', // Dossier Page (Light text for dark buttons)

  buttonUnsavedBgHex: '#9f4a4a', // Muted Crimson
  buttonUnsavedHoverBgHex: '#7d3a3a', // Darker Crimson
  buttonUnsavedTextHex: '#f5f2ed',

  // Alert (for config required message on HomePage)
  alertDangerTextHex: '#7d3a3a', // Darker crimson for text
  alertDangerBorderColorHex: '#9f4a4a', // Muted crimson for border
  alertDangerBgClass: 'bg-[#9f4a4a]/10', // Very light crimson/sepia background

  // Inputs
  inputBorderColorHex: '#c0b8ac', // Muted Sepia/Greyish Border
  inputFocusBorderColorHex: '#588157', // Lighter Green accent for focus
  inputBgClass: 'bg-[#fbf9f6]', // Slightly lighter than cardBg for input fields
  inputReadonlyBgClass: 'bg-[#e0dcd5]', // Slightly darker paper for readonly
  inputReadonlyTextHex: '#6b5f55', // Muted ink for readonly text

  // Spinner
  spinnerBorderColorHex: '#3a5a40', // Tentacular Green
};
