// Types for Product
export interface IProduct {
  project_id?: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: number | string;
  quantity: number;
  period: string;
}

export interface IDocProject {
  project_id?: number;
  file_name: string;
  size: number;
  url: string;
  key: string;
  bucket: string;

  file?: File;
  file_id?: string;
  readableSize?: string;
  preview?: string;
  progress?: number;
  uploaded?: boolean;
  error?: boolean;
}

export interface IProjectCreate {
  tenant_id: number | string; //tenant_id
  project_id: string;
  title: string;
  contract_type: string; //fee | spot
  date_start: string;
  date_end: string;
  client_name?: string;
  description?: string;
  time?: string;
  products?: Array<IProduct>;
  files?: Array<IDocProject> | any;
}

export interface IServices {
  tenant_id: number;
  description: string;
  minutes: string;
  service: string;
  service_id: string;
  size: string;
  type: string;
}

// Types for Tasks
export interface ITaskCreate {
  task_id?: number;
  title: string;
  tenant_id: number | string;
  product_id: number | string; // produto principal, o produto pode ter uma flag que significa que ele lista outros produtos na criação da task
  type?: string; //type_id da tabela task_type
  flow_id?: number;
  description: string; //descricao geral
  creation_description?: string; //entrega de criação
  creation_date_end?: string;
  copywriting_description?: string;
  copywriting_date_end?: string; //entrega da redação
  products_task?: Array<IProductTask>; //esse só abre se o produto tiver a flag, irá abrir uma lista de produtos, que entrará nesta array(caso a entrega for única)
  archives?: Array<IDocTask>;
  deadlines?: Array<IDelivery>; //se for dividir a entrega, entra agqui
  step?: number;
}

export interface IDelivery {
  task_id?: number;
  date_end: Date;
  description?: string;
  products?: Array<IProductTask>;
}

export interface IDocTask {
  file_id?: number;
  task_id?: number;
  file_name: string;
  size: number;
  url: string;
  key: string;
  bucket: string;
}

export interface IProductTask {
  product_task_id?: number;
  task_id: number;
  product_id: number;
  service: string;
  description: string;
  reason_change: string; //CRIAÇÃO, DESMEMBRAMENTO, ALTERAÇÃO: INTERNA, EXTERNA.
  type: string; //impresso ou digital
  size: string;
  flag?: string;
  minutes: number | string;
  quantity: number;
  period: string; // monthly yearly
}

export interface ICommentTask {
  comment_id?: number;
  user_id: number;
  task_id: number;
  comment: string;
}

export interface ServicesProps {
  service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  created: string;
  updated: string;
  category: string;
  flag: string;
  quantity?: any;
}
