import type { Metadata } from 'next'
import PortalLayoutClient from './_components/PortalLayoutClient'

export const metadata: Metadata = {
    title: 'Cate San Carlos - Ricaurte',
    description: 'Pagina web de la Catequsis San Carlos de Ricaurte',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return <PortalLayoutClient>{children}</PortalLayoutClient>
}
