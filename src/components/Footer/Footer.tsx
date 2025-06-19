function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-gray-800 text-white p-4 text-center w-full h-full items-center justify-around">  
        <figure className='w-full md:w-4/10 h-full flex flex-row items-center justify-center'>
          <img className='w-72' src="GobiernoDelChaco.png" alt="" />
        </figure>
      <div className="w-full md:w-2/10 flex flex-col justify-center items-center m-4 sm:m-0 text-sm 3xl:text-xl">
        <p>División de Capacitación y Estadísticas</p>
        <p>© 2024 - {`${(new Date().getFullYear())}`}  Todos los derechos reservados</p>
        <p>
        <a href="https://policiasistemas.chaco.gob.ar/violencia.capyesta/Manual_de_Uso_Violencia_de_Genero.pdf" download="Manual de uso.pdf">
        Manual de Uso
      </a>
        </p>
      </div>
        <figure className='w-full md:w-4/10 h-full flex flex-row items-center justify-center'>
          <img className='w-72' src="PoliciaDelChacoViolencia.png" alt="" />
        </figure>
    </footer>
  )
}
export default Footer