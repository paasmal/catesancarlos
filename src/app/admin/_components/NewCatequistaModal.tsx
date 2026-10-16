'use client'

import { useState } from 'react'

interface CatequistaFormData {
    nombres: string
    apellidos: string
    email: string
    telefono: string
    cedula: string
    role: 'catequista' | 'coordinador' | 'admin'
    coord_nivel?: string
    activo: boolean
}

interface NewCatequistaModalProps {
    onClose: () => void
    onSave: (data: CatequistaFormData) => Promise<void> | void
}

export default function NewCatequistaModal({ onClose, onSave }: NewCatequistaModalProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState<CatequistaFormData>({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        cedula: '',
        role: 'catequista',
        coord_nivel: '', // <--- 2. Inicializado en el estado
        activo: true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // Si cambia el rol y ya no es coordinador, limpiamos el nivel por si acaso
            ...(name === 'role' && value !== 'coord_nivel' ? { coord_nivel: '' } : {}),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.nombres.trim() || !formData.apellidos.trim() || !formData.email.trim() || isSaving) return

        // Validación extra en cliente si es coordinador
        if (formData.role === 'coordinador' && !formData.coord_nivel) {
            alert('El nivel es obligatorio para los coordinadores.')
            return
        }

        setIsSaving(true)

        try {
            await onSave(formData)
            onClose()
        } catch (error: any) {
            alert('Error al guardar: ' + (error.message || 'Ocurrió un error inesperado'))
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto'>
                <h3 className='text-xl font-bold font-sansation text-zinc-800 mb-4'>Nuevo Catequista</h3>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Nombres *</label>
                        <input
                            type='text'
                            name='nombres'
                            placeholder='Ej. Juan Carlos'
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
                            placeholder='Ej. Morales Pérez'
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Correo Electrónico *</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Ej. juan@correo.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Cédula</label>
                            <input
                                type='text'
                                name='cedula'
                                placeholder='Ej. 0912345678'
                                value={formData.cedula}
                                onChange={handleChange}
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Teléfono</label>
                            <input
                                type='tel'
                                name='telefono'
                                placeholder='Ej. 0991234567'
                                value={formData.telefono}
                                onChange={handleChange}
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-sansation text-zinc-500 mb-1'>Rol en el Sistema</label>
                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            disabled={isSaving}
                            className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50 bg-white capitalize'
                        >
                            <option value='catequista'>Catequista</option>
                            <option value='coordinador'>Coordinador</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>

                    {/* 3. Campo condicional: Solo aparece si el rol es 'coordinador' */}
                    {formData.role === 'coordinador' && (
                        <div>
                            <label className='block text-xs font-sansation text-zinc-500 mb-1'>Nivel a Cargo *</label>
                            <select
                                name='coord_nivel'
                                value={formData.coord_nivel || ''}
                                onChange={handleChange}
                                required={formData.role === 'coordinador'}
                                disabled={isSaving}
                                className='w-full px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000] font-sansation text-sm text-zinc-800 disabled:opacity-50 bg-white'
                            >
                                <option value=''>Seleccione un nivel...</option>
                                <option value='Iniciación'>Iniciación</option>
                                <option value='Primera Comunión'>Primera Comunión</option>
                                <option value='Confirmación'>Confirmación</option>
                            </select>
                        </div>
                    )}

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
