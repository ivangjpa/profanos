
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_COLORS } from '../constants';
import Button from '../components/Button';
import WeaponTable from '../components/WeaponTable';
import { rangedWeapons } from '../data/weaponsData';

const RangedWeaponsPage: React.FC = () => {
  const navigate = useNavigate();
  const paragraphStyle = `mb-4 text-[${APP_COLORS.bodyTextHex}] leading-relaxed`;

  return (
    <div className={`w-full max-w-5xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-xl rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b-2 pb-3 border-[${APP_COLORS.accentGreenPrimaryHex}]">
        <h1 className={`font-serif text-2xl lg:text-3xl font-bold text-[${APP_COLORS.titleTextHex}] mb-2 sm:mb-0`}>
          Manual de Armas: A Distancia
        </h1>
        <Button onClick={() => navigate('/')} className="text-sm self-start sm:self-center whitespace-nowrap">
          &larr; Volver al Índice
        </Button>
      </div>

      <div className="prose prose-sm sm:prose-base max-w-none" style={{ color: APP_COLORS.bodyTextHex }}>
         <p className={paragraphStyle}>
          Mantener la distancia puede ser la diferencia entre la vida y la locura. Aquí se catalogan armas de proyectiles, desde las más comunes hasta armamento más especializado, incluyendo explosivos. Recuerde, investigador, que el uso de ciertas armas puede atraer atención indeseada.
        </p>
        
        <WeaponTable weapons={rangedWeapons} />

      </div>
      <div className="mt-8 pt-6 border-t border-[${APP_COLORS.accentGreenPrimaryHex}]/40 text-center">
        <Button onClick={() => navigate('/')}>
          &larr; Volver al Índice
        </Button>
      </div>
    </div>
  );
};

export default RangedWeaponsPage;
