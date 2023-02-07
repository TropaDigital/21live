export const columnDefault = {
  card_id: 1,
  flow_id: 1,
  user_id: '15852',
  name: 'NOVA COLUNA',
  email_alert: false,
  necessary_upload: false,
  step: 1,
  next_step: 2,
  previous_step: 0,
  tasks: []
}

const update = {
  id: 1,
  title: 'UPDATE BOARD',
  creatable: true,
  column: 'NEWTRAFEGO',
  date: '09 mar',
  projects: 5,
  tasks: [
    {
      id: 1,
      column: 'NEWTRAFEGO',
      title: 'Titulo da Task',
      users: [],
      date: '09 mar',
      progress: {
        hoursinvested: '10:00:00',
        hoursLeft: '05:00:00',
      },
      completed: '5/10',
    },
  ],
};

export const avatarAll = [
  {
    name: 'João Silva',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    isOnline: false,
    id: 1,
  },
  {
    name: 'Maria Clara',
    url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    isOnline: false,
    id: 2,
  },
  {
    name: 'Pedro Batista',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    isOnline: true,
    id: 3,
  },
  {
    name: 'Elisa Santos',
    url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    isOnline: true,
    id: 4,
  }
]

export const dataFake = [
  {
    id: 1,
    name: 'Post Web',
    step: '8',
    project: '5',
  },
  {
    id: 2,
    name: 'Campanha',
    step: '4',
    project: '3',
  },
  {
    id: 3,
    name: 'Ação Sazanal',
    step: '1',
    project: '2',
  },
  {
    id: 4,
    name: 'Post Web',
    step: '8',
    project: '5',
  },
]