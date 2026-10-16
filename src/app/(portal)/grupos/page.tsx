'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Search, User, Clock, Users } from 'lucide-react'

// Importamos la lista desde nuestro archivo separado
import { LISTA_CATEQUISTAS_GRUPOS } from '@/lib/catequistas-data'

// Filtros por Niveles de Catequesis
const NIVELES_FILTRO = [
    { label: 'Todos', key: 'TODOS' },
    { label: 'Iniciación', key: 'Iniciación' },
    { label: 'Reconciliación', key: 'Reconciliación' },
    { label: 'Comunión', key: 'Comunión' },
    { label: 'Año Bíblico', key: 'Año Bíblico' },
    { label: 'Seguimiento', key: 'Seguimiento' },
    { label: 'Confirmación', key: 'Confirmación' },
]

export default function CatequistasPage() {
    const [filtroBusqueda, setFiltroBusqueda] = useState('')
    const [filtroNivel, setFiltroNivel] = useState('TODOS')

    // Función auxiliar para quitar tildes y normalizar texto
    const normalizarTexto = (texto: string) => {
        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
    }

    // Manejador para cuando se cambia de categoría por botón
    const handleSeleccionarNivel = (key: string) => {
        setFiltroNivel(key)
        setFiltroBusqueda('') // Borra el texto ingresado en el buscador
    }

    // Filtrado robusto (ignora tildes y mayúsculas/minúsculas)
    const datosFiltrados = LISTA_CATEQUISTAS_GRUPOS.filter((item) => {
        const nivelNormalizado = normalizarTexto(item.nivel)
        const filtroNivelNormalizado = normalizarTexto(filtroNivel)

        const coincideNivel = filtroNivel === 'TODOS' || nivelNormalizado.includes(filtroNivelNormalizado)

        const textoBusquedaNormalizado = normalizarTexto(filtroBusqueda)
        const responsableNormalizado = normalizarTexto(item.responsable)

        const coincideTexto =
            nivelNormalizado.includes(textoBusquedaNormalizado) ||
            responsableNormalizado.includes(textoBusquedaNormalizado) ||
            item.colaboradores.some((c) => normalizarTexto(c).includes(textoBusquedaNormalizado))

        return coincideNivel && coincideTexto
    })

    return (
        <div className='max-w-md mx-auto bg-zinc-50 min-h-screen pb-12 font-sansation text-zinc-800 px-4 pt-4'>
            {/* Header de navegación */}
            <div className='relative flex items-center mb-5'>
                <Link
                    href='/'
                    className='z-10 -ml-1 rounded-full text-[#8B0000] hover:text-zinc-900 transition flex-shrink-0'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>

                <h1 className='absolute left-1/2 -translate-x-1/2 text-zinc-800 text-xl font-semibold max-w-[80%] truncate text-center'>
                    Catequistas y Grupos
                </h1>
            </div>

            {/* Buscador interactivo */}
            <div className='relative mb-5'>
                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
                <input
                    type='text'
                    placeholder='Buscar por nombre de catequista o nivel...'
                    value={filtroBusqueda}
                    onChange={(e) => setFiltroBusqueda(e.target.value)}
                    className='w-full bg-white border border-zinc-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#8B0000] transition shadow-xs'
                />
            </div>

            {/* Filtros rápidos por Niveles */}
            <div className='flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none -mx-4 px-4'>
                {NIVELES_FILTRO.map((nivel) => (
                    <button
                        key={nivel.key}
                        onClick={() => handleSeleccionarNivel(nivel.key)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition ${
                            filtroNivel === nivel.key
                                ? 'bg-[#8B0000] text-white shadow-sm'
                                : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-100'
                        }`}
                    >
                        {nivel.label}
                    </button>
                ))}
            </div>

            {/* Lista de Grupos y Catequistas */}
            <div className='flex flex-col gap-3'>
                {datosFiltrados.length > 0 ? (
                    datosFiltrados.map((item) => (
                        <div
                            key={item.id}
                            className='bg-white rounded-2xl p-4 shadow-xs border border-zinc-200/80 flex flex-col gap-3'
                        >
                            {/* Cabecera del Nivel y Horario */}
                            <div className='flex items-center justify-between border-b border-zinc-100 pb-2.5'>
                                <span className='text-xs font-bold text-[#8B0000] tracking-tight uppercase font-sansation'>
                                    {item.nivel}
                                </span>
                                <div className='flex items-center gap-1 bg-red-50 text-[#8B0000] border border-red-100 px-2 py-0.5 rounded-full text-[10px] font-bold'>
                                    <Clock className='w-3 h-3' />
                                    <span>{item.horario}</span>
                                </div>
                            </div>

                            {/* Lista unificada de Catequistas */}
                            <div className='flex flex-col gap-2'>
                                {/* Responsable principal */}
                                <div className='flex items-center gap-2.5 bg-red-50/50 border border-red-100/60 p-2 rounded-xl'>
                                    <div className='w-6 h-6 rounded-lg bg-red-100 text-[#8B0000] flex items-center justify-center flex-shrink-0'>
                                        <User className='w-3.5 h-3.5' />
                                    </div>
                                    <span className='text-xs font-bold text-zinc-900'>{item.responsable}</span>
                                </div>

                                {/* Colaboradores */}
                                {item.colaboradores.map((colab, idx) => (
                                    <div
                                        key={idx}
                                        className='flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 p-2 rounded-xl'
                                    >
                                        <div className='w-6 h-6 rounded-lg bg-zinc-200 text-zinc-600 flex items-center justify-center flex-shrink-0'>
                                            <Users className='w-3.5 h-3.5' />
                                        </div>
                                        <span className='text-xs font-medium text-zinc-700'>{colab}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-12 bg-white rounded-2xl border border-zinc-200/80'>
                        <p className='text-xs text-zinc-400 font-medium'>
                            No se encontraron resultados para el nivel o búsqueda seleccionada.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
