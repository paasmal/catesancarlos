'use client'

import Link from 'next/link'

interface PortalSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
    return (
        <div
            className={`fixed inset-0 z-50 flex transition-all duration-300 ${
                isOpen ? 'visible opacity-100' : 'invisible opacity-0 delay-300'
            }`}
        >
            {/* Fondo oscuro traslúcido con transición de opacidad */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            {/* Contenido del Sidebar con deslizamiento suave (slide in / slide out) */}
            <div
                className={`relative w-65 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Cabecera del Sidebar */}
                <div className='h-14 flex items-center justify-between px-4 border-b border-zinc-200 font-sansation'>
                    <span className='font-bold text-lg text-zinc-800'>Menú</span>
                    <button
                        onClick={onClose}
                        className='p-2 text-zinc-500 hover:text-zinc-900 rounded-lg cursor-pointer transition-colors'
                        aria-label='Cerrar menú'
                    >
                        ✕
                    </button>
                </div>

                {/* Opciones del menú */}
                <nav className='flex-1 overflow-y-auto px-2 py-4 space-y-0 font-sansation'>
                    <Link
                        href='/catequistas/horarios'
                        onClick={onClose}
                        className='flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 text-zinc-700 transition-colors group'
                    >
                        <span className='font-medium'>Horarios de catequesis</span>
                    </Link>

                    <Link
                        href='/catequistas/grupos'
                        onClick={onClose}
                        className='flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 text-zinc-700 transition-colors group'
                    >
                        <span className='font-medium'>Catequistas y grupos</span>
                    </Link>

                    <Link
                        href='/catequistas/aulas'
                        onClick={onClose}
                        className='flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 text-zinc-700 transition-colors group'
                    >
                        <span className='font-medium'>Distribución de aulas</span>
                    </Link>

                    {/* <Link
                        href='/catequistas/asistencia'
                        onClick={onClose}
                        className='flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 text-zinc-700 transition-colors group'
                    >
                        <span className='font-medium'>Asistencia Confirmación 2</span>
                    </Link> */}
                </nav>
            </div>
        </div>
    )
}
