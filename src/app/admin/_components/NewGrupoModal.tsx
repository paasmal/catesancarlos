'use client'

import { useState } from 'react'

interface NewGrupoModalProps {
    onClose: () => void
    onSave: (grupoData: {
        comunidad: string
        nivel: string
        paralelo: number
        horario: string
        piso: string
        aula: string
    }) => Promise<void> | void
}

export function NewGrupoModal({ onClose, onSave }: NewGrupoModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        comunidad: 'centro',
        nivel: 'iniciacion',
        paralelo: '1',
        horario: '',
        piso: '',
        aula: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSaving(true)

            const dataToSave = {
                ...formData,
                paralelo: parseInt(formData.paralelo) || 1,
            }

            await onSave(dataToSave)
            onClose()
        } catch (error) {
            console.error('Error al guardar el grupo:', error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto'>
                <h3 className='text-xl font-bold font-sansation text-zinc-800 mb-4'>Nuevo Grupo</h3>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Comunidad *</label>
                        <select
                            name='comunidad'
                            value={formData.comunidad}
                            onChange={handleChange}
                            required
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50 bg-white capitalize'
                        >
                            <option value='centro'>Centro</option>
                            <option value='angeles'>Los Ángeles</option>
                            <option value='molinopamba'>Molinopamba</option>
                            <option value='dolorosa'>La Dolorosa</option>
                            <option value='auxiliadora'>María Auxiliadora</option>
                        </select>
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Nivel *</label>
                            <select
                                name='nivel'
                                value={formData.nivel}
                                onChange={handleChange}
                                required
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50 bg-white capitalize'
                            >
                                <option value='iniciacion'>Iniciación</option>
                                <option value='reconciliacion'>Reconciliación</option>
                                <option value='comunion'>Comunión</option>
                                <option value='biblico'>Año Bíblico</option>
                                <option value='seguimiento'>Seguimiento</option>
                                <option value='confirmacion'>Confirmación</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Paralelo *</label>
                            <input
                                type='number'
                                name='paralelo'
                                min='1'
                                value={formData.paralelo}
                                onChange={handleChange}
                                required
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Horario</label>
                        <input
                            type='text'
                            name='horario'
                            placeholder='Ej. Sábados 10:00 AM'
                            value={formData.horario}
                            onChange={handleChange}
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Piso</label>
                            <input
                                type='text'
                                name='piso'
                                placeholder='Ej. Segundo Piso'
                                value={formData.piso}
                                onChange={handleChange}
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                            />
                        </div>
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Aula</label>
                            <input
                                type='text'
                                name='aula'
                                placeholder='Ej. Aula 204'
                                value={formData.aula}
                                onChange={handleChange}
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 mt-3'>
                        <button
                            type='button'
                            onClick={onClose}
                            disabled={isSaving}
                            className='flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-sm hover:bg-zinc-50 transition disabled:opacity-50 font-sansation'
                        >
                            Cancelar
                        </button>
                        <button
                            type='submit'
                            disabled={isSaving}
                            className='flex-1 py-2.5 px-4 rounded-xl bg-[#8B0000] text-white font-bold text-sm hover:bg-red-900 transition shadow-md disabled:opacity-50 font-sansation'
                        >
                            {isSaving ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}