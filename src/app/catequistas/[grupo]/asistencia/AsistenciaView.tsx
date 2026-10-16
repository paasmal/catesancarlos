'use client'

import { useState } from 'react'
import Link from 'next/link'

import { formatGroupName } from '@/utils/group-utils'
import { ChevronLeft } from 'lucide-react'
import CatequizandoRowOnlyView from '../../_components/CatequizandoRowOnlyView'

type EstadoAsistencia = 'presente' | 'ausente' | 'justificado' | 'pendiente'

interface Catequizando {
    id: string
    nombres: string
    apellidos: string
    grupo_id: string
    creado?: string
}

interface Asistencia {
    id?: string
    alumno_id: string
    grupo_id: string
    fecha: string
    estado: EstadoAsistencia
}

interface AsistenciaViewProps {
    grupo: any
    grupoParam: string
    listaAlumnos: Catequizando[]
    listaAsistencias: Asistencia[]
}

// Helper para obtener el rango de fechas de la semana actual (Lunes a Domingo)
function getSemanaActualRange() {
    const now = new Date()
    const day = now.getDay() // 0 = Domingo, 1 = Lunes...
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1)

    const inicio = new Date(now.setDate(diffToMonday))
    inicio.setHours(0, 0, 0, 0)

    const fin = new Date(inicio)
    fin.setDate(inicio.getDate() + 6)
    fin.setHours(23, 59, 59, 999)

    return {
        inicioStr: inicio.toISOString().split('T')[0],
        finStr: fin.toISOString().split('T')[0],
    }
}

// Helper para obtener la fecha exacta del sábado de la semana actual
function getSabadoSemanaActual() {
    const now = new Date()
    const day = now.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Calculamos los días que faltan o se pasaron con respecto al sábado (día 6)
    const diffToSaturday = 6 - (day === 0 ? 7 : day)

    const sabado = new Date(now)
    sabado.setDate(now.getDate() + diffToSaturday)

    return sabado.toISOString().split('T')[0]
}

export default function AsistenciaView({ grupo, grupoParam, listaAlumnos, listaAsistencias }: AsistenciaViewProps) {
    const [catequizandos] = useState(listaAlumnos)

    // Cálculo del resumen semanal para las 4 tarjetas
    const { inicioStr, finStr } = getSemanaActualRange()
    const sabadoStr = getSabadoSemanaActual()

    // Mapeo del estado de cada alumno en la semana
    const alumnosConEstado = catequizandos.map((student) => {
        const registro = listaAsistencias.find(
            /* (a) => a.alumno_id === student.id && a.fecha >= inicioStr && a.fecha <= finStr */
            (a) => a.alumno_id === student.id && a.fecha === sabadoStr // <-- Cambiar el rango por comparación exacta
        )
        const estadoSemanal = registro?.estado || 'pendiente'

        return {
            student,
            estadoSemanal,
        }
    })

    const presentes = alumnosConEstado.filter((item) => item.estadoSemanal === 'presente').length
    const ausentes = alumnosConEstado.filter((item) => item.estadoSemanal === 'ausente').length
    const justificados = alumnosConEstado.filter((item) => item.estadoSemanal === 'justificado').length
    const pendientes = alumnosConEstado.filter((item) => item.estadoSemanal === 'pendiente').length

    return (
        <div className='max-w-7xl mx-auto px-4 py-6 font-sansation'>
            {/* Header / Navegación */}
            <div className='relative flex items-center mb-4'>
                <Link
                    href={`/catequistas/${grupoParam}`}
                    className='z-10 -ml-1 rounded-full text-[#8B0000] hover:text-zinc-900 transition flex-shrink-0'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>

                <h1 className='absolute left-1/2 -translate-x-1/2 text-zinc-800 text-xl font-semibold max-w-[80%] truncate text-center'>
                    {formatGroupName(grupo)}
                </h1>
            </div>

            <p className='text-zinc-600 text-sm'>Registro de asistencia del grupo.</p>

            {/* Resumen Rápido - 4 Cards Horizontales */}
            <div className='grid grid-cols-4 gap-2 mt-4 mb-2'>
                {/* Presentes */}
                <div className='bg-emerald-50 border border-emerald-100 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm'>
                    <span className='text-lg font-bold text-emerald-700 font-sansation leading-none mb-1'>
                        {presentes}
                    </span>
                    <span className='text-[10px] font-bold text-emerald-600 font-sansation truncate max-w-full'>
                        Presentes
                    </span>
                </div>

                {/* Faltas */}
                <div className='bg-red-50 border border-red-100 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm'>
                    <span className='text-lg font-bold text-red-700 font-sansation leading-none mb-1'>{ausentes}</span>
                    <span className='text-[10px] font-bold text-red-600 font-sansation truncate max-w-full'>
                        Faltas
                    </span>
                </div>

                {/* Justificados */}
                <div className='bg-amber-50 border border-amber-100 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm'>
                    <span className='text-lg font-bold text-amber-700 font-sansation leading-none mb-1'>
                        {justificados}
                    </span>
                    <span className='text-[10px] font-bold text-amber-600 font-sansation truncate max-w-full'>
                        Justificados
                    </span>
                </div>

                {/* Pendientes */}
                <div className='bg-zinc-100 border border-zinc-200 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm'>
                    <span className='text-lg font-bold text-zinc-700 font-sansation leading-none mb-1'>
                        {pendientes}
                    </span>
                    <span className='text-[10px] font-bold text-zinc-500 font-sansation truncate max-w-full'>
                        Pendientes
                    </span>
                </div>
            </div>

            {/* Cabecera del Listado */}
            <div className='mt-5 mb-4 flex items-center justify-between'>
                <h2 className='text-zinc-700 text-sm font-bold font-sansation uppercase tracking-wider'>Nombre</h2>
                <span className='text-zinc-400 text-sm font-bold font-sansation uppercase tracking-wider'>Estatus</span>
            </div>

            {/* Lista de Alumnos */}
            <div className='flex flex-col gap-3 overflow-y-auto pr-1'>
                {alumnosConEstado.length === 0 ? (
                    <p className='text-center text-zinc-400 py-8 text-sm font-sansation'>
                        No hay alumnos registrados en este grupo todavía.
                    </p>
                ) : (
                    alumnosConEstado.map(({ student, estadoSemanal }) => (
                        <CatequizandoRowOnlyView
                            key={student.id}
                            catequizando={student}
                            estadoSemanal={estadoSemanal}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
