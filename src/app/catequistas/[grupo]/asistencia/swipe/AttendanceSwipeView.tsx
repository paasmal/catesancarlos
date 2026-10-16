'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { formatGroupName } from '@/utils/group-utils'
import { ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react'

interface Student {
    id: string
    nombres: string
    apellidos: string
}

interface AttendanceSwipeViewProps {
    grupo: any
    grupoParam: string
    listaAlumnos: Student[]
}

// Función auxiliar para obtener el rango de la semana actual (Lunes a Domingo)
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

export default function AttendanceSwipeView({ grupo, grupoParam, listaAlumnos }: AttendanceSwipeViewProps) {
    const supabase = createClient()

    const [students, setStudents] = useState<Student[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [yaPasoLista, setYaPasoLista] = useState(false)
    const [completado, setCompletado] = useState(false)

    const currentStudent = students[currentIndex]
    const totalStudents = students.length

    // Filtrar en el cliente los alumnos que ya tienen asistencia registrada esta semana
    useEffect(() => {
        const verificarAsistenciasPendientes = async () => {
            if (!listaAlumnos || listaAlumnos.length === 0) {
                setStudents([])
                setLoading(false)
                return
            }

            const { inicioStr, finStr } = getSemanaActualRange()
            const studentIds = listaAlumnos.map((s) => s.id)

            const { data: asistenciasExistentes } = await supabase
                .from('asistencia')
                .select('alumno_id')
                .eq('grupo_id', grupo.id)
                .in('alumno_id', studentIds)
                .gte('fecha', inicioStr)
                .lte('fecha', finStr)

            const idsYaRegistrados = new Set(asistenciasExistentes?.map((a) => a.alumno_id) || [])

            if (idsYaRegistrados.size >= listaAlumnos.length) {
                setYaPasoLista(true)
                setLoading(false)
                return
            }

            const alumnosPendientes = listaAlumnos.filter((s) => !idsYaRegistrados.has(s.id))
            setStudents(alumnosPendientes)
            setLoading(false)
        }

        verificarAsistenciasPendientes()
    }, [listaAlumnos, grupo.id, supabase])

    // Manejar el voto (presente, ausente, justificado) con guardado incluyendo grupo_id
    const handleVote = (status: 'presente' | 'ausente' | 'justificado') => {
        if (!currentStudent) return

        const studentToSave = currentStudent
        const fechaHoy = new Date().toISOString().split('T')[0]

        // 1. Avanzar la interfaz de inmediato (Optimistic UI)
        if (currentIndex + 1 >= totalStudents) {
            setCompletado(true)
        } else {
            setCurrentIndex((prev) => prev + 1)
        }

        // 2. Guardar en Supabase enviando el grupo_id requerido
        supabase
            .from('asistencia')
            .upsert(
                {
                    alumno_id: studentToSave.id,
                    grupo_id: grupo.id,
                    estado: status,
                    fecha: fechaHoy,
                },
                { onConflict: 'alumno_id,fecha' }
            )
            .then(({ error }) => {
                if (error) {
                    console.error(`Error al guardar asistencia de ${studentToSave.nombres}:`, error.message)
                }
            })
    }

    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            handleVote('presente')
        } else if (info.offset.x < -threshold) {
            handleVote('ausente')
        }
    }

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] p-4 text-zinc-500 font-sansation'>
                Cargando grupo...
            </div>
        )
    }

    if (yaPasoLista) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6 max-w-md mx-auto'>
                <div className='w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4'>
                    ✅
                </div>
                <h2 className='text-2xl font-bold font-sansation text-zinc-800 mb-2'>
                    ¡Asistencia de la semana ya tomada!
                </h2>
                <p className='text-zinc-600 text-sm mb-6'>
                    Ya registraste la lista para <span className='font-bold'>{formatGroupName(grupo)}</span> en el transcurso de esta semana.
                </p>
                <Link
                    href={`/catequistas/${grupoParam}`}
                    className='px-6 py-3 bg-[#8B0000] text-white font-bold rounded-xl shadow-md hover:bg-red-900 transition'
                >
                    Volver al grupo
                </Link>
            </div>
        )
    }

    if (students.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6 max-w-md mx-auto'>
                <h2 className='text-xl font-bold font-sansation text-zinc-800 mb-2'>No hay alumnos pendientes</h2>
                <p className='text-zinc-500 text-sm mb-6'>
                    No hay alumnos por calificar en este grupo para esta semana.
                </p>
                <Link
                    href={`/catequistas/${grupoParam}`}
                    className='px-6 py-3 bg-[#8B0000] text-white font-bold rounded-xl shadow-md hover:bg-red-900 transition'
                >
                    Volver al grupo
                </Link>
            </div>
        )
    }

    if (completado) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6 max-w-md mx-auto'>
                <div className='w-16 h-16 rounded-full bg-red-100 text-[#8B0000] flex items-center justify-center text-3xl mb-4'>
                    🎉
                </div>
                <h2 className='text-2xl font-bold font-sansation text-zinc-800 mb-2'>¡Asistencia Guardada!</h2>
                <p className='text-zinc-600 text-sm mb-6'>
                    Se ha registrado la asistencia de los alumnos correctamente.
                </p>
                <Link
                    href={`/catequistas/${grupoParam}`}
                    className='px-6 py-3 bg-[#8B0000] text-white font-bold rounded-xl shadow-md hover:bg-red-900 transition'
                >
                    Volver al grupo
                </Link>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center  p-4 w-full max-w-md mx-auto'>
            <div className='w-full relative flex items-center mb-4'>
                <Link
                    href='/catequistas'
                    className='z-10 -ml-1 rounded-full text-[#8B0000] hover:text-zinc-900 transition flex-shrink-0'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>

                <h1 className='absolute left-1/2 -translate-x-1/2 text-zinc-800 text-xl font-semibold max-w-[80%] truncate text-center'>
                    {formatGroupName(grupo)}
                </h1>
            </div>
            <div className='w-full flex flex-col mb-4 px-2 gap-1'>
                <span className='text-xs font-sansation text-zinc-400 uppercase tracking-wider'>{formatGroupName(grupo)}</span>
                <div className='w-full flex justify-between items-center'>
                    <span className='text-sm font-sansation text-zinc-600 font-medium'>
                        Alumno {currentIndex + 1} de {totalStudents}
                    </span>
                    <div className='w-32 h-2 bg-zinc-200 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-[#8B0000] transition-all duration-300'
                            style={{ width: `${((currentIndex + 1) / totalStudents) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className='relative w-full h-96 flex items-center justify-center'>
                <AnimatePresence mode='wait'>
                    {currentStudent && (
                        <motion.div
                            key={currentStudent.id}
                            drag='x'
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={handleDragEnd}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                            exit={{ x: 200, opacity: 0, rotate: 20 }}
                            transition={{ duration: 0.2 }}
                            className='absolute w-full bg-white rounded-3xl shadow-2xl border border-zinc-100 p-8 flex flex-col items-center text-center cursor-grab active:cursor-grabbing select-none'
                        >
                            <div className='w-28 h-28 rounded-full bg-red-50 text-[#8B0000] flex items-center justify-center text-3xl font-bold font-sansation mb-6 shadow-inner pointer-events-none'>
                                {`${currentStudent.apellidos[0] || ''}${currentStudent.nombres[0] || ''}`.toUpperCase()}
                            </div>

                            <h2 className='text-2xl font-bold font-sansation text-zinc-800 mb-1 pointer-events-none'>
                                {currentStudent.apellidos}
                            </h2>
                            <p className='text-lg font-medium font-sansation text-zinc-600 mb-6 pointer-events-none'>
                                {currentStudent.nombres}
                            </p>

                            <div className='text-xs font-semibold text-zinc-400 uppercase tracking-wider pointer-events-none'>
                                ⬅️ Izquierda: Ausente | Derecha: Presente ➡️
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='flex justify-between w-full mt-6 gap-3'>
                <button
                    onClick={() => handleVote('ausente')}
                    className='flex-1 py-3 px-3 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 font-bold hover:bg-red-100 transition flex items-center justify-center gap-1 shadow-sm text-sm'
                >
                    ❌ Faltó
                </button>
                <button
                    onClick={() => handleVote('justificado')}
                    className='py-3 px-3 rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition flex items-center justify-center gap-1 shadow-sm text-xs'
                >
                    ⚠️ Justificado
                </button>
                <button
                    onClick={() => handleVote('presente')}
                    className='flex-1 py-3 px-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition flex items-center justify-center gap-1 shadow-sm text-sm'
                >
                    ✔️ Presente
                </button>
            </div>
        </div>
    )
}