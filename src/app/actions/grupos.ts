'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createGrupoAction(formData: {
    comunidad: string
    nivel: string
    paralelo: number
    horario?: string
    piso?: string
    aula?: string
}) {
    // 1. Inicializar el cliente de Supabase para el servidor
    const supabase = await createClient()

    // 2. Insertar el grupo en la base de datos
    const { error: dbError } = await supabase.from('grupos').insert([
        {
            comunidad: formData.comunidad,
            nivel: formData.nivel,
            paralelo: formData.paralelo,
            horario: formData.horario || null,
            piso: formData.piso || null,
            aula: formData.aula || null,
        },
    ])

    if (dbError) {
        // Manejar el error de restricción única (comunidad, nivel, paralelo)
        if (dbError.code === '23505') {
            throw new Error('Ya existe un grupo registrado con esta misma comunidad, nivel y paralelo.')
        }
        throw new Error('Error al guardar el grupo en la base de datos: ' + dbError.message)
    }

    // 3. Revalidar la ruta para refrescar los datos en pantalla
    revalidatePath('/dashboard/grupos') // Ajusta la ruta según tu estructura de páginas
}