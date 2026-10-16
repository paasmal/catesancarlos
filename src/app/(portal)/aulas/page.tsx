'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Building2, Info, Clock } from 'lucide-react'

interface Space {
    nombre: string
    tipo: 'aula' | 'servicio' | 'administrativo' | 'vacio'
    detalles?: string
}

interface HorarioData {
    hora: string
    titulo: string
    grid: Space[][]
}

// Definición de las distribuciones para cada uno de los 3 horarios
const HORARIOS_CONFIG: Record<string, HorarioData> = {
    '08h00': {
        hora: '08H00',
        titulo: 'Distribución - 08H00 a 10H00',
        grid: [
            // --- PISO 3 (Planta Alta 2) ---
            [
                { nombre: 'No usada', tipo: 'vacio' },
                { nombre: 'Confirmación 4', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Confirmación 5', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Confirmación 6', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Confirmación 7', tipo: 'aula', detalles: 'Piso 3' },
            ],
            // --- PISO 2 (Planta Alta 1) ---
            [
                { nombre: 'Coordinación', tipo: 'administrativo', detalles: 'Oficina' },
                { nombre: 'Sala de Catequistas', tipo: 'administrativo', detalles: 'Reuniones' },
                { nombre: 'Confirmación 2', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Confirmación 3', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Servicios Higiénicos', tipo: 'servicio', detalles: 'SS.HH. Damas / Varones' },
            ],
            // --- PISO 1 (Planta Baja) ---
            [
                { nombre: 'Bar', tipo: 'servicio', detalles: 'Cafetería / Snacks' },
                { nombre: 'Iniciación 1', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Iniciación 2', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Iniciación 3', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Confirmación 1', tipo: 'aula', detalles: 'Planta Baja' },
            ],
        ],
    },
    '10h30': {
        hora: '10H30',
        titulo: 'Distribución - 10H30 a 12H30',
        grid: [
            // --- PISO 3 (Planta Alta 2) ---
            [
                { nombre: 'No usada', tipo: 'vacio' },
                { nombre: 'Año Bíblico 2', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Año Bíblico 3', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Año Bíblico 4', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Año Bíblico 5', tipo: 'aula', detalles: 'Piso 3' },
            ],
            // --- PISO 2 (Planta Alta 1) ---
            [
                { nombre: 'Coordinación', tipo: 'administrativo', detalles: 'Oficina' },
                { nombre: 'Sala de Catequistas', tipo: 'administrativo', detalles: 'Reuniones' },
                { nombre: 'Reconciliación 5', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Año Bíblico 1', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Servicios Higiénicos', tipo: 'servicio', detalles: 'SS.HH. Damas / Varones' },
            ],
            // --- PISO 1 (Planta Baja) ---
            [
                { nombre: 'Bar', tipo: 'servicio', detalles: 'Cafetería / Snacks' },
                { nombre: 'Reconciliación 1', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Reconciliación 2', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Reconciliación 3', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Reconciliación 4', tipo: 'aula', detalles: 'Planta Baja' },
            ],
        ],
    },
    '13h00': {
        hora: '13H00',
        titulo: 'Distribución - 13H00 a 15H00',
        grid: [
            // --- PISO 3 (Planta Alta 2) ---
            [
                { nombre: 'Seguimiento 5', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Seguimiento 1', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Seguimiento 2', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Seguimiento 3', tipo: 'aula', detalles: 'Piso 3' },
                { nombre: 'Seguimiento 4', tipo: 'aula', detalles: 'Piso 3' },
            ],
            // --- PISO 2 (Planta Alta 1) ---
            [
                { nombre: 'Coordinación', tipo: 'administrativo', detalles: 'Oficina' },
                { nombre: 'Sala de Catequistas', tipo: 'administrativo', detalles: 'Reuniones' },
                { nombre: 'Comunión 5', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Comunión 6', tipo: 'aula', detalles: 'Piso 2' },
                { nombre: 'Servicios Higiénicos', tipo: 'servicio', detalles: 'SS.HH. Damas / Varones' },
            ],
            // --- PISO 1 (Planta Baja) ---
            [
                { nombre: 'Bar', tipo: 'servicio', detalles: 'Cafetería / Snacks' },
                { nombre: 'Comunión 1', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Comunión 2', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Comunión 3', tipo: 'aula', detalles: 'Planta Baja' },
                { nombre: 'Comunión 4', tipo: 'aula', detalles: 'Planta Baja' },
            ],
        ],
    },
}

export default function AulasPage() {
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('08h00')
    const datosActuales = HORARIOS_CONFIG[horarioSeleccionado]

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
                    Distribución de Aulas
                </h1>
            </div>

            {/* Selector de Horarios (Tabs) */}
            <div className='grid grid-cols-3 gap-1.5 bg-zinc-200/80 p-1 rounded-2xl mb-5'>
                {Object.keys(HORARIOS_CONFIG).map((key) => {
                    const item = HORARIOS_CONFIG[key]
                    const isActive = horarioSeleccionado === key
                    return (
                        <button
                            key={key}
                            onClick={() => setHorarioSeleccionado(key)}
                            className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                                isActive
                                    ? 'bg-[#8B0000] text-white shadow-sm'
                                    : 'text-zinc-600 hover:text-zinc-900 bg-transparent'
                            }`}
                        >
                            <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-red-100' : 'text-zinc-400'}`} />
                            <span>{item.hora}</span>
                        </button>
                    )
                })}
            </div>

            {/* Contenedor con Desplazamiento Horizontal para la Cuadrícula */}
            <div className='bg-white p-3 rounded-2xl border border-zinc-200/80 shadow-sm overflow-x-auto scrollbar-thin'>
                <div className='min-w-[560px] flex flex-col gap-2.5'>
                    
                    {/* Renderizado de las 3 Filas (Pisos) */}
                    {datosActuales.grid.map((fila, rowIndex) => {
                        const nivelPiso = rowIndex === 0 ? 'Piso 3' : rowIndex === 1 ? 'Piso 2' : 'Planta Baja'

                        return (
                            <div key={rowIndex} className='flex flex-col gap-1'>
                                {/* Etiqueta del nivel / piso */}
                                <span className='text-[10px] font-bold text-zinc-500 uppercase tracking-wider pl-1'>
                                    {nivelPiso}
                                </span>

                                {/* Cuadrícula de 5 columnas */}
                                <div className='grid grid-cols-5 gap-2'>
                                    {fila.map((espacio, colIndex) => {
                                        if (espacio.tipo === 'aula') {
                                            return (
                                                <div
                                                    key={colIndex}
                                                    className='bg-red-50/70 border border-red-200/80 rounded-xl p-2.5 flex flex-col justify-between min-h-[72px] shadow-xs'
                                                >
                                                    <span className='text-[9px] font-bold text-red-600 uppercase tracking-tight'>
                                                        AULA
                                                    </span>
                                                    <span className='text-xs font-bold text-[#8B0000] leading-tight font-sansation'>
                                                        {espacio.nombre}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        if (espacio.tipo === 'administrativo') {
                                            return (
                                                <div
                                                    key={colIndex}
                                                    className='bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 flex flex-col justify-between min-h-[72px]'
                                                >
                                                    <span className='text-[9px] font-bold text-amber-600 uppercase tracking-tight'>
                                                        OFICINA
                                                    </span>
                                                    <span className='text-xs font-bold text-amber-900 leading-tight font-sansation'>
                                                        {espacio.nombre}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        if (espacio.tipo === 'servicio') {
                                            return (
                                                <div
                                                    key={colIndex}
                                                    className='bg-zinc-100 border border-zinc-200 rounded-xl p-2.5 flex flex-col justify-between min-h-[72px]'
                                                >
                                                    <span className='text-[9px] font-bold text-zinc-500 uppercase tracking-tight'>
                                                        SERVICIO
                                                    </span>
                                                    <span className='text-xs font-bold text-zinc-800 leading-tight font-sansation'>
                                                        {espacio.nombre}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        // Espacios vacíos o estructurales
                                        return (
                                            <div
                                                key={colIndex}
                                                className='bg-zinc-50/50 border border-dashed border-zinc-200 rounded-xl min-h-[72px] flex items-center justify-center'
                                            >
                                                <span className='text-[10px] text-zinc-300 font-medium'>
                                                    —
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Leyenda de colores al pie */}
            <div className='mt-5 bg-white p-3.5 rounded-xl border border-zinc-200/70 shadow-xs'>
                <div className='grid grid-cols-3 gap-2 text-[11px] font-medium text-zinc-600'>
                    <div className='flex items-center gap-1.5'>
                        <span className='w-3 h-3 rounded-md bg-red-100 border border-red-300 flex-shrink-0' />
                        <span>Aulas</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <span className='w-3 h-3 rounded-md bg-amber-100 border border-amber-300 flex-shrink-0' />
                        <span>Oficinas</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <span className='w-3 h-3 rounded-md bg-zinc-200 border border-zinc-300 flex-shrink-0' />
                        <span>Servicios / Bar</span>
                    </div>
                </div>
            </div>

            <p className='text-center text-[11px] text-zinc-400 mt-5 leading-relaxed px-2'>
                Seleccione el horario correspondiente en la parte superior para consultar la asignación de aulas de cada turno.
            </p>

        </div>
    )
}