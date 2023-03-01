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
}

export interface IProjectCreate {
  tenant_id: number|string //tenant_id
  title: string
  contract_type: string //fee | spot
  date_start: string
  date_end: string
  description?: string
  forProducts?: boolean
  forDescription?: boolean
  products?: Array<IProduct>
  files?: Array<IDocProject>
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