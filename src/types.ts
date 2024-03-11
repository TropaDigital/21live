// Types for Product
export interface IProduct {
  job_service_id?: number;
  category?: string;
  service: string;
  description: string;
  flag: string;
  type: string;
  size: string;
  minutes: string;
  minutes_creation: any;
  minutes_essay: any;
  quantity: number;
  period: string;
}

export interface IProductBackend {
  created: string;
  deleted: string;
  description: string;
  flag: string;
  category: string;
  minutes: string;
  minutes_creation: any;
  minutes_essay: any;
  period: string;
  project_product_id: string;
  project_id: string;
  quantity: string;
  quantity_initial: string;
  service: string;
  job_service_id: string;
  size: string;
  type: string;
  updated: string;
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
  status?: string | any;
  status_fake?: string | any;
  products?: Array<IProduct> | any;
  files?: Array<IDocProject> | any;
  team?: string | any;
}

export interface IServices {
  tenant_id: number;
  description: string;
  minutes: string;
  service: string;
  job_service_id: string;
  size: string;
  type: string;
}

// Types for Tasks
export interface ITaskCreate {
  task_id?: number | any;
  title: string;
  user_id: string;
  tenant_id: number | string | any;
  ticket_id?: string | any;
  organization_id?: number | string | any;
  project_product_id: number | string | any; // produto principal, o produto pode ter uma flag que significa que ele lista outros produtos na criação da task
  type?: string | any; //type_id da tabela task_type
  flow_id?: number | any;
  description: string | any; //descricao geral
  name?: string | any;
  files?: string | any;
  creation_description?: string | any; //entrega de criação
  creation_date_end?: string | any;
  copywriting_description?: string | any;
  copywriting_date_end?: string | any; //entrega da redação
  deadlines?: Array<IDelivery> | any; //se for dividir a entrega, entra agqui
  step?: number | any;
  project_id?: string;
  start_job: string;
  end_job?: string;
  requester_id?: string;
  gen_ticket: string;
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
  products_delivery_id?: number;
  task_id: number;
  project_product_id: number;
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

export interface IServicesCreate {
  tenant_id?: number;
  service: string;
  description: string;
  type: string;
  size: string;
  category: string;
  flag?: string;
  minutes_creation: any;
  minutes_essay: any;
  minutes: any;
}

export interface ICommentTask {
  comment_id?: number;
  user_id: number;
  task_id: number;
  comment: string;
}

export interface ServicesProps {
  job_service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  minutes_creation: any;
  minutes_essay: any;
  created: string;
  updated: string;
  category?: string;
  flag: string;
  quantity?: any;
  tenant_id?: string;
}

// Type for Task Comment (for send to backend)
export interface ICommentTask {
  comment_id?: number; //não precisa passar
  user_id: number; // id de quem está comentando
  task_id: number; // id da tarefa
  comment: string; // se tiver respondendo algum comentário, o id desse comentário
}

export interface OrganizationsProps {
  organization_id: string;
  tenant_id: string;
  country_id: string;
  city_id: string;
  name: string;
  address: string;
  email: string;
  cnpj: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  fb_page_token: string;
  instagram: string;
  website: string;
  social_footer: string;
  workhours: string;
  hourlimit_text: string;
  logo: string;
  logo_b: string;
  logo_w: string;
}

export interface RescueClock {
  clock_id: 1;
  created: string;
  delivery_id: string;
  pause: string;
  play: string;
  products_delivery_id: string;
  task_id: string;
  time_lapse: string;
  updated: string;
  user_id: string;
}

export interface UploadedFilesProps {
  file?: File;
  file_id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
  bucket: string;
  key: string;
  size: number;
  file_name: string;
  original_name: string;
  isNew: boolean;
  loading: boolean;
  folder: string;
}

export interface DeliveryProps {
  deliveryId: number | string;
  deliveryDescription: string;
  creation_date_end: string;
  copywriting_date_end: string;
  deliveryTitle?: string;
  deliveryProducts: any[];
  showInfo: boolean;
}

export interface StepTimeline {
  step: string;
  name: string;
  card_id: string;
  flow_id: string;
  necessary_upload: string;
  necessary_responsible: string;
  email_alert: string;
  tenant_approve: string;
  manager_approve: string;
  previous_step: string;
  function_id: string;
  final_card: string;
  ticket_status: string;
  ticket_status_id: string;
  tenant_id: string;
  deduct_hours?: string;
  show_hours?: string;
}

export interface TaskFile {
  bucket: string;
  created: string;
  file_name: string;
  original_name: string;
  key: string;
  last_archive: string;
  products_delivery_id: string;
  size: string;
  status: string;
  task_file_id: string;
  task_id: string;
  ticket_interaction_id: string;
  updated: string;
  url: string;
}

export interface TaskHistoric {
  flow_name: string;
  steps: TaskHistoryProps[];
}

export interface TaskHistoryProps {
  step: string;
  name: string;
  time_line: TaskHistoryTimeline[];
}

interface TaskHistoryTimeline {
  action: string;
  user_id: string;
  step: number;
  name: string;
  avatar: string;
  created: string;
}

export interface ClockUpdateProps {
  step: string;
  name: string;
  clock: ClockProps[];
}

export interface ClockProps {
  active: string;
  clock_id: string;
  first_pause: string;
  first_play: string;
  first_time_lapse: string;
  function: string;
  name_user: string;
  observation: string;
  pause: string;
  play: string;
  time_lapse: string;
}
