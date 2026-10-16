'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-helpers'

export async function cambiarPasswordAction(formData: { currentPassword: string; newPassword: string }) {
    try {
        const supabase = await createClient()

        // 1. Obtenemos el usuario actual
        const { user, error } = await getCurrentUser() 

        if (error || !user || !user.email) {
            return { success: false, error: 'No autorizado o sesión expirada' }
        }

        // 2. Validar la contraseña antigua intentando iniciar sesión con ella
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: formData.currentPassword,
        })

        if (signInError) {
            return { success: false, error: 'La contraseña actual es incorrecta' }
        }

        // 3. Si la contraseña actual es correcta, actualizamos a la nueva contraseña
        const { error: updateError } = await supabase.auth.updateUser({
            password: formData.newPassword
        })

        if (updateError) {
            return { success: false, error: updateError.message }
        }

        return { success: true }
    } catch (error) {
        console.error('Error al cambiar contraseña:', error)
        return { success: false, error: 'Error en el servidor al actualizar la contraseña' }
    }
}

type SignInResult =
    | { success: true }
    | { success: false; error: string }

export async function signInAction(
    formData: FormData
): Promise<SignInResult> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { success: false, error: 'Correo o contraseña incorrectos' }
    }

    return { success: true }
}