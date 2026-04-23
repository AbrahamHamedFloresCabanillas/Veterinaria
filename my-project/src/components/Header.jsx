import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-center animate-slide-in">
      <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-center leading-tight tracking-tight text-slate-800 md:w-2/3">
        Seguimiento Pacientes <br className="hidden sm:block md:hidden lg:block hidden" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Veterinaria
        </span>
      </h1>
    </div>
  )
}

export default Header