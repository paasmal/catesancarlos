'use client'

import Link from 'next/link'
import PageName from '@/components/PageName'

interface PortalHeaderProps {
    onOpenSidebar: () => void
}

export default function PortalHeader({ onOpenSidebar }: PortalHeaderProps) {
    return (
        <header className='w-full z-50 border-b border-zinc-200 bg-white relative'>
            <div className='max-w-7xl mx-auto px-4 h-14 flex items-center justify-between'>
                {/* Menú hamburguesa */}
                <button
                    onClick={onOpenSidebar}
                    aria-label='Abrir menú'
                    className='p-2 -ml-2 text-zinc-800 hover:text-gray-900 transition-colors cursor-pointer'
                >
                    <svg
                        className='w-7 h-7'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </button>

                {/* Texto SCR en el centro absoluto */}
                <Link
                    href='/'
                    className='flex flex-col items-center text-center leading-tight group'
                >
                    <PageName />
                </Link>

                <svg
                    className='w-6 h-6 opacity-0'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                </svg>
            </div>
        </header>
    )
}
