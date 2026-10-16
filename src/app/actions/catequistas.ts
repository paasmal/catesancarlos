'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Catequista } from '@/types'

export async function createCatequistaAction(
    formData: Omit<Catequista, 'id' | 'created_at'> & { coord_nivel?: string }
) {
    // 1. Validación de negocio: Si es coordinador, exigimos que tenga un nivel asignado
    if (formData.role === 'coordinador' && !formData.coord_nivel) {
        throw new Error('El nivel es obligatorio para los coordinadores.')
    }

    const supabase = await createClient()

    // 2. Crear el usuario en Supabase Auth para obtener su ID único
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: 'catequista123',
        options: {
            data: {
                full_name: `${formData.nombres} ${formData.apellidos}`,
                phone: formData.telefono || null,
            },
        },
    })

    if (authError) {
        throw new Error('Error en Autenticación: ' + authError.message)
    }

    const userId = authData.user?.id

    if (!userId) {
        throw new Error('No se pudo obtener el ID del usuario creado.')
    }

    // 3. Insertar el perfil en la tabla catequistas incluyendo el campo coord_nivel
    const { error: dbError } = await supabase.from('catequistas').insert([
        {
            id: userId, // Vinculamos el UUID exacto de Auth
            nombres: formData.nombres,
            apellidos: formData.apellidos,
            email: formData.email,
            telefono: formData.telefono,
            cedula: formData.cedula,
            role: formData.role,
            coord_nivel: formData.coord_nivel || null,
            activo: formData.activo,
        },
    ])

    if (dbError) {
        // Nota: Si la inserción falla, puedes evaluar limpiar el usuario creado en Auth si lo requieres
        throw new Error('Error al guardar el perfil en la base de datos: ' + dbError.message)
    }
}

export async function asignarCatequistaAGrupoAction(catequistaId: string, grupoId: string) {
    const supabase = await createClient()

    try {
        // Asumiendo que tu tabla intermedia se llama 'catequistas_grupos'
        // y tiene columnas como 'catequista_id' y 'grupo_id'
        const { error } = await supabase
            .from('catequistas_grupos')
            .insert({
                catequista_id: catequistaId,
                grupo_id: grupoId
            })

        if (error) {
            console.error('Error de Supabase:', error.message)
            return { success: false, error: error.message }
        }

        // Refresca la caché de la página actual para que se vea el cambio reflejado de inmediato
        revalidatePath('/admin') // Reemplaza con tu ruta real

        return { success: true }
    } catch (error: any) {
        console.error('Error inesperado:', error)
        return { success: false, error: error.message }
    }
}
