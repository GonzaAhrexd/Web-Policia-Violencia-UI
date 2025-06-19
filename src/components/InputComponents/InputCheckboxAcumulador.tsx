import { useEffect } from "react";

type Autoridad = {
  id: number;
  nombre: string;
  valor: string;
};

type OpcionesCheckboxAcumulador = {
  opciones: Autoridad[];
  setStringAcumulador: React.Dispatch<React.SetStateAction<string>>;
  stringAcumulador: string;
  defaultSelected?: string[];
};

function InputCheckboxAcumulador({
  opciones,
  setStringAcumulador,
  stringAcumulador,
  defaultSelected,
}: OpcionesCheckboxAcumulador) {
  // Inicializa stringAcumulador con defaultSelected si está vacío
  useEffect(() => {
    if (defaultSelected && defaultSelected.length > 0 && !stringAcumulador.trim()) {
      // Normaliza defaultSelected eliminando espacios
      const normalizedDefault = defaultSelected.map((item) => item.trim());
      setStringAcumulador(normalizedDefault.join(","));
    }
  }, [defaultSelected, setStringAcumulador]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, nombre: string) => {
    const checked = e.target.checked;
    // Divide stringAcumulador en un array, eliminando espacios
    const items = stringAcumulador
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    let nuevosItems = checked
      ? [...items, nombre]
      : items.filter((item) => item !== nombre);

    setStringAcumulador(nuevosItems.join(","));
  };

  // Convierte stringAcumulador en un array para comparaciones exactas
  const selectedItems = stringAcumulador
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  return (
    <>
      {opciones.map((autoridad) => (
        <div key={autoridad.id} className="flex flex-row justify-start items-center">
          <div>
            <input
              className="cursor-pointer border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e, autoridad.nombre)}
              id={autoridad.id.toString()}
              checked={
                // Verifica coincidencia exacta en selectedItems o defaultSelected
                selectedItems.includes(autoridad.nombre) ||
                (defaultSelected && defaultSelected.map((item) => item.trim()).includes(autoridad.nombre))
              }
            />
          </div>
          <div>
            <label htmlFor={autoridad.id.toString()} className="cursor-pointer font-medium xl:text-sm">
              {autoridad.nombre}
            </label>
          </div>
        </div>
      ))}
    </>
  );
}

export default InputCheckboxAcumulador;