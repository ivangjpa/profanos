import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCharacterData, updateCharacterData } from '../services/googleSheetService';
import { CharacterData, CharacterFormData, FieldDefinition } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import Button from '../components/Button';
import { CHARACTER_FIELDS_CONFIG, DEFAULT_CHARACTER_FORM_DATA, APP_COLORS, SHEET_URL, DEFAULT_SHEET_URL_PLACEHOLDER } from '../constants';

const CharacterSheetPage: React.FC = () => {
  const { characterName } = useParams<{ characterName: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<CharacterFormData | null>(null);
  const [formData, setFormData] = useState<CharacterFormData>({ ...DEFAULT_CHARACTER_FORM_DATA });
  const [fieldDefinitions] = useState<FieldDefinition[]>(CHARACTER_FIELDS_CONFIG);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'pending' | 'saved' | 'error'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const decodedCharacterName = useMemo(() => characterName ? decodeURIComponent(characterName) : '', [characterName]);
  const isSheetUrlDefault = !SHEET_URL || SHEET_URL === DEFAULT_SHEET_URL_PLACEHOLDER;

  const loadCharacter = useCallback(async () => {
    if (!decodedCharacterName) {
      navigate('/');
      return;
    }
    if (isSheetUrlDefault) {
      setError("La URL del script de Google Apps no está configurada en constants.ts.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const dataFromSheet = await getCharacterData(decodedCharacterName);
      if (dataFromSheet && !(dataFromSheet as any).error) {
        
        const newFormData: CharacterFormData = { ...DEFAULT_CHARACTER_FORM_DATA };
        CHARACTER_FIELDS_CONFIG.forEach(configField => {
            const sheetValue = dataFromSheet[configField.id];
            if (configField.type === 'number') {
                (newFormData[configField.id as keyof CharacterFormData] as any) = sheetValue !== undefined ? (Number(sheetValue) || 0) : DEFAULT_CHARACTER_FORM_DATA[configField.id as keyof CharacterFormData];
            } else {
                (newFormData[configField.id as keyof CharacterFormData] as any) = sheetValue !== undefined ? String(sheetValue) : DEFAULT_CHARACTER_FORM_DATA[configField.id as keyof CharacterFormData];
            }
        });
        
        setInitialData(newFormData); // Store the processed data as initial
        setFormData(newFormData);
        setHasUnsavedChanges(false);
        setSaveStatus('idle');

      } else {
        throw new Error((dataFromSheet as any).error || 'Personaje no encontrado o formato de datos incorrecto.');
      }
    } catch (err: any) {
      const errorMessage = err.error || err.message || 'Error al cargar los datos del personaje desde Google Sheets.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [decodedCharacterName, navigate, isSheetUrlDefault]);

  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldDef = fieldDefinitions.find(fd => fd.id === name);
    const isNumeric = fieldDef && fieldDef.type === 'number';

    setFormData(prev => ({
      ...prev,
      [name]: isNumeric ? (value === '' ? '' : (parseFloat(value) || 0)) : value,
    }));

    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
      setSaveStatus('pending');
    }
  };
  
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldDef = fieldDefinitions.find(fd => fd.id === name);
    if (fieldDef && fieldDef.type === 'number' && value === '') {
        setFormData(prev => ({ ...prev, [name]: 0 }));
    }
  };

  const handleSave = async () => {
    if (!decodedCharacterName || !hasUnsavedChanges || isSheetUrlDefault) return;
    
    setIsSaving(true);
    setSaveStatus('idle'); 
    setError(null);
    
    try {
      const dataToSave: Partial<CharacterData> = {}; // Correct type for Google Sheet data
      CHARACTER_FIELDS_CONFIG.forEach(fieldDef => {
        const key = fieldDef.id as keyof CharacterData; // Use CharacterData keys
        const formValue = formData[key as keyof CharacterFormData]; // Access formData using the same key

        // All values sent to the sheet service should be strings.
        // If formValue is a number (e.g., 0 from an empty blurred input), it becomes "0".
        // If formValue is a string (e.g., from textarea), it remains a string.
        // Handle undefined/null from formData gracefully.
        (dataToSave[key] as any) = String(formValue ?? (fieldDef.type === 'number' ? '0' : ''));
      });

      const result = await updateCharacterData(decodedCharacterName, dataToSave);
      if (result.success) {
        setHasUnsavedChanges(false);
        setSaveStatus('saved');
        
        // Update initialData with the saved formData to reflect the new baseline
        setInitialData({ ...formData });

        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        throw new Error(result.error || 'No se pudo guardar los cambios en Google Sheets.');
      }
    } catch (err: any) {
      const errorMessage = err.error || err.message || 'Error de conexión al intentar guardar en Google Sheets.';
      setError(errorMessage);
      setSaveStatus('error'); 
      alert(`Error al guardar: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };
  
  const fieldGroups = useMemo(() => {
    const essentialDisplayFields = [
        'Puntos de Aguante', 'Aguante actual',
        'Puntos de Cordura', 'Cordura actual',
        'Puntos de Estabilidad', 'Estabilidad actual'
    ];
    
    return fieldDefinitions
        .filter(field => !essentialDisplayFields.includes(field.id)) 
        .reduce((acc, field) => {
            const groupName = field.group || 'Otros Datos';
            if (!acc[groupName]) acc[groupName] = [];
            acc[groupName].push(field);
            return acc;
    }, {} as Record<string, FieldDefinition[]>);
  }, [fieldDefinitions]);


  if (isLoading && !initialData) return <LoadingSpinner />;
  
  if (isSheetUrlDefault) {
     return (
        <div className={`w-full max-w-4xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-lg rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
         <div className={`${APP_COLORS.alertDangerBgClass} border-l-4 border-[${APP_COLORS.alertDangerBorderColorHex}] text-[${APP_COLORS.alertDangerTextHex}] p-4 mb-6 rounded-sm`} role="alert">
            <p className="font-bold">Configuración Requerida</p>
            <p>La URL del script de Google Apps (<code>SHEET_URL</code>) no está configurada en el archivo <code>constants.ts</code>.</p>
          </div>
          <Link to="/" className={`inline-block mt-4 bg-[${APP_COLORS.buttonDefaultBgHex}] hover:bg-[${APP_COLORS.buttonDefaultHoverBgHex}] text-[${APP_COLORS.buttonDefaultTextHex}] font-semibold py-2 px-4 rounded-sm`}>
             Volver al Índice
          </Link>
        </div>
      );
  }
  
  if (error && !initialData && !isLoading) { 
    return (
      <div className={`w-full max-w-4xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-lg rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
        <p className={`text-[${APP_COLORS.alertDangerTextHex}] text-center mb-4`}>{error}</p>
        <Link to="/" className={`inline-block bg-[${APP_COLORS.buttonDefaultBgHex}] hover:bg-[${APP_COLORS.buttonDefaultHoverBgHex}] text-[${APP_COLORS.buttonDefaultTextHex}] font-semibold py-2 px-4 rounded-sm`}>Volver al Índice</Link>
      </div>
    );
  }
  
  if (fieldDefinitions.length === 0 && !isLoading) {
     return (
      <div className={`w-full max-w-4xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-lg rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
        <p className={`text-[${APP_COLORS.bodyTextHex}] text-center`}>No se pudieron cargar las definiciones de campos para el personaje.</p>
        <Link to="/" className={`mt-4 inline-block bg-[${APP_COLORS.buttonDefaultBgHex}] hover:bg-[${APP_COLORS.buttonDefaultHoverBgHex}] text-[${APP_COLORS.buttonDefaultTextHex}] font-semibold py-2 px-4 rounded-sm`}>Volver al Índice</Link>
      </div>
    );
  }

  let saveButtonText = 'Guardar Cambios';
  let saveButtonVariant: 'default' | 'unsaved' = 'default';

  if (isSaving) {
    saveButtonText = 'Guardando...';
  } else if (saveStatus === 'saved') {
    saveButtonText = 'Guardado ✓';
  } else if (hasUnsavedChanges || saveStatus === 'error' || saveStatus === 'pending') {
    saveButtonVariant = 'unsaved';
  }

  // Notes for max points now reflect they are from the sheet or calculated there
  const getNoteForMaxPoints = (fieldId: string): string | undefined => {
    const fieldDef = CHARACTER_FIELDS_CONFIG.find(f => f.id === fieldId);
    return fieldDef?.note;
  };

  return (
    <div className={`w-full max-w-5xl mx-auto p-4 sm:p-6 ${APP_COLORS.cardBgClass} shadow-xl rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b-2 pb-3 border-[${APP_COLORS.accentGreenPrimaryHex}]">
        <h1 className={`font-serif text-2xl lg:text-3xl font-bold text-[${APP_COLORS.titleTextHex}] mb-2 sm:mb-0`}>
          Ficha: {decodedCharacterName}
        </h1>
        <Link to="/" className={`text-sm font-semibold text-[${APP_COLORS.accentOchrePrimaryHex}] hover:text-[${APP_COLORS.accentOchreSecondaryHex}] self-start sm:self-center whitespace-nowrap`}>
          &larr; Volver al Índice
        </Link>
      </div>

      <div className={`mb-6 p-3 border border-dashed border-[${APP_COLORS.accentGreenPrimaryHex}]/50 rounded-md bg-[${APP_COLORS.accentGreenPrimaryHex}]/5`}>
        <h2 className={`font-serif text-lg font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mb-3 text-center sm:text-left`}>Puntos Esenciales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
          <div className="grid grid-cols-2 gap-x-3">
            <InputField id="Puntos de Aguante" name="Puntos de Aguante" label="P. Aguante (Max)" value={formData['Puntos de Aguante'] ?? 0} type="number" isReadOnly={true} note={getNoteForMaxPoints('Puntos de Aguante')} onChange={()=>{}} inputClassName="font-semibold" />
            <InputField id="Aguante actual" name="Aguante actual" label="Aguante Actual" value={formData['Aguante actual'] ?? ''} onChange={handleInputChange} onBlur={handleInputBlur} type="number" inputClassName="font-semibold"/>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <InputField id="Puntos de Cordura" name="Puntos de Cordura" label="P. Cordura (Max)" value={formData['Puntos de Cordura'] ?? 0} type="number" isReadOnly={true} note={getNoteForMaxPoints('Puntos de Cordura')} onChange={()=>{}} inputClassName="font-semibold"/>
            <InputField id="Cordura actual" name="Cordura actual" label="Cordura Actual" value={formData['Cordura actual'] ?? ''} onChange={handleInputChange} onBlur={handleInputBlur} type="number" inputClassName="font-semibold"/>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <InputField id="Puntos de Estabilidad" name="Puntos de Estabilidad" label="P. Estabilidad (Max)" value={formData['Puntos de Estabilidad'] ?? 0} type="number" isReadOnly={true} note={getNoteForMaxPoints('Puntos de Estabilidad')} onChange={()=>{}} inputClassName="font-semibold"/>
            <InputField id="Estabilidad actual" name="Estabilidad actual" label="Estabilidad Actual" value={formData['Estabilidad actual'] ?? ''} onChange={handleInputChange} onBlur={handleInputBlur} type="number" inputClassName="font-semibold"/>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {Object.entries(fieldGroups).map(([groupName, fieldsInGroup]) => {
          if (fieldsInGroup.length === 0) return null;
          
          let groupGridColsClass: string;
          if (groupName === "Atributos Primarios" || groupName === "Otros Recursos") {
            groupGridColsClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
          } else {
            const containsLongTextArea = fieldsInGroup.some(f => f.type === 'textarea' && (f.rows || 1) > 2);
            groupGridColsClass = containsLongTextArea ? "grid-cols-1" : (fieldsInGroup.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1");
          }

          return (
            <div key={groupName} className={`mb-6 p-3 border rounded-md shadow-sm border-[${APP_COLORS.cardBorderColorHex}]/70`}>
              <h2 className={`font-serif text-lg font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mb-4 pb-1.5 border-b border-[${APP_COLORS.accentGreenPrimaryHex}]/30`}>{groupName}</h2>
              <div className={`grid ${groupGridColsClass} gap-x-4 gap-y-0`}>
                {fieldsInGroup.map(field => {
                  const fieldValue = formData[field.id as keyof CharacterFormData];
                  if (field.type === 'textarea') {
                    return (
                      <TextAreaField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        value={String(fieldValue ?? '')}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        rows={field.rows || 2}
                        className={`mb-3 ${(groupGridColsClass !== 'grid-cols-1' && (field.rows || 2) > 2) ? 'sm:col-span-full' : ''}`}
                        note={field.note}
                      />
                    );
                  } else { 
                    return (
                      <InputField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type as 'number'} 
                        value={fieldValue ?? ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        note={field.note}
                        className="mb-3"
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
        
        <div className={`mt-6 pt-4 border-t border-[${APP_COLORS.accentGreenPrimaryHex}]/40 flex flex-col sm:flex-row justify-end items-center gap-3`}>
          {saveStatus === 'error' && error && !isSaving && <p className={`text-[${APP_COLORS.alertDangerTextHex}] text-sm mr-auto`}>{`Error al guardar: ${error}`}</p>}
          <Button type="submit" disabled={isSaving || !hasUnsavedChanges || isSheetUrlDefault} variant={saveButtonVariant} className="w-full sm:w-auto">
            {saveButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CharacterSheetPage;