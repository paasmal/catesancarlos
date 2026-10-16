import { createClient } from '@/lib/supabase/server'
import { parseGroupSlug, formatGroupName, Group } from '@/utils/group-utils'

interface GroupData extends Group {
    id: string
    alumnos_count: number
}

interface CatequistaGroupRelation {
    grupo_id: string
    grupos: (GroupData & { alumnos?: { count: number }[] }) | null
}

export async function getCatequistaWithGroups(userId: string) {
    const supabase = await createClient()

    const {
        data: catequista,
        error
    } = await supabase
        .from('catequistas')
        .select(`
            *,
            catequistas_grupos (
                grupo_id,
                grupos (
                    id,
                    nivel,
                    paralelo,
                    comunidad,
                    alumnos (count)
                )
            )
        `)
        .eq('id', userId)
        .maybeSingle()

    if (error || !catequista) {
        return {
            catequista: null,
            assignedGroups: [],
            errorNoRegistrado: !!error,
        }
    }

    const relations = catequista.catequistas_grupos as CatequistaGroupRelation[]

    const assignedGroups = relations
        .map((relation) => {
            const grupo = relation.grupos
            if (!grupo) return null

            const alumnosCount = grupo.alumnos?.[0]?.count ?? 0

            // Retornamos explícitamente el objeto con las propiedades requeridas
            return {
                ...grupo,
                alumnos_count: alumnosCount,
            } as GroupData
        })
        .filter((group): group is GroupData => group !== null)

    return {
        catequista,
        assignedGroups,
        errorNoRegistrado: false,
    }
}


export async function getGroupBySlug(slug: string): Promise<GroupData | null> {
    const parsed = parseGroupSlug(slug)
    if (!parsed) return null

    const { nivel, comunidad, paralelo } = parsed
    const supabase = await createClient()

    const { data: grupo, error } = await supabase
        .from('grupos')
        .select(`
            id, 
            nivel, 
            paralelo, 
            comunidad,
            alumnos (count)
        `)
        .eq('nivel', nivel)
        .eq('paralelo', paralelo)
        .eq('comunidad', comunidad)
        .maybeSingle()

    if (error || !grupo) {
        if (error) console.error('Error al buscar el grupo:', error.message)
        return null
    }

    // Extraemos el conteo y construimos el objeto que cumple con GroupData
    const alumnosCount = grupo.alumnos?.[0]?.count ?? 0

    return {
        id: grupo.id,
        nivel: grupo.nivel,
        paralelo: grupo.paralelo,
        comunidad: grupo.comunidad,
        alumnos_count: alumnosCount,
    }
}

export async function getNameGroup(slug: string): Promise<string> {
    const grupo = await getGroupBySlug(slug)
    
    if (!grupo) return 'Grupo'

    return formatGroupName(grupo)
}

export async function getAlumnosByGrupoId(grupoId: string) {
    const supabase = await createClient()

    const { data: alumnos, error } = await supabase
        .from('alumnos')
        .select('*')
        .eq('grupo_id', grupoId)
        .order('apellidos', { ascending: true })

    if (error) {
        console.error('Error al cargar los alumnos:', error.message)
        return []
    }

    return alumnos ?? []
}

export async function getAsistenciasByGrupoId(grupoId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('asistencia')
        .select('*')
        .eq('grupo_id', grupoId)

    if (error) {
        console.error('Error al obtener asistencias:', error.message)
        return []
    }

    return data || []
}