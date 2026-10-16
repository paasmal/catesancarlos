// Normaliza un texto removiendo acentos, espacios y convirtiéndolo a minúsculas
export function normalizeText(value: unknown): string {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

// Capitaliza la primera letra de un texto
export function capitalizeText(texto: string): string {
    if (!texto) return ''
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}