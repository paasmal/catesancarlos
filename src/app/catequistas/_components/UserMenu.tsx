'use client'

import Link from 'next/link'
import { logoutAction } from '@/lib/auth-helpers'
import { User, KeyRound, LogOut } from 'lucide-react'

interface CatequistaProfile {
    id: string
    nombres: string
    apellidos: string
    email: string
    role: string
    activo: boolean
}

interface UserMenuProps {
    catequista?: CatequistaProfile
    onClose: () => void
    isClosing: boolean // Nueva prop para controlar la animación de salida
}

export default function UserMenu({ catequista, onClose, isClosing }: UserMenuProps) {
    return (
        <div
            className={`absolute -right-4 mt-1 bg-white border border-zinc-300 rounded-l-xl sm:rounded-xl shadow-xl z-50 ${
                isClosing ? 'animate-slide-close' : 'animate-slide-right'
            }`}
        >
            <div className='w-56'>
                <div className='px-4 py-4 border-b border-zinc-300'>
                    <p className='text-zinc-800 text-lg font-sansation font-semibold tracking-wide leading-none truncate'>
                        {catequista?.nombres || 'Usuario'}
                    </p>
                    <p className='mt-0.5 text-zinc-600 text-sm font-sansation font-normal tracking-wide leading-none truncate'>
                        {catequista?.apellidos || 'Usuario'}
                    </p>
                    {catequista?.email && (
                        <p className='text-[#8B0000] text-xs font-sansation truncate mt-2'>{catequista.email}</p>
                    )}
                </div>

                <div className='bg-zinc-100 p-3 font-sansation'>
                    <Link
                        href='/catequistas/perfil'
                        onClick={onClose}
                        className='w-full text-left px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors flex items-center gap-2 mb-1'
                    >
                        <User className='w-4 h-4 shrink-0' />
                        Mi cuenta
                    </Link>
                    <Link
                        href='/catequistas/cambiarclave'
                        onClick={onClose}
                        className='w-full text-left px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors flex items-center gap-2 mb-1'
                    >
                        <KeyRound className='w-4 h-4 shrink-0' />
                        Cambiar contraseña
                    </Link>

                    <form action={logoutAction}>
                        <button
                            type='submit'
                            className='w-full text-left px-2 py-1.5 text-sm font-medium text-[#8B0000] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer'
                        >
                            <LogOut className='w-4 h-4 shrink-0' />
                            Cerrar sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
