export function loadLists() {
  return [
    { 
      id: 1,
      title: 'Tarefas de trafego',       
      creatable: true,
      column: 'TRAFEGO',
      date: '09 mar',
      projects: 5,
      tasks: [
        {
          id: 1,
          column: 'TRAFEGO',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
      ],
    },
    { 
      id: 2,
      title: 'Farefa Fazendo',       
      creatable: false,
      column: 'FAZENDO',
      date: '09 mar',
      projects: 5,
      tasks: [
        {
          id: 1,
          column: 'FAZENDO',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
        {
          id: 2,
          column: 'FAZENDO',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
        {
          id: 3,
          column: 'FAZENDO',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
      ],
    },
    { 
      id: 3,
      title: 'Tarefa Pausado',       
      creatable: false,
      column: 'PAUSE',
      date: '09 mar',
      projects: 5,
      tasks: [
        {
          id: 1,
          column: 'PAUSE',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
      ],
    },
    { 
      id: 4,
      title: 'Tarefa Concluído',       
      creatable: false,
      column: 'COMPLETE',
      date: '09 mar',
      projects: 5,
      tasks: [
        {
          id: 1,
          column: 'COMPLETE',
          title: "Titulo da Task",
          users: [],
          date: '09 mar',
          progress: {
            hoursinvested: '10:00:00',
            hoursLeft: '05:00:00'
          },
          completed: '5/10',
        },
      ],
    },
  ];
}