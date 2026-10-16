import { redirect } from 'next/navigation'

import { verifyAccessAndGetGroup } from '@/lib/auth-helpers'
import { getAlumnosByGrupoId, getAsistenciasByGrupoId } from '@/lib/data-helpers'

import AsistenciaView from './AsistenciaView'

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
    console.log(grupoParam)
    const grupoId = (grupo as { id: string }).id

    // Obtenemos la lista de alumnos mediante el nuevo helper
    const listaAlumnos = await getAlumnosByGrupoId(grupoId)
    const listaAsistencias = await getAsistenciasByGrupoId(grupoId)

    return (
        <AsistenciaView
            grupo={grupo}
            grupoParam={grupoParam} 
            listaAlumnos={listaAlumnos || []}
            listaAsistencias={listaAsistencias}
        />
    )
}