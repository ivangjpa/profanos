
import React from 'react';
import { APP_COLORS } from '../constants';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className={`animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[${APP_COLORS.spinnerBorderColorHex}]`}></div>
      <p className={`ml-4 text-lg text-[${APP_COLORS.bodyTextHex}]`}>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
