'use client'

import { Pencil, Trash2 } from 'lucide-react'

interface CatequizandoRowProps {
    catequizando: {
        id: string
        nombres: string
        apellidos: string
    }
    onEdit: (student: any) => void
    onDelete: (id: string) => Promise<void> | void
}

export default function CatequizandoRow({
    catequizando,
    onEdit,
    onDelete,
}: CatequizandoRowProps) {
    return (
        <div className='bg-zinc-100 p-3 rounded-2xl flex items-center justify-between gap-4 border border-zinc-100 shadow-sm'>
            <div className='flex items-center gap-2.5'>
                <div className='w-10 h-10 rounded-full bg-red-100 text-[#8B0000] font-bold flex items-center justify-center text-sm font-sansation'>
                    {`${catequizando.apellidos[0] || ''}${catequizando.nombres[0] || ''}`.toUpperCase()}
                </div>
                <div className='flex flex-col'>
                    <span className='font-sansation font-medium text-zinc-800 text-sm'>
                        {catequizando.apellidos} {catequizando.nombres}
                    </span>
                </div>
            </div>

            {/* Botones de acción con Lucide React */}
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => onEdit(catequizando)}
                    className='bg-white p-1.5 text-zinc-500 rounded-lg  border border-zinc-300 hover:text-zinc-800 hover:bg-zinc-200/70 transition'
                    title='Editar alumno'
                >
                    <Pencil className='w-4 h-4' />
                </button>
                <button
                    onClick={() => onDelete(catequizando.id)}
                    className='bg-white p-1.5 text-red-500 rounded-lg border border-red-200 hover:text-red-700 hover:bg-red-50 transition'
                    title='Eliminar alumno'
                >
                    <Trash2 className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}
