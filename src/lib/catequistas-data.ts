export interface CatequistaGrupo {
    id: string
    horario: string
    nivel: string
    responsable: string
    colaboradores: string[]
}

export const LISTA_CATEQUISTAS_GRUPOS: CatequistaGrupo[] = [
    // --- 1. INICIACIÓN ---
    {
        id: '1',
        horario: '08H00 a 10H00',
        nivel: 'Iniciación 1',
        responsable: 'Lucía Muñoz',
        colaboradores: ['Gloria Becerra', 'Agustín Criollo'],
    },
    {
        id: '2',
        horario: '08H00 a 10H00',
        nivel: 'Iniciación 2',
        responsable: 'Nelly Guzñay',
        colaboradores: ['Sofía Orellana', 'Paula Cáceres'],
    },
    {
        id: '3',
        horario: '08H00 a 10H00',
        nivel: 'Iniciación 3',
        responsable: 'Mercedes Zhañay',
        colaboradores: ['José Peralta', 'Matías Pinduisaca'],
    },

    // --- 2. RECONCILIACIÓN ---
    {
        id: '4',
        horario: '10H30 a 12H30',
        nivel: 'Reconciliación 1',
        responsable: 'Angelica Calle',
        colaboradores: ['Camila Pulgarin', 'Nadia Patiño'],
    },
    {
        id: '5',
        horario: '10H30 a 12H30',
        nivel: 'Reconciliación 2',
        responsable: 'Lourdes Guevara',
        colaboradores: ['Paulina Elizalde', 'Maria A. Perez'],
    },
    {
        id: '6',
        horario: '10H30 a 12H30',
        nivel: 'Reconciliación 3',
        responsable: 'Fernanda Mejia',
        colaboradores: ['Pamela Pucha'],
    },
    {
        id: '7',
        horario: '10H30 a 12H30',
        nivel: 'Reconciliación 4',
        responsable: 'Nathali Chimbolema',
        colaboradores: ['Luisa Barbecho'],
    },
    {
        id: '8',
        horario: '10H30 a 12H30',
        nivel: 'Reconciliación 5',
        responsable: 'María Piña',
        colaboradores: ['Laura Bermeo'],
    },

    // --- 3. COMUNIÓN ---
    {
        id: '9',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 1',
        responsable: 'Veronica Maila',
        colaboradores: ['Freddy Siguenza'],
    },
    {
        id: '10',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 2',
        responsable: 'Jaime Patiño',
        colaboradores: ['Victor Espinoza', 'Ana M. Valdez'],
    },
    {
        id: '11',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 3',
        responsable: 'Maria A. Perez',
        colaboradores: ['Kelly Rojas', 'María Calle'],
    },
    {
        id: '12',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 4',
        responsable: 'Maria Cardenas',
        colaboradores: ['Jhon Mijahuanca'],
    },
    {
        id: '13',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 5',
        responsable: 'Olga Mora',
        colaboradores: ['Mateo Guachichulca'],
    },
    {
        id: '14',
        horario: '13H00 a 15H00',
        nivel: 'Comunión 6',
        responsable: 'Daniel Lliguicota',
        colaboradores: ['Jordy Chimbolema'],
    },

    // --- 4. AÑO BÍBLICO ---
    {
        id: '15',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 1',
        responsable: 'Juan Carlos Gomez',
        colaboradores: ['Xavier Maila'],
    },
    {
        id: '16',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 2',
        responsable: 'Nelly Saldaña',
        colaboradores: ['Fernando Minango'],
    },
    {
        id: '17',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 3',
        responsable: 'Zoila Quituisaca',
        colaboradores: ['José Zarate'],
    },
    {
        id: '18',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 4',
        responsable: 'Jose Sanmartín',
        colaboradores: ['Erika Guzhñay'],
    },
    {
        id: '19',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 5',
        responsable: 'Teresa Quinde',
        colaboradores: ['Hurtado Marina Isabel'],
    },
    {
        id: '20',
        horario: '10H30 a 12H30',
        nivel: 'Año Bíblico 6',
        responsable: 'Guillermo Zhizhpon',
        colaboradores: ['Wilmer Morocho'],
    },

    // --- 5. SEGUIMIENTO ---
    {
        id: '21',
        horario: '13H00 a 15H00',
        nivel: 'Seguimiento 1',
        responsable: 'Jhon Bautista',
        colaboradores: ['Marjori Ortiz'],
    },
    {
        id: '22',
        horario: '13H00 a 15H00',
        nivel: 'Seguimiento 2',
        responsable: 'Libertad Arévalo',
        colaboradores: ['Rosa Ortiz'],
    },
    {
        id: '23',
        horario: '13H00 a 15H00',
        nivel: 'Seguimiento 3',
        responsable: 'Romulo Ñauta',
        colaboradores: ['María Vasquez'],
    },
    {
        id: '24',
        horario: '13H00 a 15H00',
        nivel: 'Seguimiento 4',
        responsable: 'Segundo Flores',
        colaboradores: ['Paulino Barbecho'],
    },
    {
        id: '25',
        horario: '13H00 a 15H00',
        nivel: 'Seguimiento 5',
        responsable: 'Carmen Tenesaca',
        colaboradores: ['Pedro Asmal Arias'],
    },

    // --- 6. CONFIRMACIÓN ---
    {
        id: '26',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 1',
        responsable: 'Javier Rodriguez',
        colaboradores: ['Valeria Siavichay', 'Felipe Bojorque'],
    },
    {
        id: '27',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 2',
        responsable: 'Pedro Asmal Arias',
        colaboradores: ['Samantha Marin'],
    },
    {
        id: '28',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 3',
        responsable: 'Jacinto Vega',
        colaboradores: ['Justin Lugmaña'],
    },
    {
        id: '29',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 4',
        responsable: 'Luis Maila',
        colaboradores: ['Skarlet Nieves'],
    },
    {
        id: '30',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 5',
        responsable: 'Adriana Jiménez',
        colaboradores: ['Milagros Valdez'],
    },
    {
        id: '31',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 6',
        responsable: 'Norma Zhañay',
        colaboradores: ['Nube Macancela'],
    },
    {
        id: '32',
        horario: '08H00 a 10H00',
        nivel: 'Confirmación 7',
        responsable: 'Mario Peñafiel',
        colaboradores: ['Teresa Carchi', 'Cristina Fajardo'],
    },
]