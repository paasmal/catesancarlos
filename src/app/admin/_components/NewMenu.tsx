'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, FolderKanban, Plus, Backpack } from 'lucide-react'

interface NewMenuProps {
    onNewCatequista: () => void
    onNewGrupo: () => void
    onNewCatequizando: () => void
}


export default function NewMenu({
    onNewCatequista,
    onNewGrupo,
    onNewCatequizando
}: NewMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='relative' ref={menuRef}>
            <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className='px-3.5 py-2 rounded-xl bg-[#8B0000] text-white text-xs font-bold font-sansation shadow-md hover:bg-red-900 transition flex items-center gap-1.5'
            >
                <Plus size={16} />
                <span>Nuevo</span>
            </button>

            {/* Menú flotante */}
            {isMenuOpen && (
                <div className='absolute right-0 mt-2 w-42 bg-white rounded-2xl shadow-xl border border-zinc-100 z-50 divide-y divide-zinc-100 animate-in fade-in zoom-in duration-150'>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false)
                            onNewCatequista()
                        }}
                        className='w-full text-left px-5 py-2.5 text-sm font-sansation text-zinc-800 hover:bg-zinc-50 font-medium flex items-center gap-2'
                    >
                        <Users size={14} className='text-[#8B0000]' /> Catequista
                    </button>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false)
                            onNewGrupo()
                        }}
                        className='w-full text-left px-5 py-2.5 text-sm font-sansation text-zinc-800 hover:bg-zinc-50 font-medium flex items-center gap-2'
                    >
                        <FolderKanban size={14} className='text-[#8B0000]' /> Grupo
                    </button>
                    <button
                        onClick={() => {
                            setIsMenuOpen(false)
                            onNewCatequizando()
                        }}
                        className='w-full text-left px-5 py-2.5 text-sm font-sansation text-zinc-800 hover:bg-zinc-50 font-medium flex items-center gap-2'
                    >
                        <Backpack size={14} className='text-[#8B0000]' /> Catequizando
                    </button>
                </div>
            )}
        </div>
    )
}