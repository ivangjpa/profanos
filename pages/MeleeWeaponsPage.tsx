
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_COLORS } from '../constants';
import Button from '../components/Button';
import WeaponTable from '../components/WeaponTable';
import { meleeWeapons } from '../data/weaponsData';

const MeleeWeaponsPage: React.FC = () => {
  const navigate = useNavigate();

  const paragraphStyle = `mb-4 text-[${APP_COLORS.bodyTextHex}] leading-relaxed`;

  return (
    <div className={`w-full max-w-5xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-xl rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b-2 pb-3 border-[${APP_COLORS.accentGreenPrimaryHex}]">
        <h1 className={`font-serif text-2xl lg:text-3xl font-bold text-[${APP_COLORS.titleTextHex}] mb-2 sm:mb-0`}>
          Manual de Armas: Cuerpo a Cuerpo
        </h1>
        <Button onClick={() => navigate('/')} className="text-sm self-start sm:self-center whitespace-nowrap">
          &larr; Volver al Índice
        </Button>
      </div>

      <div className="prose prose-sm sm:prose-base max-w-none" style={{ color: APP_COLORS.bodyTextHex }}>
        <p className={paragraphStyle}>
          El combate cercano es una realidad brutal y a menudo inevitable. Esta sección detalla diversos instrumentos, desde los más improvisados hasta herramientas más contundentes, que un investigador podría emplear en situaciones límite donde la distancia se ha cerrado.
        </p>
        
        <WeaponTable weapons={meleeWeapons} />
        
      </div>
      <div className="mt-8 pt-6 border-t border-[${APP_COLORS.accentGreenPrimaryHex}]/40 text-center">
        <Button onClick={() => navigate('/')}>
          &larr; Volver al Índice
        </Button>
      </div>
    </div>
  );
};

export default MeleeWeaponsPage;
