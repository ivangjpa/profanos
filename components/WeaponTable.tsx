
import React from 'react';
import { Weapon } from '../types';
import { APP_COLORS } from '../constants';

interface WeaponTableProps {
  weapons: Weapon[];
  caption?: string;
}

const WeaponTable: React.FC<WeaponTableProps> = ({ weapons, caption }) => {
  if (!weapons || weapons.length === 0) {
    return <p className={`text-center text-[${APP_COLORS.bodyTextHex}] my-4`}>No hay armas para mostrar en esta categoría.</p>;
  }

  const thStyle = `p-3 text-left text-sm font-semibold text-[${APP_COLORS.pageBgHex}] bg-[${APP_COLORS.sectionTitleTextHex}] border-b border-[${APP_COLORS.accentGreenPrimaryHex}] sticky top-0 z-10`;
  const tdStyle = `p-3 text-[${APP_COLORS.bodyTextHex}] border-b border-[${APP_COLORS.cardBorderColorHex}]/70 align-top`;
  const rowStyle = `hover:bg-[${APP_COLORS.accentGreenPrimaryHex}]/10 transition-colors duration-150`;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]">
      <table className="min-w-full bg-transparent">
        {caption && (
          <caption className={`p-3 text-lg font-semibold text-left text-[${APP_COLORS.titleTextHex}] bg-[${APP_COLORS.cardBgClass}] border-b border-[${APP_COLORS.cardBorderColorHex}]`}>
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            <th className={`${thStyle} w-1/12 sm:w-[5%]`}>DAÑO</th>
            <th className={`${thStyle} w-3/12 sm:w-[25%]`}>ARMA</th>
            <th className={`${thStyle} w-3/12 sm:w-[25%]`}>HABILIDAD</th>
            <th className={`${thStyle} w-2/12 sm:w-[15%]`}>COSTE (1930s)</th>
            <th className={`${thStyle} w-3/12 sm:w-[30%]`}>NOTAS</th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((weapon, index) => (
            <tr key={index} className={rowStyle}>
              <td className={`${tdStyle} text-center font-semibold`}>{weapon.damage}</td>
              <td className={tdStyle}>{weapon.name}</td>
              <td className={tdStyle}>{weapon.ability}</td>
              <td className={tdStyle}>{weapon.cost}</td>
              <td className={`${tdStyle} text-sm`}>{weapon.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponTable;
