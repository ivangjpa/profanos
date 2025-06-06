
import React from 'react';
import { APP_COLORS } from '../constants';

interface TextAreaFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isReadOnly?: boolean;
  rows?: number;
  note?: string;
  className?: string;
  inputClassName?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  isReadOnly = false,
  rows = 3,
  note,
  className = '',
  inputClassName = '',
}) => {
  const baseInputStyle = `w-full p-2 border rounded-sm shadow-sm focus:ring-1 focus:ring-offset-0`;
  const editableStyle = `${APP_COLORS.inputBgClass} border-[${APP_COLORS.inputBorderColorHex}] focus:border-[${APP_COLORS.inputFocusBorderColorHex}] focus:ring-[${APP_COLORS.inputFocusBorderColorHex}]`;
  const readOnlyStyle = isReadOnly ? `${APP_COLORS.inputReadonlyBgClass} text-[${APP_COLORS.inputReadonlyTextHex}] border-[${APP_COLORS.inputBorderColorHex}] cursor-not-allowed` : editableStyle;

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-[${APP_COLORS.bodyTextHex}] mb-1`}>
        {label}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={isReadOnly}
        rows={rows}
        className={`${baseInputStyle} ${readOnlyStyle} ${inputClassName}`}
      />
      {note && <p className={`mt-1 text-xs text-[${APP_COLORS.noteTextHex}]`}>{note}</p>}
    </div>
  );
};

export default TextAreaField;
