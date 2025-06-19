
interface ShowTextAreaProps {
  campo?: string;
  dato: string;
}

function ShowTextArea({ dato}:ShowTextAreaProps) {
  return (
    <div className={`flex flex-col w-8/10 md:w-full`}>
    <textarea className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-56 " value={dato} readOnly/>
    </div>
  )
}

export default ShowTextArea