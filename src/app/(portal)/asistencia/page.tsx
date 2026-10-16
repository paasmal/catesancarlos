import { notFound } from 'next/navigation'
import { getAlumnosByGrupoId, getAsistenciasByGrupoId } from '@/lib/data-helpers'
// O si tienes una función para buscar el grupo por nombre/slug:
// import { getGrupoBySlug } from '@/lib/data-helpers'

import AsistenciaView from './AsistenciaView'

export default async function Page() {
    // Definimos el ID o slug fijo para Confirmación 2
    // (Asegúrate de usar el ID real de Confirmación 2 en tu base de datos o buscarlo)
    const grupoId = '9392c79a-a90c-4f6b-8213-eaf67ff98877' // O el UUID correspondiente en tu BD

    // Datos simulados/obtenidos del grupo fijo
    const grupo = {
        id: grupoId,
        nombre: 'Confirmación 2',
        horario: '08H00 a 10H00'
    }

    // Obtenemos la lista de alumnos y asistencias específicas para este grupo
    const listaAlumnos = await getAlumnosByGrupoId(grupoId)
    const listaAsistencias = await getAsistenciasByGrupoId(grupoId)

    if (!listaAlumnos) {
        notFound()
    }

    return (
        <AsistenciaView
            grupo={grupo}
            grupoParam='confirmacion-2'
            listaAlumnos={listaAlumnos || []}
            listaAsistencias={listaAsistencias}
        />
    )
}