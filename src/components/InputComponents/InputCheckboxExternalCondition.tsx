/* 
  [Input Checkbox External Condition]
  Se utiliza para crear un input de tipo checkbox con un label al lado y que puede realizar 
  cambios en los estados del componente padre.
*/

// Hooks
import { useEffect, useState } from 'react';

// Props
interface Props {
    campo: string;
    nombre: string;
    setValue: any;
    register: any;
    error?: any;
    setHook?: any;
    state?: any;
    id: any;
}

function InputCheckbox({ campo, nombre, setValue, setHook, state, id }: Props) {
  // Estado local para manejar el estado del checkbox
  const [isChecked, setIsChecked] = useState(state);

  // UseEffect para sincronizar el estado local con la prop [`state`]
  useEffect(() => {
    setIsChecked(state);
  }, [state]);

  // Actualiza el estado local y el externo cuando el checkbox cambia
  const handleChange = (e: any) => {
    const checked = e.target.checked;
    setIsChecked(checked); // Actualiza el estado local
    setValue(nombre, checked); // Actualiza el estado externo
    if (setHook) {
      setHook(checked);
    }
  };

  //  Usa `checked` en lugar de `defaultChecked`
  return (
    <div className="flex flex-row justify-start items-center">
      <div>
        <input
          className="border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
          type="checkbox"
          onChange={handleChange}
          checked={isChecked} // Controla el estado del checkbox
          id={id}
        />
      </div>
      <div>
        <label htmlFor={id} className="font-medium xl:text-sm">
          {campo}
        </label>
      </div>
    </div>
  );
}

export default InputCheckbox;