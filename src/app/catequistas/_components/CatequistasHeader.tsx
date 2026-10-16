'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import PageName from '@/components/PageName'
import UserMenu from './UserMenu'
import { UserRound } from 'lucide-react'

interface CatequistaProfile {
    id: string
    nombres: string
    apellidos: string
    email: string
    role: string
    activo: boolean
}

interface CatequistasHeaderProps {
    catequista?: CatequistaProfile
}

export default function CatequistasHeader({ catequista }: CatequistasHeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        setIsClosing(true) // Activa la animación de salida
        setTimeout(() => {
            setIsOpen(false)
            setIsClosing(false)
        }, 500) // Debe durar lo mismo que la animación CSS (200ms)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleClose()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    return (
        <header className='w-full z-50 border-b border-zinc-200 bg-white relative'>
            <div className='max-w-7xl mx-auto px-4 h-14 flex items-center justify-between'>
                {/* Menú hamburguesa */}
                <button
                    aria-label='Abrir menú'
                    className='p-2 -ml-2 text-zinc-800 hover:text-gray-900 transition-colors cursor-pointer'
                >
                    <svg
                        className='w-7 h-7'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </button>

                {/* Texto SCR en el centro */}
                <Link
                    href='/'
                    className='flex flex-col items-center text-center leading-tight group'
                >
                    <PageName />
                </Link>

                {/* Contenedor del Botón y Menú Desplegable */}
                <div className='relative' ref={menuRef}>
                    <button
                        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
                        aria-label='Perfil de usuario'
                        className='p-2 -mr-2 text-zinc-800 hover:text-[#8B0000] transition-colors cursor-pointer rounded-full'
                    >
                        <UserRound className='w-6 h-6' />
                    </button>

                    {/* Renderizamos el menú pasando el estado de cierre */}
                    {isOpen && (
                        <UserMenu
                            catequista={catequista}
                            onClose={handleClose}
                            isClosing={isClosing}
                        />
                    )}
                </div>
            </div>
        </header>
    )
}