import React from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
type Props = {
  mostrar: string;
  url: string;
  svg?: string;
  showAdminSection?: boolean;
  setShowAdminSection?: React.Dispatch<React.SetStateAction<boolean>>;
  SVGIcon?: any;
};

export default function CardMostrarSeccionAdmin({
  showAdminSection,
  setShowAdminSection,
}: Props): JSX.Element {
  return (
    <div
    className={`flex flex-row justify-between cursor-pointer rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:bg-sky-950 ${showAdminSection ? "bg-sky-950" : "bg-sky-900"} transform transition-transform duration-300 ease-in-out hover:scale-105`}
    onClick={() => setShowAdminSection?.(!showAdminSection)}
  >
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
      {showAdminSection ? 'Ocultar sección admin' : 'Mostrar sección admin'}
    </h5>
    <WrenchScrewdriverIcon className="text-white w-6" />
  </div>
      )
}