interface CatequizandoRowOnlyViewProps {
    catequizando: {
        id: string
        nombres: string
        apellidos: string
    }
    estadoSemanal?: 'presente' | 'ausente' | 'justificado' | 'pendiente'
}

export default function CatequizandoRowOnlyView({
    catequizando,
    estadoSemanal = 'pendiente',
}: CatequizandoRowOnlyViewProps) {
    return (
        <div className='bg-zinc-100 p-3 rounded-2xl flex items-center justify-between gap-4 border border-zinc-100 shadow-sm'>
            {/* Avatar y Nombre */}
            <div className='flex items-center gap-2.5 truncate'>
                <div className='w-10 h-10 rounded-full bg-red-100 text-[#8B0000] font-bold flex items-center justify-center text-sm font-sansation flex-shrink-0'>
                    {`${catequizando.apellidos[0] || ''}${catequizando.nombres[0] || ''}`.toUpperCase()}
                </div>
                <div className='flex flex-col truncate'>
                    <span className='font-sansation font-medium text-zinc-800 text-sm truncate'>
                        {catequizando.apellidos} {catequizando.nombres}
                    </span>
                </div>
            </div>

            {/* Badge de Estatus de Asistencia de la Semana */}
            <div className='flex items-center flex-shrink-0'>
                {estadoSemanal === 'presente' && (
                    <span className='px-3 py-1 rounded-xl text-xs font-bold font-sansation bg-emerald-100 text-emerald-700 border border-emerald-200'>
                        ✔️
                    </span>
                )}

                {estadoSemanal === 'ausente' && (
                    <span className='px-3 py-1 rounded-xl text-xs font-bold font-sansation bg-red-100 text-red-700 border border-red-200'>
                        ❌
                    </span>
                )}

                {estadoSemanal === 'justificado' && (
                    <span className='px-3 py-1 rounded-xl text-xs font-bold font-sansation bg-amber-100 text-amber-700 border border-amber-200'>
                        Jus
                    </span>
                )}

                {estadoSemanal === 'pendiente' && (
                    <span className='px-3 py-1 rounded-xl text-xs font-bold font-sansation bg-zinc-200 text-zinc-500 border border-zinc-300'>
                        ⏳
                    </span>
                )}
            </div>
        </div>
    )
}