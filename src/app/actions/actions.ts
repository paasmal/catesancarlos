'use server'

import { createClient } from '@/lib/supabase/server'

interface AlumnoInput {
  nombres: string
  apellidos: string
  grupo_id: string
}

export interface AlumnoUpdateInput {
  id: string
  nombres: string
  apellidos: string
}

// Acción para agregar un solo alumno de forma manual
export async function agregarCatequizando(datos: AlumnoInput) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('alumnos')
    .insert([
      {
        nombres: datos.nombres.trim(),
        apellidos: datos.apellidos.trim(),
        grupo_id: datos.grupo_id,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error al insertar alumno:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function actualizarCatequizando(datos: AlumnoUpdateInput) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('alumnos')
    .update({
      nombres: datos.nombres.trim(),
      apellidos: datos.apellidos.trim(),
    })
    .eq('id', datos.id)
    .select()
    .single()

  if (error) {
    console.error('Error al actualizar alumno:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function eliminarCatequizando(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('alumnos')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error al eliminar alumno:', error.message)
        return { success: false, error: error.message }
    }

    return { success: true }
}

// Acción para agregar múltiples alumnos desde Excel / CSV
export async function agregarAlumnosLote(alumnos: AlumnoInput[]) {
  try {
    const supabase = await createClient();

    // Normalizamos todos los datos antes de insertarlos en lote
    const alumnosNormalizados = alumnos.map((alumno) => ({
      nombres: alumno.nombres.trim(),
      apellidos: alumno.apellidos.trim(),
      grupo_id: alumno.grupo_id,
    }));

    const { data, error } = await supabase
      .from("alumnos")
      .insert(alumnosNormalizados)
      .select();

    if (error) {
      console.error("Error al agregar lista de alumnos:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Error inesperado:", err);
    return { success: false, error: err.message || "Error desconocido" };
  }
}