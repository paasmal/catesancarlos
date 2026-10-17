'use client'

import { useState } from 'react'
import PortalHeader from '@/app/(portal)/_components/PortalHeader'
import PortalSidebar from '@/app/(portal)/_components/PortalSidebar'

export default function PortalLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <PortalHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
            <PortalSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main>{children}</main>
        </>
    )
}