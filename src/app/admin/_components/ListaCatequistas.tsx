'use client'

import { useState, useEffect, useRef } from 'react'
import { FolderPlus, MoreVertical, Trash2 } from 'lucide-react'

interface ListaCatequistasProps {
    initialData: any[]
    onAsignarGrupo: (catequista: any) => void
}

export function ListaCatequistas({ initialData, onAsignarGrupo }: ListaCatequistasProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenMenuId(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!initialData || initialData.length === 0) {
        return (
            <p className='text-xs text-zinc-400 font-sansation p-4 text-center'>No hay catequistas registrados aún.</p>
        )
    }

    return (
        <div className='flex flex-col gap-3 pb-16'>
            {initialData.map((cat) => {
                const iniciales = `${cat.nombres?.[0] || ''}${cat.apellidos?.[0] || ''}`.toUpperCase()
                const tieneGrupo = Array.isArray(cat.catequistas_grupos) && cat.catequistas_grupos.length > 0
                const isMenuOpen = openMenuId === cat.id

                return (
                    <div
                        key={cat.id}
                        className='relative flex items-center justify-between p-3.5 rounded-2xl bg-zinc-100 border border-zinc-100 shadow-sm'
                    >
                        {/* Información principal del catequista */}
                        <div className='flex items-center gap-3 flex-1'>
                            <div className='w-10 h-10 rounded-full bg-red-100 text-[#8B0000] font-bold flex items-center justify-center text-sm font-sansation'>
                                {iniciales || 'CT'}
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-sansation font-medium text-zinc-800 text-sm'>
                                    {cat.nombres} {cat.apellidos}
                                </span>
                                <span className='text-[10px] text-zinc-500 font-sansation'>
                                    {cat.email || 'Sin correo'}
                                </span>
                            </div>
                        </div>

                        {/* Lado derecho: Badge y Botón de opciones */}
                        <div
                            className='flex items-center gap-2 relative'
                            ref={isMenuOpen ? containerRef : null}
                        >
                            <span
                                className={`text-[10px] px-2.5 py-1 rounded-full font-bold font-sansation ${
                                    tieneGrupo ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#8B0000]'
                                }`}
                            >
                                {tieneGrupo ? 'Asignado' : 'Sin Grupo'}
                            </span>

                            <button
                                onClick={() => setOpenMenuId(isMenuOpen ? null : cat.id)}
                                className='p-1.5 rounded-xl hover:bg-zinc-200/60 text-zinc-500 transition'
                            >
                                <MoreVertical size={16} />
                            </button>

                            {/* Menú flotante contextual posicionado correctamente */}
                            {isMenuOpen && (
                                <div className='absolute right-0 top-8 w-44 bg-white rounded-2xl shadow-sm border border-zinc-200 z-[999] divide-y divide-zinc-100 animate-in fade-in zoom-in duration-150'>
                                    <button
                                        onClick={() => {
                                            setOpenMenuId(null)
                                            onAsignarGrupo(cat)
                                        }}
                                        className='w-full text-left px-4 py-2.5 text-xs font-sansation text-zinc-800 hover:bg-zinc-50 font-medium flex items-center gap-2'
                                    >
                                        <FolderPlus size={14} className='text-[#8B0000]'/> Asignar grupo
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpenMenuId(null)
                                            alert(`Eliminar o editar a: ${cat.nombres}`)
                                        }}
                                        className='w-full text-left px-4 py-2.5 text-xs font-sansation text-red-600 hover:bg-red-50 font-medium flex items-center gap-2'
                                    >
                                        <Trash2 size={14} /> Desabilitar catequista
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
