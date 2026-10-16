import { normalizeText } from '@/utils/text-utils'

const NOMBRES_NIVELES = {
    iniciacion: 'Iniciación',
    reconciliacion: 'Reconciliación',
    comunion: 'Comunión',
    biblico: 'Año Bíblico',
    seguimiento: 'Seguimiento',
    confirmacion: 'Confirmación',
} as const

const NOMBRES_COMUNIDADES = {
    centro: 'Centro',
    angeles: 'Los Ángeles',
    molinopamba: 'Molinopamba',
    dolorosa: 'La Dolorosa',
    auxiliadora: 'María Auxiliadora',
} as const

const NIVELES = Object.keys(NOMBRES_NIVELES)
const COMUNIDADES = Object.keys(NOMBRES_COMUNIDADES)

type Nivel = keyof typeof NOMBRES_NIVELES
type Comunidad = keyof typeof NOMBRES_COMUNIDADES

export interface Group {
    nivel: Nivel
    comunidad: Comunidad
    paralelo: number
}

export function formatGroupName(group: Group): string {
    const nombreNivel = NOMBRES_NIVELES[group.nivel]

    if (group.comunidad === 'centro') {
        return `${nombreNivel} ${group.paralelo}`
    }

    const nombreComunidad = NOMBRES_COMUNIDADES[group.comunidad]

    return `${nombreNivel} - ${nombreComunidad}`
}


export function parseGroupSlug(slug: string): Group | null {
    if (!slug) return null
    
    const firstDashIndex = slug.indexOf('-')
    if (firstDashIndex === -1) return null

    const nivel = normalizeText(slug.substring(0, firstDashIndex))
    const sufijo = normalizeText(slug.substring(firstDashIndex + 1))

    if (!NIVELES.includes(nivel as typeof NIVELES[number])) return null
    if (!sufijo) return null

    let paralelo = 1
    let comunidad = 'centro'

    if (/^[1-9]$/.test(sufijo)) {
        paralelo = Number(sufijo)
    } else if (COMUNIDADES.includes(sufijo as typeof COMUNIDADES[number])) {
        comunidad = sufijo
    } else {
        return null
    }

    return {
        nivel: nivel as Nivel,
        comunidad: comunidad as Comunidad,
        paralelo,
    }
}