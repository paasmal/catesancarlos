'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signInAction } from '@/app/actions/user-actions'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const result = await signInAction(formData)
            
            if (!result.success) {
                setError(result.error)
                return
            }

            router.replace('/catequistas')
            router.refresh()
        } catch (err) {
            setError('Ocurrió un error al iniciar sesión.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full px-6 flex flex-1 flex-col justify-center mx-auto h-screen font-sansation sm:max-w-md'>
            <form 
                onSubmit={handleSubmit}
                className='bg-white w-full p-8 rounded-3xl border border-zinc-200 shadow-sm'
            >
                <fieldset disabled={loading} className='flex flex-col gap-3 border-0 m-0 p-0 min-w-0'>
                    <div className='flex flex-col items-center gap-1 mb-0'>
                        <div className='w-10 h-10 bg-red-100 rounded-full text-[#8B0000] text-xl font-bold flex items-center justify-center'>
                            ✝
                        </div>
                        <h1 className='text-zinc-800 text-xl font-bold'>Iniciar Sesión</h1>
                        <p className='text-zinc-500 text-xs'>Portal de Catequistas</p>
                    </div>

                    <div className='h-9'>
                        {error && (
                            <div className='px-3 py-2 bg-red-50 border border-red-200 text-[#8B0000] text-xs text-center rounded-xl'>
                                {error}
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-zinc-700 text-xs font-medium' htmlFor='email'>
                            Correo electrónico
                        </label>
                        <input
                            className='bg-zinc-50 px-4 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-[#8B0000]'
                            id='email'
                            name='email'
                            type='email'
                            placeholder='tu@correo.com'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-zinc-700 text-xs font-medium' htmlFor='password'>
                            Contraseña
                        </label>
                        <div className='relative flex items-center'>
                            <input
                                className='w-full bg-zinc-50 pl-4 pr-10 py-2 rounded-xl text-sm border border-zinc-200 focus:outline-none focus:border-[#8B0000]'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder='••••••••'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 text-zinc-400 hover:text-zinc-600 focus:outline-none cursor-pointer'
                            >
                                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='mt-2 bg-[#8B0000] hover:bg-[#700000] py-3 rounded-xl text-white text-sm font-bold transition shadow-sm cursor-pointer disabled:opacity-50'
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}