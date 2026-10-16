'use client'

import { useState, useEffect } from 'react'
import { formatGroupName } from '@/utils/group-utils'

interface StudentModalProps {
    isOpen: boolean
    onClose: () => void
    catequizandoToEdit?: { id: string; nombres: string; apellidos: string } | null
    grupo: any
    onSave: (data: { id?: string; nombres: string; apellidos: string; }) => Promise<void> | void
}

export default function CatequizandoFormModal({
    isOpen,
    onClose,
    catequizandoToEdit,
    grupo,
    onSave,
}: StudentModalProps) {
    const [formData, setFormData] = useState({ nombres: '', apellidos: '' })
    const [isSaving, setIsSaving] = useState(false)

    // Cada vez que se abra el modal o cambie el alumno a editar, rellenamos o limpiamos el formulario
    useEffect(() => {
        if (catequizandoToEdit) {
            setFormData({
                nombres: catequizandoToEdit.nombres,
                apellidos: catequizandoToEdit.apellidos,
            })
        } else {
            setFormData({ nombres: '', apellidos: '' })
        }
    }, [catequizandoToEdit, isOpen])

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        
        // Enviamos los datos junto con el id si estamos editando
        await onSave({
            ...formData,
            id: catequizandoToEdit?.id,
        })

        setIsSaving(false)
        onClose()
    }

    const isEditing = !!catequizandoToEdit

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto'>
                <h3 className='text-lg font-bold font-sansation text-zinc-800 mb-4'>
                    {isEditing ? 'Editar Alumno' : 'Nuevo Alumno'}
                </h3>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Nombres *</label>
                        <input
                            type='text'
                            name='nombres'
                            placeholder='Ej. Sofía Elizabeth'
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                            autoFocus
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Apellidos *</label>
                        <input
                            type='text'
                            name='apellidos'
                            placeholder='Ej. Martínez Gómez'
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                        />
                    </div>

                    <div className='mt-2 font-sansation'>
                        <p className='text-xs text-zinc-500 text-center'>
                            {isEditing ? 'Este catequizando pertenece al grupo:' : 'Se asignará este catequizando al grupo de:'}
                        </p>
                        <p className='mt-1 text-zinc-700 text-base font-semibold text-center'>
                            {formatGroupName(grupo)}
                        </p>
                    </div>

                    <div className='flex gap-3 mt-3'>
                        <button
                            type='button'
                            onClick={onClose}
                            disabled={isSaving}
                            className='flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-sm hover:bg-zinc-50 transition disabled:opacity-50'
                        >
                            Cancelar
                        </button>
                        <button
                            type='submit'
                            disabled={isSaving}
                            className='flex-1 py-2.5 px-4 rounded-xl bg-[#8B0000] text-white font-bold text-sm hover:bg-red-900 transition shadow-md disabled:opacity-50'
                        >
                            {isSaving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}