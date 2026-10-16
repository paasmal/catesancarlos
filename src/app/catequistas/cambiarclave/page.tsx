'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { cambiarPasswordAction } from '@/app/actions/user-actions'
import { Eye, EyeOff, ChevronLeft } from 'lucide-react'

export default function CambiarClavePage() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    // Estados para controlar la visibilidad de cada campo
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setMessage('')
        setError('')

        // Validar que las contraseñas nuevas coincidan
        if (newPassword !== confirmPassword) {
            setError('Las nuevas contraseñas no coinciden')
            return
        }

        setLoading(true)

        try {
            // Llamado a la Server Action
            const result = await cambiarPasswordAction({ 
                currentPassword, 
                newPassword 
            })

            if (!result.success) {
                setError(result.error || 'Ocurrió un error al actualizar la contraseña')
                return
            }

            setMessage('Contraseña actualizada correctamente')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err) {
            setError('Ocurrió un error en el servidor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-md mx-auto p-6 bg-white font-sansation'>
            <div className='flex items-center gap-2 mb-4'>
                <Link 
                    href='/catequistas' // O la ruta a la que deba regresar
                    className='rounded-full text-[#8B0000] hover:text-zinc-900 transition'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>
                <h1 className='text-zinc-800 text-xl font-semibold m-0'>Cambiar contraseña</h1>
            </div>

            {error && (
                <div className='mb-4 px-3 py-2 bg-red-50 border border-red-200 text-[#8B0000] text-xs text-center rounded-xl'>
                    {error}
                </div>
            )}

            {message && (
                <div className='mb-4 px-3 py-2 bg-green-50 border border-green-200 text-green-800 text-xs text-center rounded-xl'>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading} className='flex flex-col gap-3 border-0 m-0 p-0 min-w-0'>
                    {/* Contraseña actual */}
                    <div className='flex flex-col gap-1'>
                        <label className='block text-zinc-700 text-xs font-medium'>
                            Contraseña actual
                        </label>
                        <div className='relative'>
                            <input
                                type={showCurrent ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className='w-full px-3 py-2 pr-10 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:border-[#8B0000]'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowCurrent(!showCurrent)}
                                className='absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-700'
                            >
                                {showCurrent ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    {/* Nueva contraseña */}
                    <div className='flex flex-col gap-1'>
                        <label className='block text-zinc-700 text-xs font-medium'>
                            Nueva contraseña
                        </label>
                        <div className='relative'>
                            <input
                                type={showNew ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-full px-3 py-2 pr-10 text-ms border border-zinc-300 rounded-xl focus:outline-none focus:border-[#8B0000]'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowNew(!showNew)}
                                className='absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-700'
                            >
                                {showNew ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    {/* Confirmar nueva contraseña */}
                    <div className='flex flex-col gap-1'>
                        <label className='block text-zinc-700 text-xs font-medium'>
                            Confirmar nueva contraseña
                        </label>
                        <div className='relative'>
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full px-3 py-2 pr-10 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:border-[#8B0000]'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirm(!showConfirm)}
                                className='absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-700'
                            >
                                {showConfirm ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='mt-4 bg-[#8B0000] hover:bg-[#700000] py-3 rounded-xl text-white text-sm font-bold transition shadow-sm cursor-pointer disabled:opacity-50'
                    >
                        {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}