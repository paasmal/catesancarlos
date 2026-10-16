export default function MainBanner() {
    return (
        <div className='relative w-full h-72 bg-white overflow-hidden pl-4 pr-6'>
            {/* Imagen de fondo */}
            <div
                className='absolute inset-0 bg-cover bg-center '
                style={{ backgroundImage: `url('/portada11.jpg')` }}
            />
            {/* Degradado para legibilidad del texto */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#8B0000]/60 via-[#8B0000]/30 to-transparent' />

            {/* Contenido del Hero */}
            <div className='relative mt-38 z-10 text-white'>
                <h1 className='text-[34px] font-bold font-sansation leading-[0.9]'>
                    Bienvenidos al portal <br/> de la Catequesis San Carlos
                </h1>
            </div>
        </div>
    )
}
