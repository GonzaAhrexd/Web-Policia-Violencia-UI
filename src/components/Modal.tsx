// Hooks
import { useEffect } from 'react';

// Interfaz de las props
interface ModalProps {
  texto: any;
  onClose: any;
  titulo: string;
}

function Modal({ texto, onClose, titulo }: ModalProps) {
  useEffect(() => {
    // Al presionar esc del teclado se cierra el modal
    const cerrarModal = (e: any) => {
      if (e.key === 'Escape') {
        onClose()
      }
    };
    // Agregar el evento al cargar el componente
    window.addEventListener('keydown', cerrarModal);
    // Remover el evento al desmontar el componente
    return () => {
      window.removeEventListener('keydown', cerrarModal);
    };
  }, []);
  return (
    <div className="fixed modal-display inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-lg leading-6 font-medium text-gray-900" id="modal-title"> {titulo} </h2>
            <div className="my-2">
              {texto.map((item: any, index: any) => (
                <div key={index} className="my-3">
                  <h1 className="bold">{index + 1 + "."} {item.tipo}</h1>
                  <p className="text-sm text-gray-500">{item.text}</p>
                  {item.subtext && item.subtext.map((subtexto: any, subindex: any) => (

                    <div key={subindex} className="flex justify-between ml-3">
                      <p className="text-sm text-gray-500">{subtexto}</p>
                    </div>))
                  }
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row items-center justify-center">
            <button type="button" className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-6/10" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;