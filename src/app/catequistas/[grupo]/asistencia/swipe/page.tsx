import { redirect } from 'next/navigation'

import { verifyAccessAndGetGroup } from '@/lib/auth-helpers'
import { getAlumnosByGrupoId } from '@/lib/data-helpers'
import AttendanceSwipeView from './AttendanceSwipeView'


interface PageProps {
    params: Promise<{
        grupo: string
    }>
}

export default async function AttendanceSwipePage({ params }: PageProps) {
    const resolvedParams = await params
    const grupoParam = resolvedParams?.grupo ?? ''

    // Verificamos el acceso y obtenemos los datos del grupo
    const { isAuthorized, grupo } = await verifyAccessAndGetGroup(grupoParam)

    if (!isAuthorized || !grupo) {
        redirect('/catequistas')
    }

    const grupoId = (grupo as { id: string }).id

    // Obtenemos la lista de alumnos
    const listaAlumnos = await getAlumnosByGrupoId(grupoId)

    return (
        <AttendanceSwipeView
            grupo={grupo}
            grupoParam={grupoParam}
            listaAlumnos={listaAlumnos || []}
        />
    )
}
