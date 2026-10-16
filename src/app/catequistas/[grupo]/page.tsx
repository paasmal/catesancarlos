import { redirect } from 'next/navigation'

import { verifyAccessAndGetGroup } from '@/lib/auth-helpers'
import { getAlumnosByGrupoId } from '@/lib/data-helpers'

import GroupDetailView from './GroupDetailView'

interface PageProps {
    params: Promise<{ grupo: string }> | { grupo: string }
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params
    const grupoParam = resolvedParams?.grupo ?? ''

    // Verificamos el acceso y obtenemos los datos del grupo
    const { isAuthorized, grupo } = await verifyAccessAndGetGroup(grupoParam)

    if (!isAuthorized || !grupo) {
        redirect('/catequistas')
    }

    const grupoId = (grupo as { id: string }).id

    // Obtenemos la lista de alumnos mediante el nuevo helper
    const listaAlumnos = await getAlumnosByGrupoId(grupoId)

    return (
        <GroupDetailView
            grupo={grupo}
            grupoParam={grupoParam} 
            listaAlumnos={listaAlumnos}
        />
    )
}