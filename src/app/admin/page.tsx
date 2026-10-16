import { createClient } from '@/lib/supabase/server'
import AdminDashboardView from './AdminDashboardView'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

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