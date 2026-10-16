import { redirect } from 'next/navigation'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth-helpers'
import { getCatequistaWithGroups } from '@/lib/data-helpers'
import { normalizeText } from '@/utils/text-utils'
import { formatGroupName, Group } from '@/utils/group-utils'

interface GroupData extends Group {
    id: string
    alumnos_count?: number
}

export default async function CatequistaDashboardPage() {
    const { user, error } = await getCurrentUser()

    if (error) {
        return (
            <div className='p-6 font-sansation max-w-2xl mx-auto'>
                <div className='p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm'>
                    Ocurrió un error al verificar tu sesión. Por favor, intenta recargar la página.
                </div>
            </div>
        )
    }

    if (!user) {
        redirect('/login')
    }

    const { catequista, assignedGroups, errorNoRegistrado } = await getCatequistaWithGroups(user.id)

    if (errorNoRegistrado || !catequista) {
        return (
            <div className="p-6 font-sansation max-w-2xl mx-auto">
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
                    No se encontró un perfil de catequista asociado a tu
                    cuenta. Comunícate con el administrador.
                </div>
            </div>
        )
    }

    return (
        <div className='p-4 font-sansation max-w-2xl mx-auto'>
            <h1 className='text-zinc-800 text-xl font-bold'>Bienvenido, {catequista?.nombres || user.email}</h1>
            <p className='text-zinc-800 text-sm font-light mt-1'>Este es tu panel de catequista.</p>

            <div className='mt-8'>
                <h2 className='text-[#8B0000] text-lg font-semibold leading-none mb-4'>Mis Grupos:</h2>

                {assignedGroups.length === 0 ? (
                    <div className='p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm'>
                        No tienes ningún grupo asignado actualmente. Comunícate con el administrador.
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {assignedGroups.map((grupo: GroupData) => {
                            const sufijoRuta = grupo.comunidad === 'centro' 
                                ? grupo.paralelo 
                                : normalizeText(grupo.comunidad)

                            const rutaGrupo = `/catequistas/${normalizeText(grupo.nivel)}-${sufijoRuta}`
                            const totalCatequizandos = grupo.alumnos_count || 0
                            
                            return (
                                <Link
                                    key={grupo.id}
                                    href={rutaGrupo}
                                    className='p-4 bg-zinc-0 border border-zinc-200 rounded-xl shadow-sm flex items-center justify-between hover:border-[#8B0000] hover:shadow-md transition cursor-pointer block'
                                >
                                    <div>
                                        <h3 className='font-bold text-zinc-800 text-base'>
                                            {formatGroupName(grupo)}
                                        </h3>
                                        {/* Aquí reemplazas o añades el dato del número de alumnos */}
                                        <p className='text-xs text-zinc-500 mt-0.5'>
                                            {totalCatequizandos} {totalCatequizandos === 1 ? 'catequizando' : 'catequizandos'}
                                        </p>
                                    </div>
                                    <span className='px-3 py-1 bg-red-50 text-[#8B0000] text-xs font-bold rounded-full'>
                                        Ver Grupo &rarr;
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
