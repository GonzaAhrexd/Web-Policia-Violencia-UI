/*
  [ Input Login ]
    Se utiliza para crear un input de tipo texto para el login.
*/
type InputLoginProps = {
    campo: string;
    register: any;
    type: string;
    error: any;
    placeholder?: string;
};

function InputLogin({ campo, register, type, error, placeholder }: InputLoginProps) {
    // Si no se recibe un placeholder, se asigna un string vacío
     placeholder ? placeholder : '';

    return (
        <>
            <input
                className='border open-sans border-gray-300 rounded-md w-full h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2'
                type={type}
                {...register(campo, { required: true })}
                placeholder={placeholder}
            />
            <span className='font-medium ml-4 '>
                {error && <span className='text-red-500'>Campo requerido</span>}
            </span>
        </>
    );
}

export default InputLogin;