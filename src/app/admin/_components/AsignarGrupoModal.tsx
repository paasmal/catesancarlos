'use client'

import { useState } from 'react'
import { FolderPlus, X } from 'lucide-react'

const capitalizar = (texto: string) => {
    if (!texto) return ''
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

const formatearNombreGrupo = (grupo: any) => {
    const nivel = capitalizar(grupo.nivel)
    const comunidad = capitalizar(grupo.comunidad)
    
    return `${nivel} ${grupo.paralelo} - ${comunidad}`
}

interface AssignGrupoModalProps {
    catequista: any
    grupos: any[]
    onClose: () => void
    onSave: (catequistaId: string, grupoId: string) => void
}

export function AsignarGrupoModal({ catequista, grupos, onClose, onSave }: AssignGrupoModalProps) {
    const [selectedGrupoId, setSelectedGrupoId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSave = async () => {
        if (!selectedGrupoId) return
        setLoading(true)
        try {
            await onSave(catequista.id, selectedGrupoId)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-200'>
            <div className='bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-zinc-100 flex flex-col gap-5'>
                {/* Cabecera del Modal */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-2xl bg-red-100 text-[#8B0000] flex items-center justify-center'>
                            <FolderPlus size={20} />
                        </div>
                        <div>
                            <h3 className='font-sansation font-bold text-base text-zinc-800'>Asignar Grupo</h3>
                            <p className='text-xs text-zinc-500 font-sansation'>
                                Catequista:{' '}
                                <span className='font-medium text-zinc-700'>
                                    {catequista?.nombres} {catequista?.apellidos}
                                </span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className='p-2 rounded-xl text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition'
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Contenido / Selector de Grupos */}
                <div className='flex flex-col gap-2'>
                    <label className='text-xs font-sansation font-medium text-zinc-700'>
                        Selecciona un grupo disponible
                    </label>
                    <select
                        value={selectedGrupoId}
                        onChange={(e) => setSelectedGrupoId(e.target.value)}
                        className='w-full p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-sansation text-zinc-800 outline-none focus:border-[#8B0000] focus:bg-white transition'
                    >
                        <option value=''>-- Seleccionar grupo --</option>
                        {grupos.map((grupo) => (
                            <option
                                key={grupo.id}
                                value={grupo.id}
                            >
                                {formatearNombreGrupo(grupo)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botones de acción */}
                <div className='flex items-center justify-end gap-2.5 pt-2'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2.5 rounded-2xl text-xs font-sansation font-medium text-zinc-600 hover:bg-zinc-100 transition'
                    >
                        Cancelar
                    </button>
                    <button
                        type='button'
                        onClick={handleSave}
                        disabled={!selectedGrupoId || loading}
                        className='px-5 py-2.5 rounded-2xl bg-[#8B0000] text-white text-xs font-sansation font-medium hover:bg-red-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
                    >
                        {loading ? 'Asignando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
