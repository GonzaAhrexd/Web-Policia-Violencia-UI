interface InfoTextProps {
  campo: string;
  valor: string;
}

function InfoText({campo, valor}: InfoTextProps) {
  return (
    <div className={`flex flex-col md:w-1/2`}>
    <span className='font-medium ml-4 xl:text-vw text-white'> {campo} </span> 
    <div className='flex items-center border open-sans bg-white border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2'> {valor} </div>
    </div>
  )
}

export default InfoText