export interface Catequista {
    id?: string
    nombres: string
    apellidos: string
    email: string
    telefono?: string
    cedula?: string
    role: 'catequista' | 'coordinador' | 'admin'
    coord_nivel?: string
    activo: boolean
    created_at?: string
}