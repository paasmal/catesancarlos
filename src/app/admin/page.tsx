import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboardView from './AdminDashboardView'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    // 1. Validar autenticación del usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        redirect('/login')
    }

    // 2. Verificar que el usuario registrado en Supabase Auth sea realmente 'admin' en tu tabla 'catequistas'
    const { data: currentCatequista, error: roleError } = await supabase
        .from('catequistas')
        .select('role')
        .eq('id', user.id)
        .single()

    if (roleError || currentCatequista?.role !== 'admin') {
        // Si no es administrador (ej. es un catequista normal), lo sacamos de aquí
        redirect('/catequistas')
    }
    
    // 1. Consultamos los datos reales desde el servidor en paralelo
    const [{ data: grupos }, { data: catequistas }] = await Promise.all([
        supabase.from('grupos').select('*').order('created_at', { ascending: false }),
        
        // AQUÍ ESTÁ EL CAMBIO: Incluimos la relación con la tabla intermedia
        supabase
            .from('catequistas')
            .select(`
                *,
                catequistas_grupos (
                    grupo_id,
                    grupos (
                        nivel,
                        paralelo,
                        comunidad
                    )
                )
            `)
            .order('created_at', { ascending: false }),
    ])

    // 2. Renderizamos la vista de cliente pasándole los datos iniciales
    return (
        <AdminDashboardView
            initialGrupos={grupos || []}
            initialCatequistas={catequistas || []}
        />
    )
}