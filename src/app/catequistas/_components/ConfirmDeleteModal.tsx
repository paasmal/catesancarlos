'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => Promise<void> | void
    studentName: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, studentName }: ConfirmDeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    if (!isOpen) return null

    const handleConfirmClick = async () => {
        setIsDeleting(true)
        await onConfirm()
        setIsDeleting(false)
        onClose()
    }

    return (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='p-2.5 bg-red-100 text-red-600 rounded-2xl'>
                        <AlertTriangle className='w-6 h-6' />
                    </div>
                    <h3 className='text-lg font-bold font-sansation text-zinc-800'>Eliminar Catequizando</h3>
                </div>

                <p className='text-sm font-sansation text-zinc-600 text-center mb-1'>
                    ¿Estás seguro de que deseas eliminar a?
                </p>

                <p className='text-zinc-800 font-bold text-center mb-4'>{studentName}</p>

                <p className='text-[10px] text-center mb-6'>Esta acción no se puede deshacer.</p>

                <div className='flex gap-3'>
                    <button
                        type='button'
                        onClick={onClose}
                        disabled={isDeleting}
                        className='flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-sm hover:bg-zinc-50 transition disabled:opacity-50'
                    >
                        Cancelar
                    </button>
                    <button
                        type='button'
                        onClick={handleConfirmClick}
                        disabled={isDeleting}
                        className='flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition shadow-md disabled:opacity-50 flex items-center justify-center'
                    >
                        {isDeleting ? (
                            <span className='inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        ) : (
                            'Sí, eliminar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
