import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

type Props = {
  mostrar?: string; // This prop isn't used in the current component, but kept for consistency if needed later.
  url?: string; // This prop isn't used in the current component, but kept for consistency if needed later.
  svg?: string; // This prop isn't used in the current component, but kept for consistency if needed later.
  showAdminSection?: boolean;
  setShowAdminSection?: React.Dispatch<React.SetStateAction<boolean>>;
  SVGIcon?: any; // This prop isn't used in the current component, but kept for consistency if needed later.
};

export default function CardMostrarSeccionAdmin({
  showAdminSection,
  setShowAdminSection,
}: Props): JSX.Element {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []); 


  return (
    <div
      className={`
        rounded-lg md:h-32 lg:h-24 xl:h-20 p-6
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        cursor-pointer
        ${showAdminSection ? 'bg-sky-950' : 'bg-sky-900'}
        hover:bg-sky-950 transform  hover:scale-105
        transition-all duration-200 ease-out
        ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
      `}
      onClick={() => setShowAdminSection?.(!showAdminSection)}
    >
      <div className="flex flex-row md:flex-col md:items-center lg:flex-row lg:items-start justify-between">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
          {showAdminSection ? 'Ocultar' : 'Administración'}
        </h5>
        <WrenchScrewdriverIcon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}