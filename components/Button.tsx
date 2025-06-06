
import React from 'react';
import { APP_COLORS } from '../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'unsaved';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className, ...props }) => {
  const baseStyle = "font-semibold py-2 px-4 rounded-sm transition-colors duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed shadow-sm";
  
  let variantStyle = `bg-[${APP_COLORS.buttonDefaultBgHex}] hover:bg-[${APP_COLORS.buttonDefaultHoverBgHex}] text-[${APP_COLORS.buttonDefaultTextHex}]`;
  if (variant === 'unsaved') {
    variantStyle = `bg-[${APP_COLORS.buttonUnsavedBgHex}] hover:bg-[${APP_COLORS.buttonUnsavedHoverBgHex}] text-[${APP_COLORS.buttonUnsavedTextHex}] shadow-md shadow-[${APP_COLORS.alertDangerBorderColorHex}]/30`;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
