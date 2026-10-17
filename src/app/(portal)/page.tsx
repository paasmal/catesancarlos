'use client'

import Link from 'next/link'
import { Calendar, Bell, Users, BookOpen, ChevronRight, Clock, MapPin, DoorOpen } from 'lucide-react'
import MainBanner from './_components/MainBanner'

export default function PublicPortalHome() {
    return (
        <div className='max-w-md mx-auto bg-white min-h-screen pb-12 font-sansation text-zinc-800'>
            {/* 1. Hero Section con Imagen y Degradado */}
            <MainBanner />

            {/* 2. Botones de Acceso Rápido (Grid de 2x2) */}
            <div className='px-4 -mt-6 relative z-20 grid grid-cols-2 gap-3'>
                {/* Botón 1 */}
                <Link
                    href='/horarios'
                    className='bg-white p-4 rounded-2xl shadow-md border border-zinc-100 flex items-center gap-3 hover:bg-zinc-50 transition'
                >
                    <div className='w-10 h-10 rounded-xl bg-red-50 text-[#8B0000] flex items-center justify-center flex-shrink-0'>
                        <Calendar className='w-5 h-5' />
                    </div>
                    <span className='text-xs font-bold text-zinc-800 leading-tight'>Horarios de catequesis</span>
                </Link>

                {/* Botón 2 */}
                <Link
                    href='/grupos'
                    className='bg-white p-4 rounded-2xl shadow-md border border-zinc-100 flex items-center gap-3 hover:bg-zinc-50 transition'
                >
                    <div className='w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0'>
                        <Users className='w-5 h-5' />
                    </div>
                    <span className='text-xs font-bold text-zinc-800 leading-tight'>Catequistas y grupos</span>
                </Link>

                {/* Botón 3 */}
                <Link
                    href='/aulas'
                    className='bg-white p-4 rounded-2xl shadow-md border border-zinc-100 flex items-center gap-3 hover:bg-zinc-50 transition'
                >
                    <div className='w-10 h-10 rounded-xl bg-amber-50/60 text-amber-800 flex items-center justify-center flex-shrink-0'>
                        <MapPin className='w-5 h-5' />
                    </div>
                    <span className='text-xs font-bold text-zinc-800 leading-tight'>Distribucion de aulas</span>
                </Link>

                {/* Botón 4 */}
                {/* <Link
                    href='/asistencia'
                    className='bg-white p-4 rounded-2xl shadow-md border border-zinc-100 flex items-center gap-3 hover:bg-zinc-50 transition'
                >
                    <div className='w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0'>
                        <BookOpen className='w-5 h-5' />
                    </div>
                    <span className='text-xs font-bold text-zinc-800 leading-tight'>Asistencia Confirmación 2</span>
                </Link> */}
            </div>

            <div className='mt-20 text-center'>Proximamente...</div>

            {/* 3. Últimos Avisos y Próximos Eventos */}
            {/* <div className='mt-8 px-4'>
                <h2 className='text-base font-bold text-zinc-900 mb-3 font-sansation'>
                    Últimos Avisos y Próximos Eventos
                </h2>

                <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-none'>
                    
                    <div className='min-w-[260px] bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm flex flex-col justify-between'>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B0000] text-white'>
                                    PRÓXIMA SESIÓN
                                </span>
                                <span className='text-[10px] text-zinc-400 flex items-center gap-1'>
                                    <Clock className='w-3 h-3' /> 8d ago
                                </span>
                            </div>
                            <div className='flex items-center gap-3 mt-2'>
                                <div className='bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-xl text-center flex-shrink-0'>
                                    <span className='block text-[9px] uppercase font-bold text-zinc-500'>SÁBADO</span>
                                    <span className='block text-base font-bold text-zinc-800 leading-none'>17</span>
                                    <span className='block text-[9px] uppercase font-bold text-zinc-500'>OCT</span>
                                </div>
                                <p className='text-xs font-bold text-zinc-800 leading-snug'>
                                    Tema: La alegría del Evangelio
                                </p>
                            </div>
                        </div>
                    </div>

                    
                    <div className='min-w-[260px] bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm flex flex-col justify-between'>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white'>
                                    AVISO IMPORTANTE
                                </span>
                                <span className='text-[10px] text-zinc-400 flex items-center gap-1'>
                                    <Clock className='w-3 h-3' /> 19d ago
                                </span>
                            </div>
                            <h3 className='text-xs font-bold text-zinc-800 mt-2 mb-1'>Registro de Asistencia</h3>
                            <p className='text-[11px] text-zinc-500 line-clamp-2'>
                                Recuerden traer su biblia y cuaderno para las dinámicas grupales.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* 4. Explore los Niveles */}
            {/* <div className='mt-8 px-4'>
                <div className='flex justify-between items-center mb-3'>
                    <h2 className='text-base font-bold text-zinc-900 font-sansation'>Explore los Niveles</h2>
                    <ChevronRight className='w-5 h-5 text-zinc-400' />
                </div>

                <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-none'>
                    
                    <div className='min-w-[200px] bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm'>
                        <h3 className='text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1'>COMUNIÓN</h3>
                        <p className='text-[11px] text-zinc-500 line-clamp-2'>Comunión de la nivelación de de...</p>
                    </div>

                    
                    <div className='min-w-[200px] bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm'>
                        <h3 className='text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1'>CONFIRMACIÓN</h3>
                        <p className='text-[11px] text-zinc-500 line-clamp-2'>Directorio la Confirmación ...</p>
                    </div>

                    
                    <div className='min-w-[200px] bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm'>
                        <h3 className='text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1'>POST-COMUNIÓN</h3>
                        <p className='text-[11px] text-zinc-500 line-clamp-2'>
                            Evaluza la post-comunión de los jóvenes...
                        </p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
