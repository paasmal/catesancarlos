import PortalHeader from '@/app/(portal)/_components/PortalHeader'

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PortalHeader />
            <main>{children}</main>
        </>
    );
}
