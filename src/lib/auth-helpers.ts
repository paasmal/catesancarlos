'use server'

import { createClient } from '@/lib/supabase/server'
import { normalizeText } from '@/utils/text-utils'
import { redirect } from 'next/navigation'



interface GroupData {
    id: string
    nivel: string
    paralelo: number
    comunidad: string
}

interface GroupRelation {
    grupo_id: string
    grupos: GroupData[] | null
}


// Obtiene el usuario autenticado actual desde la sesión de Supabase
export async function getCurrentUser() {
    const supabase = await createClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error) {
        console.error('Error al obtener el usuario autenticado:', error.message)
    }

    return { user, error }
}

// Obtiene el usuario autenticado y su perfil completo desde la tabla de catequistas
export async function getCurrentCatequistaProfile() {
    // Llamada a la función getCurrentUser() para obtener el usuario
    const { user, error: authError } = await getCurrentUser()

    if (authError || !user) {
        return { user: null, catequista: null, error: authError }
    }

    // Consultamos directamente su perfil en la tabla 'catequistas'
    const supabase = await createClient()
    const { data: catequista, error: dbError } = await supabase
        .from('catequistas')
        .select('*')
        .eq('id', user.id)
        .single()

    if (dbError) {
        console.error('Error al obtener el perfil de catequista:', dbError.message)
    }

    return {
        user,
        catequista,
        error: dbError || authError,
    }
}

// Cierra la sesión activa del usuario y lo redirige al Home
export async function logoutAction() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}


export async function verifyAccessAndGetGroup(groupParam: string) {
    // Valida y limpia el parámetro de la URL de entrada
    const targetGroup = normalizeText(groupParam)

    if (!targetGroup) {
        return {
            isAuthorized: false,
            catequista: null,
            grupo: null,
        }
    }

    // Verifica la sesion del catequista
    const { user, error: authError } = await getCurrentUser()

    if (authError || !user) {
        return {
            isAuthorized: false,
            catequista: null,
            grupo: null,
        }
    }
    
    const supabase = await createClient()

    // Buscar los grupos asignados al catequista
    const { data: catequista, error: catequistaError } = await supabase
        .from('catequistas')
        .select(`
            id,
            nombres,
            email,
            catequistas_grupos (
                grupo_id,
                grupos (
                    id,
                    nivel,
                    paralelo,
                    comunidad
                )
            )
        `)
        .eq('id', user.id)
        .maybeSingle()

    if (catequistaError || !catequista) {
        return {
            isAuthorized: false,
            catequista: null,
            grupo: null,
        }
    }

    const relations = catequista.catequistas_grupos as GroupRelation[] | null

    let matchedGroup = null

    // Comprobar si el catequista tiene asignado este grupo y capturarlo
    const hasAccess = relations?.some((relation) => {
        const groupData = relation.grupos
        const group = Array.isArray(groupData) ? groupData[0] : groupData

        if (!group) return false

        const nivel = normalizeText(String(group.nivel ?? ''))
        const grupoId = String(group.id ?? '')

        const sufijo = group.comunidad === 'centro' 
            ? String(group.paralelo ?? '') 
            : String(group.comunidad ?? '')

        const groupSlug = `${nivel}-${normalizeText(sufijo)}`

        const matches = groupSlug === targetGroup || grupoId === targetGroup

        if (matches) {
            matchedGroup = group // Guardamos el grupo exacto que hizo match
        }

        return matches
    })

    return {
        isAuthorized: Boolean(hasAccess),
        catequista,
        grupo: matchedGroup, 
    }
}
