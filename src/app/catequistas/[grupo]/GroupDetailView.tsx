'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import * as XLSX from 'xlsx'

import { formatGroupName } from '@/utils/group-utils'
import { agregarCatequizando, actualizarCatequizando, eliminarCatequizando, agregarAlumnosLote } from '@/app/actions/actions'

import { ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react'
import CatequizandoRow from '../_components/CatequizandoRow'
import CatequizandoFormModal from '../_components/CatequizandoFormModal'
import ConfirmDeleteModal from '../_components/ConfirmDeleteModal'

interface Catequizando {
    id: string
    nombres: string
    apellidos: string
    grupo_id: string
    creado?: string
}

interface GroupDetailViewProps {
    grupo: any
    grupoParam: string
    listaAlumnos: any[]
}

export default function GroupDetailView({ grupo, grupoParam, listaAlumnos }: GroupDetailViewProps) {
    const grupoId = grupo.id
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [catequizandos, setCatequizandos] = useState(listaAlumnos)
    const [isSaving, setIsSaving] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [catequizandoToEdit, setCatequizandoToEdit] = useState<any | null>(null)
    const [catequizandoToDelete, setCatequizandoToDelete] = useState<Catequizando | null>(null)

    const ordenarCatequizandos = (lista: Catequizando[]): Catequizando[] => {
        return [...lista].sort((a, b) => {
            const compApellidos = a.apellidos.localeCompare(b.apellidos, 'es', {
                sensitivity: 'base',
            })
            if (compApellidos !== 0) return compApellidos
            return a.nombres.localeCompare(b.nombres, 'es', { sensitivity: 'base' })
        })
    }

    // Abrir modal para CREAR
    const handleOpenCreate = () => {
        setCatequizandoToEdit(null)
        setIsModalOpen(true)
    }

    // Abrir modal para EDITAR
    const handleOpenEditModal = (student: Catequizando) => {
        setCatequizandoToEdit(student)
        setIsModalOpen(true)
    }

    const handleOpenDeleteModal = (student: Catequizando) => {
        setCatequizandoToDelete(student)
    }

    const handleDeleteConfirm = async () => {
        if (!catequizandoToDelete) return

        const result = await eliminarCatequizando(catequizandoToDelete.id)

        if (!result.success) {
            alert('Error al eliminar el alumno: ' + (result.error || ''))
            return
        }

        // Actualización optimista: removemos al alumno de la lista local
        setCatequizandos((prev) => prev.filter((st) => st.id !== catequizandoToDelete.id))
        setCatequizandoToDelete(null)
    }

    // Función unificada para Guardar (Crear o Editar)
    const handleSaveCatequizando = async (data: { id?: string; nombres: string; apellidos: string; }) => {
        if (!data.nombres.trim() || !data.apellidos.trim()) return

        if (data.id) {
            // --- MODO EDICIÓN ---
            const result = await actualizarCatequizando({
                id: data.id,
                nombres: data.nombres,
                apellidos: data.apellidos,
            })

            if (!result.success || !result.data) {
                alert('Error al actualizar el alumno: ' + (result.error || ''))
            } else {
                // Actualizamos el estado local ordenando de nuevo por si cambiaron los apellidos
                setCatequizandos((prev) =>
                    ordenarCatequizandos(
                        prev.map((st) => (st.id === data.id ? { ...st, ...result.data } : st))
                    )
                )
            }
        } else {
            // --- MODO CREACIÓN ---
            const result = await agregarCatequizando({
                nombres: data.nombres,
                apellidos: data.apellidos,
                grupo_id: grupoId,
            })

            if (!result.success || !result.data) {
                alert('Error al guardar el alumno: ' + (result.error || ''))
            } else {
                const nuevoAlumno: Catequizando = {
                    ...(result.data as Catequizando),
                }
                setCatequizandos((prev) => ordenarCatequizandos([...prev, nuevoAlumno]))
            }
        }
    }

    // Carga masiva desde archivos Excel (.xlsx, .xls) o CSV
    const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsSaving(true)

        const reader = new FileReader()
        reader.onload = async (evt) => {
            try {
                const buffer = evt.target?.result
                const workbook = XLSX.read(buffer, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]

                const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet)

                const alumnosAInsertar = rawRows
                    .map((row) => {
                        const getVal = (...keys: string[]) => {
                            const foundKey = Object.keys(row).find((k) => keys.includes(k.trim().toLowerCase()))
                            return foundKey ? String(row[foundKey]).trim() : ''
                        }

                        const nombres = getVal('nombres', 'nombre')
                        const apellidos = getVal('apellidos', 'apellido')

                        return {
                            nombres,
                            apellidos,
                            grupo_id: grupo.id,
                        }
                    })
                    .filter((a) => a.nombres && a.apellidos)

                if (alumnosAInsertar.length === 0) {
                    alert(
                        "No se encontraron alumnos válidos. Asegúrate de incluir las columnas 'Nombres' y 'Apellidos'."
                    )
                    setIsSaving(false)
                    return
                }

                const res = await agregarAlumnosLote(alumnosAInsertar)

                if (res.success && res.data) {
                    const nuevosAlumnos: Catequizando[] = (res.data as Catequizando[]).map((st) => ({
                        ...st,
                        estadoAsistencia: 'pendiente',
                    }))
                    setCatequizandos((prev) => ordenarCatequizandos([...prev, ...nuevosAlumnos]))
                    alert(`¡Éxito! Se importaron ${res.data.length} alumnos desde el Excel.`)
                } else {
                    alert('Error al importar la lista: ' + (res.error || ''))
                }
            } catch (err: any) {
                alert('Error al leer el archivo Excel: ' + err.message)
            } finally {
                setIsSaving(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }

        reader.readAsArrayBuffer(file)
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-6 font-sansation'>
            <div className='relative flex items-center mb-4'>
                <Link
                    href='/catequistas'
                    className='z-10 -ml-1 rounded-full text-[#8B0000] hover:text-zinc-900 transition flex-shrink-0'
                >
                    <ChevronLeft className='w-6 h-6' />
                </Link>

                <h1 className='absolute left-1/2 -translate-x-1/2 text-zinc-800 text-xl font-semibold max-w-[80%] truncate text-center'>
                    {formatGroupName(grupo)}
                </h1>
            </div>
            <p className='text-zinc-600 text-sm'>Bienvenido a la gestión de su grupo.</p>


            {/* Sección combinada: Asistencia (20%) y Tomar Lista Swipe (80%) */}
            <div className='flex items-stretch gap-3 mt-4'>
                {/* Botón de Asistencia (20%) */}
                <Link
                    href={`/catequistas/${grupoParam}/asistencia`}
                    className='w-[20%] p-3 bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-center hover:border-[#8B0000] hover:shadow-md transition group'
                    title='Registro de Asistencia'
                >
                    <span className='text-xl mb-0.5'>📋</span>
                    <span className='font-bold text-zinc-800 text-[10px] font-sansation group-hover:text-[#8B0000]'>Asistencia</span>
                </Link>

                {/* Banner para tomar lista rápida - Swipe (80%) */}
                <Link
                    href={`/catequistas/${grupoParam}/asistencia/swipe`}
                    className='w-[80%] p-3 bg-red-50 border border-red-200 rounded-xl shadow-sm flex items-center justify-between gap-2 hover:border-[#8B0000] hover:shadow-md transition'
                >
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-[#8B0000] text-white rounded-lg flex-shrink-0'>
                            <ClipboardCheck className='w-6 h-6' />
                        </div>
                        <div>
                            <h2 className='text-zinc-800 text-sm font-bold leading-none'>Tomar Lista</h2>
                            <p className='mt-1 text-xs text-zinc-800 font-light leading-none'>Pulsa aqui y registra la asistencia rápidamente</p>
                        </div>
                    </div>
                    <ChevronRight className='w-6 h-6 flex-shrink-0 text-zinc-800' />
                </Link>
            </div>

            <div className='mt-7 mb-5 flex items-center justify-between'>
                <h2 className='text-zinc-700 font-bold font-sansation text-lg'>Listado ({catequizandos.length})</h2>

                <div className='flex items-center gap-2'>
                    <input
                        type='file'
                        accept='.xlsx, .xls, .csv'
                        ref={fileInputRef}
                        onChange={handleExcelUpload}
                        className='hidden'
                    />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSaving}
                        className='px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold font-sansation rounded-lg transition flex items-center gap-1 disabled:opacity-50'
                    >
                        <span>📊</span> Cargar Excel
                    </button>

                    <button
                        onClick={handleOpenCreate}
                        className='px-3 py-1.5 bg-red-50 hover:bg-zinc-200 text-zinc-800 text-xs font-bold font-sansation rounded-lg transition flex items-center gap-1'
                    >
                        <span>➕</span> Agregar
                    </button>
                </div>
            </div>

            {/* Lista de Alumnos */}
            <div className='flex flex-col gap-3 overflow-y-auto pr-1'>
                {catequizandos.length === 0 ? (
                    <p className='text-center text-zinc-400 py-8 text-sm font-sansation'>
                        No hay alumnos registrados en este grupo todavía.
                    </p>
                ) : (
                    catequizandos.map((student) => (
                        <CatequizandoRow
                            key={student.id} 
                            catequizando={student}
                            onEdit={handleOpenEditModal} 
                            onDelete={() => handleOpenDeleteModal(student)}
                        />
                    ))
                )}
            </div>

            {/* Modal reutilizable para Crear y Editar */}
            <CatequizandoFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                catequizandoToEdit={catequizandoToEdit}
                grupo={grupo}
                onSave={handleSaveCatequizando}
            />

            {/* Modal de confirmación de borrado */}
            <ConfirmDeleteModal
                isOpen={!!catequizandoToDelete}
                onClose={() => setCatequizandoToDelete(null)}
                onConfirm={handleDeleteConfirm}
                studentName={catequizandoToDelete ? `${catequizandoToDelete.apellidos} ${catequizandoToDelete.nombres}` : ''}
            />
        </div>
    )
}
