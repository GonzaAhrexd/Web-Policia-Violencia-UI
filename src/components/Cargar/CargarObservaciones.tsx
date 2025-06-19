// Hook 
import InputTextArea from '../InputComponents/InputTextArea'
import { UseFormRegister } from 'react-hook-form';
import InputCheckbox from '../InputComponents/InputCheckbox';

// Zustand
import { useStore } from '../../pages/CargarDenuncias/store'

import { useState } from 'react';

// Interface
interface observacionesProps {
  register: UseFormRegister<any>
  setValue?: any
  rolAgenteHidden?: boolean
  fileInputRef?: any
}

function CargarObservaciones({ fileInputRef, rolAgenteHidden, register, setValue }: observacionesProps) {
  const { isSolicitudAprehension, isAprehendido } = useStore();
  const [observacionRequired, setObservacionRequired] = useState(true);


  return (
    <div className='flex flex-col items-center w-full'>
      {(rolAgenteHidden !== null) && (!rolAgenteHidden) &&
        <div className='w-full lg:w-6/10'>
          <InputCheckbox disabled={!isSolicitudAprehension || isAprehendido} campo="Aprehensión" nombre="aprehension" register={register} setValue={setValue}  id="aprehension" />
          {fileInputRef &&
            <>
              <h1 className='font-medium ml-4'>Subir foto de la denuncia (opcional)</h1>
              <input ref={fileInputRef} type="file" accept="image/*" className='mb-2' required={false} onChange={() => setObservacionRequired(false)} />
            </>

          }
        </div>
      }

      <div className='flex flex-col items-center w-full'>
        <InputTextArea campo="Observaciones" nombre="observaciones" register={register} type="text" required={observacionRequired} />
      </div>
    </div>
  )
}

export default CargarObservaciones