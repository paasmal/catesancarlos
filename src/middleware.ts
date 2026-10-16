import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    // 1. Primero actualizamos la sesión con la función de adentro
    const response = await updateSession(request)

    // 2. Creamos un cliente rápido para verificar la sesión actual en el middleware
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll() {},
            },
        }
    )

    const {
        data: { session },
    } = await supabase.auth.getSession()
    const url = request.nextUrl.clone()
    const pathname = url.pathname

    // REGLA A: Si NO está logueado e intenta entrar a /catequistas -> mandar al /login
    if (!session && pathname.startsWith('/catequistas')) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // REGLA B: Si YA está logueado e intenta entrar al /login -> mandar directo a /catequistas
    if (session && pathname === '/login') {
        url.pathname = '/catequistas'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas de solicitud, EXCEPTO:
         * - _next/static (archivos estáticos)
         * - _next/image (optimización de imágenes)
         * - favicon.ico (icono)
         * - archivos públicos (svg, png, jpg, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
