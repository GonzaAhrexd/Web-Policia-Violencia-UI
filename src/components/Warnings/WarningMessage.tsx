import { useState } from "react";
import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type WarningMessageProps = {
    mensaje: string
}

function WarningMessage({ mensaje }: WarningMessageProps) {

    const [visible, setVisible] = useState(true);

    const handleCloseWarning = () => {
        setVisible(false);
    }

    if (visible === false) {
        return null;
    } else {

        return (
            <div className="flex flex-row items-around justify-between bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                <div className="flex flex-row items-center justify-center" role="alert">
                    <ExclamationTriangleIcon className="w-12 h-12 items-center mr-2" />
                    <div>
                        <p className="font-bold">Advertencia</p>
                        <p>{mensaje}</p>
                    </div>
                </div>
                <button onClick={handleCloseWarning} className="text-yellow-500 hover:text-yellow-700">
                    <XMarkIcon className="w-8 h-8" />
                </button>
            </div>
        )
    }
}

export default WarningMessage