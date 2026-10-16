import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import CatequistasHeader from './_components/CatequistasHeader'

import { getCurrentCatequistaProfile } from '@/lib/auth-helpers'

interface CatequistasLayoutProps {
    children: ReactNode
}

export default async function CatequistasLayout({ children }: CatequistasLayoutProps) {
    const { user, catequista, error } = await getCurrentCatequistaProfile()

    // Validamos sesión, errores, existencia del perfil y si está activo
    if (error || !user || !catequista || !catequista.activo) {
        redirect('/login')
    }

    return (
        <>
            <CatequistasHeader catequista={catequista} />
            <main>{children}</main>
        </>
    )
}