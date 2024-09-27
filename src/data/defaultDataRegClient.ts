const defaultDate = new Date();
const formattedDate = `${defaultDate.getFullYear()}-${String(defaultDate.getMonth() + 1).padStart(2, '0')}`; // Format as YYYY-MM

const defaultDataRegClient: ClientInputRegistrationData = {
  fullname: "",
  email: "",
  password: "",
  repeat_password: "",
  nickname: "",
  sex: "",
  phone: "",
  birthplace: "",
  birthdate: "",
  country_id: "",
  province_id: "",
  city_id: "",
  address: "",
  university_id: "",
  status:"",
  graduation_month_year: null,
  graduation_month: null,
  graduation_year: null,
  cohort: "",
  major_id: "",

  office_category_id: "",
  nip:"",
  bps_region_id: "",
  bps_city_id: "",
  bps_province_id: "",
  other_office_name: "", 
  office_province_id: "", 
  office_city_id: "", 
  org_unit: "", 

  start_working_month_year: null, // Set default date here
  start_working_month: null, // Current month (1-based)
  start_working_year: null, // Current year
  is_working: "",
  stop_working_month_year: null,
  stop_working_month: null,
  stop_working_year: null,

  is_activated:"",
  alumni_id:""
};

export default defaultDataRegClient;
