'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, FolderKanban, GraduationCap } from 'lucide-react'
import NewMenu from './_components/NewMenu'
import NewCatequistaModal from './_components/NewCatequistaModal'
import { NewGrupoModal } from './_components/NewGrupoModal'
import { ListaCatequistas } from './_components/ListaCatequistas'

import { Catequista } from '@/types'
import { asignarCatequistaAGrupoAction, createCatequistaAction } from '../actions/catequistas'
import { createGrupoAction } from '../actions/grupos'
import { AsignarGrupoModal } from './_components/AsignarGrupoModal'

interface AdminDashboardViewProps {
    initialGrupos: any[]
    initialCatequistas: any[]
}

export default function AdminDashboardView({ initialGrupos, initialCatequistas }: AdminDashboardViewProps) {
    const [activeTab, setActiveTab] = useState<'grupos' | 'catequistas' | 'alumnos'>('grupos')
    const [showNewCatequistaModal, setShowNewCatequistaModal] = useState(false)
    const [showNewGrupoModal, setShowNewGrupoModal] = useState(false)
    const [selectedCatequista, setSelectedCatequista] = useState<any | null>(null)
    const [showAsignarModal, setShowAsignarModal] = useState<boolean>(false)

    const router = useRouter()

    const handleSaveCatequista = async (formData: Omit<Catequista, 'id' | 'created_at'>) => {
        try {
            await createCatequistaAction(formData)
            console.log('Catequista guardado en DB exitosamente')
        } catch (error: any) {
            console.error('Error al guardar:', error)
            throw error
        }
    }

    const handleSaveGrupo = async (grupoData: any) => {
        try {
            await createGrupoAction(grupoData)
            setShowNewGrupoModal(false)
        } catch (error: any) {
            alert(error.message)
        }
    }

    const handleAsignarGrupo = (catequista: any) => {
        setSelectedCatequista(catequista)
        setShowAsignarModal(true)
    }

    const handleSaveAsignacion = async (catequistaId: string, grupoId: string) => {
        try {
            // Llamamos a la Server Action
            const response = await asignarCatequistaAGrupoAction(catequistaId, grupoId)

            if (response?.success) {
                // Cierras el modal y limpias la selección si todo salió bien
                setShowAsignarModal(false)
                setSelectedCatequista(null)
                router.refresh()
                // Opcional: puedes mostrar una notificación de éxito aquí si usas toast
            } else {
                console.error('No se pudo completar la asignación:', response?.error)
                // Opcional: mostrar alerta de error al usuario
            }
        } catch (error) {
            console.error('Error al guardar la asignación:', error)
        }
    }

    return (
        <div className='flex flex-col items-center min-h-[85vh] p-4 max-w-md mx-auto w-full pb-24 relative'>
            {/* 1. Encabezado principal estilo app */}
            <div className='w-full flex justify-between items-center mb-6 relative'>
                <div>
                    <h1 className='text-xl font-bold font-sansation text-[#8B0000]'>Panel Admin</h1>
                    <p className='text-xs text-zinc-500 font-sansation'>Gestión Parroquial</p>
                </div>

                <NewMenu
                    onNewCatequista={() => setShowNewCatequistaModal(true)}
                    onNewGrupo={() => setShowNewGrupoModal(true)}
                    onNewCatequizando={() => {
                        alert('Abrir modal/formulario para Catequizando')
                    }}
                />

                {showNewCatequistaModal && (
                    <NewCatequistaModal
                        onClose={() => setShowNewCatequistaModal(false)}
                        onSave={handleSaveCatequista}
                    />
                )}

                {showNewGrupoModal && (
                    <NewGrupoModal
                        onClose={() => setShowNewGrupoModal(false)}
                        onSave={handleSaveGrupo}
                    />
                )}

                {showAsignarModal && (
                    <AsignarGrupoModal
                        catequista={selectedCatequista}
                        grupos={initialGrupos}
                        onClose={() => {
                            setShowAsignarModal(false)
                            setSelectedCatequista(null)
                        }}
                        onSave={handleSaveAsignacion}
                    />
                )}
            </div>

            {/* Contenedor principal blanco con bordes redondeados */}
            <div className='w-full bg-white rounded-3xl flex flex-col flex-1 p-1'>
                {/* Tarjetas de Resumen (KPIs) dinámicas */}
                <div className='grid grid-cols-3 gap-2 mb-6'>
                    <div className='bg-zinc-100 p-3 rounded-2xl text-center border border-zinc-100'>
                        <span className='text-[10px] text-zinc-500 font-sansation block uppercase tracking-wider'>
                            Grupos
                        </span>
                        <span className='text-base font-bold font-sansation text-[#8B0000]'>
                            {initialGrupos.length}
                        </span>
                    </div>
                    <div className='bg-zinc-100 p-3 rounded-2xl text-center border border-zinc-100'>
                        <span className='text-[10px] text-zinc-500 font-sansation block uppercase tracking-wider'>
                            Catequistas
                        </span>
                        <span className='text-base font-bold font-sansation text-emerald-700'>
                            {initialCatequistas.length}
                        </span>
                    </div>
                    <div className='bg-zinc-100 p-3 rounded-2xl text-center border border-zinc-100'>
                        <span className='text-[10px] text-zinc-500 font-sansation block uppercase tracking-wider'>
                            Alumnos
                        </span>
                        <span className='text-base font-bold font-sansation text-zinc-800'>0</span>
                    </div>
                </div>

                {/* Título de la sección activa */}
                <div className='flex justify-between items-center mb-4 px-1'>
                    <h2 className='text-zinc-700 font-bold font-sansation text-base capitalize'>
                        {activeTab === 'grupos' && 'Grupos Registrados'}
                        {activeTab === 'catequistas' && 'Catequistas'}
                        {activeTab === 'alumnos' && 'Alumnos'}
                    </h2>
                </div>

                {/* Listado dinámico según la pestaña activa */}
                <div className='flex flex-col gap-3.5 overflow-y-auto'>
                    {activeTab === 'grupos' &&
                        (initialGrupos.length === 0 ? (
                            <p className='text-xs text-zinc-400 font-sansation p-4 text-center'>
                                No hay grupos registrados aún.
                            </p>
                        ) : (
                            initialGrupos.map((grupo) => (
                                <div
                                    key={grupo.id}
                                    className='flex flex-col p-3.5 rounded-2xl bg-zinc-100 border border-zinc-100 shadow-sm gap-2'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <span className='text-[10px] font-bold text-[#8B0000] bg-red-100 px-2 py-0.5 rounded-full font-sansation capitalize'>
                                                {grupo.comunidad}
                                            </span>
                                            <h3 className='font-sansation font-bold text-zinc-800 text-sm mt-1 capitalize'>
                                                {grupo.nivel} {grupo.paralelo}
                                            </h3>
                                        </div>
                                        <span className='text-xs text-zinc-400'>{grupo.aula || 'Sin aula'}</span>
                                    </div>
                                    <div className='flex justify-between items-center text-xs text-zinc-500 pt-2 border-t border-zinc-200/60 font-sansation'>
                                        <span>📅 {grupo.horario || 'Sin horario'}</span>
                                        <span>📍 {grupo.piso || 'Sin piso'}</span>
                                    </div>
                                </div>
                            ))
                        ))}

                    {activeTab === 'catequistas' && (
                        <ListaCatequistas
                            initialData={initialCatequistas}
                            onAsignarGrupo={handleAsignarGrupo}
                        />
                    )}

                    {activeTab === 'alumnos' && (
                        <p className='text-xs text-zinc-400 font-sansation p-4 text-center'>
                            Próximamente sección de alumnos.
                        </p>
                    )}
                </div>
            </div>

            {/* 4. Barra de Navegación Inferior (Bottom Nav) */}
            <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 py-3 px-6 flex justify-around items-center max-w-md mx-auto z-30 shadow-lg'>
                <button
                    onClick={() => setActiveTab('grupos')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'grupos' ? 'text-[#8B0000] font-bold' : 'text-zinc-400'}`}
                >
                    <FolderKanban size={20} />
                    <span className='text-[10px] font-sansation'>Grupos</span>
                </button>

                <button
                    onClick={() => setActiveTab('catequistas')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'catequistas' ? 'text-[#8B0000] font-bold' : 'text-zinc-400'}`}
                >
                    <Users size={20} />
                    <span className='text-[10px] font-sansation'>Catequistas</span>
                </button>

                <button
                    onClick={() => setActiveTab('alumnos')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'alumnos' ? 'text-[#8B0000] font-bold' : 'text-zinc-400'}`}
                >
                    <GraduationCap size={20} />
                    <span className='text-[10px] font-sansation'>Alumnos</span>
                </button>
            </nav>
        </div>
    )
}
