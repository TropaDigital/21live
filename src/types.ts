export interface IProduct{
  project_id?: number
  service: string
  description: string
  type: string
  size: string
  minutes: number |string
  quantity: number
  period: string
}

export interface IDocProject{
  project_id?: number
  file_name: string
  size: number
  url: string
  key: string
  bucket: string

  file?: File;
  file_id?: string;
  readableSize?: string;
  preview?: string;
  progress?: number;
  uploaded?: boolean;
  error?: boolean;
}

export interface IProjectCreate {
  tenant_id: number|string //tenant_id
  project_id: string;
  title: string
  contract_type: string //fee | spot
  date_start: string
  date_end: string
  client_name?: string
  description?: string
  products?: Array<IProduct>
  files?: Array<IDocProject> | any
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