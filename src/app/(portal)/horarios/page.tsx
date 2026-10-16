'use client'

import Link from 'next/link'
import { ChevronLeft, Clock, Calendar } from 'lucide-react'

interface ScheduleSlot {
    hora: string
    niveles: string
}

interface CenterSchedules {
    id: string
    lugar: string
    dia: string
    horarios: ScheduleSlot[]
}

const SEDES_HORARIOS: CenterSchedules[] = [
    {
        id: 'centro-parroquial',
        lugar: 'CENTRO PARROQUIAL',
        dia: 'SÁBADO',
        horarios: [
            { hora: '08H00 a 10H00', niveles: 'Iniciación y Confirmación' },
            { hora: '10H30 a 12H30', niveles: 'Reconciliación y Año Bíblico' },
            { hora: '13H00 a 15H00', niveles: 'Comunión y Seguimiento' },
        ],
    },
    {
        id: 'barrio-los-angeles',
        lugar: 'LOS ÁNGELES',
        dia: 'SÁBADO',
        horarios: [
            { hora: '08H00 a 10H00', niveles: 'Iniciación, Reconciliación y Comunión' },
            { hora: '10H00 a 12H00', niveles: 'Año Bíblico, Seguimiento y Confirmación' },
        ],
    },
    {
        id: 'molinopamba',
        lugar: 'MOLINOPAMBA',
        dia: 'SÁBADO',
        horarios: [{ hora: '09H00 a 11H00', niveles: 'Todos los niveles' }],
    },
    {
        id: 'barrio-la-dolorosa',
        lugar: 'LA DOLOROSA',
        dia: 'SÁBADO',
        horarios: [{ hora: '14H00 a 16H30', niveles: 'Todos los niveles' }],
    },
    {
        id: 'maria-auxiliadora',
        lugar: 'MARÍA AUXILIADORA',
        dia: 'SÁBADO',
        horarios: [{ hora: '15H00 a 17H00', niveles: 'Todos los niveles' }],
    },
]

export default function HorariosPage() {
    return (
        <div className='max-w-md mx-auto bg-zinc-50 min-h-screen pb-12 font-sansation text-zinc-800 px-4 pt-4'>
            {/* Header de navegación */}
            <div className='relative flex items-center mb-6'>
                <Link
                    href='/'
                    className='z-10 -ml-1 rounded-full text-[#8B0000] hover:text-zinc-900 transition flex-shrink-0'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>

                <h1 className='absolute left-1/2 -translate-x-1/2 text-zinc-800 text-xl font-semibold max-w-[80%] truncate text-center'>
                    Horarios de Catequesis
                </h1>
            </div>

            {/* Lista de Sedes y Horarios */}
            <div className='flex flex-col gap-5'>
                {SEDES_HORARIOS.map((sede) => (
                    <div
                        key={sede.id}
                        className='bg-white rounded-2xl shadow-sm border border-zinc-200/80 overflow-hidden'
                    >
                        {/* Cabecera de la Sede */}
                        <div className='bg-[#8B0000] text-white px-3 py-2 flex items-center justify-between'>
                            <h2 className='text-xs font-bold tracking-wide font-sansation uppercase'>
                                {sede.lugar}
                            </h2>
                            <div className='flex items-center gap-1.5 bg-white/25 px-2.5 py-1 rounded-full text-[10px] font-bold text-red-100 uppercase tracking-wider'>
                                <Calendar className='w-3 h-3' />
                                {sede.dia}
                            </div>
                        </div>

                        {/* Filas de Horarios */}
                        <div className='divide-y divide-zinc-200 px-3 py-1'>
                            {sede.horarios.map((slot, index) => (
                                <div
                                    key={index}
                                    className='py-3 flex items-center justify-between gap-5'
                                >
                                    {/* Bloque Hora */}
                                    <div className='w-34 flex items-center gap-2 flex-shrink-0 bg-red-50/60 border border-red-100/80 px-2.5 py-1.5 rounded-xl'>
                                        <Clock className='w-3.5 h-3.5 text-[#8B0000]' />
                                        <span className='text-xs font-bold text-[#8B0000] tracking-tight'>
                                            {slot.hora}
                                        </span>
                                    </div>

                                    {/* Bloque Niveles */}
                                    <div className='flex items-center text-right justify-end flex-1'>
                                        <span className='text-xs font-semibold text-zinc-700 leading-tight'>
                                            {slot.niveles}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Nota o aviso al pie */}
            <p className='text-center text-xs text-zinc-500 mt-6 leading-relaxed px-4'>
                Si necesita más información acérquese a la coordinacion de su centro de catequesis.
            </p>
        </div>
    )
}