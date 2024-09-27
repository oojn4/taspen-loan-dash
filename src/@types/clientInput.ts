interface ClientInputRegistrationData {
    fullname: string
    email: string
    password: string
    repeat_password:string
    nickname: string
    sex: string
    phone: string
    birthplace: string
    birthdate: string
    country_id: string
    province_id: string
    city_id: string
    address: string
    university_id: string
    status:string
    graduation_month_year: Date | null
    graduation_month:  number | null
    graduation_year:  number | null
    cohort: string
    major_id: string

    office_category_id: string
    nip:string,

    bps_province_id: string
    bps_city_id: string
    bps_region_id: string
    other_office_name: string
    org_unit: string
    office_province_id: string
    office_city_id: string
    start_working_month_year:Date | null
    start_working_month: number | null
    start_working_year: number | null
    is_working: string
    stop_working_month_year:Date | null
    stop_working_month: number | null
    stop_working_year:  number | null

    is_activated:string
    alumni_id:string
  }
  
  