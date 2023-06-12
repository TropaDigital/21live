// Types for Product
export interface IProduct {
  service_id?: number;
  service: string;
  description: string;
  flag: string;
  type: string;
  size: string;
  minutes: string;
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
  project_id?: string | any;
  title: string;
  contract_type: string; //fee | spot
  category: string;
  date_start: string;
  date_end: string;
  client_name?: string | any;
  description?: string | any;
  time?: string | any;
  time_consumed?: string | any;
  products?: Array<IProduct> | any;
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
  task_id?: number | any;
  title: string;
  tenant_id: number | string | any;
  product_id: number | string | any; // produto principal, o produto pode ter uma flag que significa que ele lista outros produtos na criação da task
  type?: string | any; //type_id da tabela task_type
  flow_id?: number | any;
  description: string | any; //descricao geral
  name?: string;
  creation_description?: string | any; //entrega de criação
  creation_date_end?: string | any;
  copywriting_description?: string | any;
  copywriting_date_end?: string | any; //entrega da redação
  archives?: Array<IDocTask> | any;
  deadlines?: Array<IDelivery> | any; //se for dividir a entrega, entra agqui
  step?: number | any;
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
  products_delivey_id?: number;
  task_id: number;
  product_id: number;
  service: string;
  description: string;
  reason_change: string; //CRIAÇÃO, DESMEMBRAMENTO, ALTERAÇÃO: INTERNA, EXTERNA - Alterar pelo ID.
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
  category?: string;
  flag: string;
  quantity?: any;
  tenant_id?: string;
}
