
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