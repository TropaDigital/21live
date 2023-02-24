
export interface TaskModel {
  task_id: string;
  card_id: string;
  title: string;
  client: string;
  project: string;
  frame: string;
  type: string;
  order: string;
  final_data: string;
  description: string;
}

export interface ColumnModel {
  card_id: string;
  email_alert: string;
  flow_id: string;
  idCreator: string;
  name: string
  nameCreator: string;
  necessary_upload: string;
  next_step: string;
  previous_step: string;
  step: string;
  tasks: TaskModel[]
}

export interface MeetingProps {
  cliente: string;
  date: string;
  meeting_id: string;
  responsavel: string;
  title: string;
}

export interface TenantProps {
  bucket: string;
  name: string;
  slug: string;
  tenant_id: string;
}

export interface TeamProps {
  avatar: string;
  birthday: string;
  cost_per_hour: string;
  email: string;
  function: string;
  function_id: string;
  hiring_date: string;
  name: string;
  phone: string;
  tenant_id: string;
  user_id: string;
  username: string;
}