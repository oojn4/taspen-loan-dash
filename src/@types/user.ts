export type User = {
  id: string | null
  fullname: string | null
  email: string | null
  nickname: string | null
  sex: number
  phone: string
  birthplace: string
  birthdate: string
  country: Country
  province: any
  city: any
  address: string
  university: string | null
  graduation_month: number
  graduation_year: number
  cohort: number
  major_id: string | null
  office_category_id: string | null,
  bps_region_id: string,
  other_office_name: string | null,
  org_unit: string | null,
  office_province_id: string | null,
  office_city_id: string | null,
  start_working_month: number,
  start_working_year: number,
  is_working: number,
  stop_working_month: string | null,
  stop_working_year: string | null,
  created_at: string,
  updated_at: string,
  roles: string
  links: LinksObject[]
  sub?: string | null
  access_token: string | null
  refresh_token?: string | null
  is_approved?: number | null
}

export type Country = {
  id: string
  country_code: string
  name: string
}

export type LinksObject = {
  rel: string
  uri: string
}