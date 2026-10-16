export interface GrupoParamInfo {
    nivel: string
    comunidad: string
    paralelo: number | null
    titulo: string
}

export function parseGrupoParam(grupoParam: string): GrupoParamInfo {
    const decoded = decodeURIComponent(grupoParam)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Limpia tildes
        .trim()

    const parts = decoded.split('-')

    // El primer elemento SIEMPRE es el nivel
    const nivel = parts.shift() || ''

    let paralelo: number | null = null
    let comunidad = 'centro'

    if (parts.length > 0) {
        const ultimoElemento = parts[parts.length - 1]
        if (/^\d+$/.test(ultimoElemento)) {
            paralelo = parseInt(parts.pop()!, 10)
        }

        if (parts.length > 0) {
            comunidad = parts.join(' ')
        }
    }

    // Si no es 'centro' y no traía paralelo explícito, se asigna 1 por defecto
    if (comunidad !== 'centro' && paralelo === null) {
        paralelo = 1
    }

    const nivelFormateado = nivel.replace(/\b\w/g, (l) => l.toUpperCase())
    const comunidadFormateada = comunidad.replace(/\b\w/g, (l) => l.toUpperCase())

    let titulo = `${nivelFormateado} ${comunidad == 'centro' ? paralelo : ''} • ${comunidadFormateada}`

    return { nivel, comunidad, paralelo, titulo }
}
