import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    // 1. Actualizamos la sesión con la función existente
    const response = await updateSession(request)

    // 2. Creamos un cliente rápido para verificar la sesión en el middleware
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

    // REGLA 1: Si NO hay sesión y quieren entrar a /catequistas o /admin -> redirigir al /login
    if (!session && (pathname.startsWith('/catequistas') || pathname.startsWith('/admin'))) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // REGLA 2: Si YA hay sesión y quieren entrar al /login -> redirigir al panel de catequistas
    if (session && pathname === '/login') {
        url.pathname = '/catequistas'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas, EXCEPTO archivos estáticos, imágenes y favicons
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
