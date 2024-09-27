import { Container, Group } from '@mantine/core';
import { useState } from "react";
import { FormUser } from "../../components/FormUser/FormUser";
import RegisterInformation from '../../components/FormUser/RegisterInformation';
import ResetButton from '../../components/RegisterButton/ResetButton';
import SubmitButton from '../../components/RegisterButton/SubmitButton';
import defaultDataRegClient from "../../data/defaultDataRegClient";
import { UserService } from '../../lib/services/user.service';
import { showErrorFetching } from '../../utils/errorFetching';
import { showSuccessNotification } from '../../utils/notifications';

const RegisterPage = () => {
  const [dataRegistrasi, setDataRegistrasi] = useState<ClientInputRegistrationData>(defaultDataRegClient);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleSubmitRegistration = async (data:InputRegistrationData) => {
    try {
      const tmp = await UserService.register(data);
      if(tmp){
        showSuccessNotification('success-register', 'Berhasil mendaftar, silakan tunggu verifikasi data Anda', 5000)
      }
    } catch (error) {
      return showErrorFetching(error)
    }
  };

  const handleChange = (name: string, value: any) => {
    setDataRegistrasi({
      ...dataRegistrasi,
      [name]: value,
    });
  
    let error: string | null = null;
  
    switch (name) {
      case 'fullname':
      case 'nickname':
      case 'sex':
      case 'birthplace':
      case 'country_id':
      case 'address':
      case 'university_id':
      case 'major_id':
      case 'office_category_id':
      case 'org_unit':
      case 'is_working':
      case 'status':
        error = validateRequired(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'repeat_password':
        error = validateRepeatPassword(dataRegistrasi.password,value);
        break;
      case 'cohort':
        error = validateCohort(value);
        break;
      case 'graduation_month_year':
        error = validateDateVariable(new Date(dataRegistrasi.birthdate),new Date(value),'Tanggal Lahir');
        break;
      case 'start_working_month_year':
        error = validateDateVariable(dataRegistrasi.graduation_month_year,new Date(value),'Bulan Lulus dari AIS/STIS/Polstat STIS');
        break;
      case 'stop_working_month_year':
        error = validateStopWorking(dataRegistrasi.start_working_month_year,new Date(value),'Bulan Mulai Bekerja Pekerjaan Terakhir');
        break;
      case 'birthdate':
        error = validateDateVariable(null,new Date(value),'Tanggal Lahir');
        break;
      case 'nip':
        error = validateNIP(value);
        break;
      default:
    }
  
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error || '',
    }));
  };
  
  const handleCompletion = (completed: boolean) => {
    setIsCompleted(completed);
  };
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (!emailRegex.test(email)) ? "Format email tidak sesuai" : '';
  }

  const validateRequired = (value:any) => {
    return (!value) ? 'Isian tidak boleh kosong' : '';
  };

  const validatePassword = (password: string): string | null => {
    const MIN_LENGTH = 8;
    if (!password) {
      return 'Password tidak boleh kosong';
    }
    if (password.length < MIN_LENGTH) {
      return `Password harus minimal ${MIN_LENGTH} karakter`;
    }
    return '';
  };

  const validateCohort = (cohort: string): string | null => {
    const MAX_LENGTH = 3;
    if (!cohort) {
      return 'Isian tidak boleh kosong';
    }
    if (cohort.length !== MAX_LENGTH) {
      return `Angkatan harus berisi tiga digit`;
    }
    return '';
  };

  const validateNIP = (nip: string): string | null => {
    const MAX_LENGTH = 16;
    return (nip && nip.length !== MAX_LENGTH) ?  `NIP harus berisi 16 digit`: '';
  };

  const validateStopWorking = (date1: Date|null, date2: Date|null, name_date1: string): string | null=>{
    if(date1 && date2){
      if(date2 < date1){
        return `Input tanggal tidak masuk akal (lebih kecil dari ${name_date1})`;
      }
      if(date2 > new Date()){
        return `Input tanggal tidak masuk akal (lebih besar dari tanggal saat ini)`;
      }
    }
    return '';
  }

  const validateDateVariable = (date1:Date|null,date2:Date|null,name_date1:string):string|null=>{
    if (date1){
      if(!date2){
        return 'Isian tidak boleh kosong'
      }
      if(date2 < date1){
        return `Input tanggal tidak masuk akal (lebih kecil dari ${name_date1})`;
      }
      if(date2 > new Date()){
        return `Input tanggal tidak masuk akal (lebih besar dari tanggal saat ini)`;
      }
    }else{
      if(!date2){
        return 'Isian tidak boleh kosong'
      }
      if(date2 > new Date()){
        return `Input tanggal tidak masuk akal (lebih besar dari tanggal saat ini)`;
      }
    }
    return '';
  }

  const validateRepeatPassword = (password: string, repeat_password: string): string | null => {
    return (password !== repeat_password) ? 'Password tidak sama' : '';
  };
  
const handleSubmit = () => {
  const newErrors: { [key: string]: any|null } = {};

  newErrors.fullname = validateRequired(dataRegistrasi.fullname);
  newErrors.nickname = validateRequired(dataRegistrasi.nickname);
  newErrors.sex = validateRequired(dataRegistrasi.sex);
  newErrors.birthplace = validateRequired(dataRegistrasi.birthplace);
  newErrors.country_id = validateRequired(dataRegistrasi.country_id);
  newErrors.address = validateRequired(dataRegistrasi.address);
  newErrors.university_id = validateRequired(dataRegistrasi.university_id);
  newErrors.graduation_month = validateRequired(dataRegistrasi.graduation_month_year ? dataRegistrasi.graduation_month_year.getMonth() + 1 : null);
  newErrors.graduation_year = validateRequired(dataRegistrasi.graduation_month_year ? dataRegistrasi.graduation_month_year.getFullYear() + 1 : null);
  newErrors.major_id = validateRequired(dataRegistrasi.major_id);
  newErrors.office_category_id = validateRequired(dataRegistrasi.office_category_id);
  newErrors.org_unit = validateRequired(dataRegistrasi.org_unit);
  newErrors.start_working_month = validateRequired(dataRegistrasi.start_working_month_year ? dataRegistrasi.start_working_month_year.getMonth() + 1 : null);
  newErrors.start_working_year = validateRequired(dataRegistrasi.start_working_month_year ? dataRegistrasi.start_working_month_year.getFullYear() + 1 : null);
  newErrors.is_working = validateRequired(dataRegistrasi.is_working);
  newErrors.status = validateRequired(dataRegistrasi.status);
  newErrors.email = validateEmail(dataRegistrasi.email);
  newErrors.password = validatePassword(dataRegistrasi.password);
  newErrors.repeat_password = validateRepeatPassword(dataRegistrasi.password, dataRegistrasi.repeat_password);
  newErrors.cohort = validateCohort(dataRegistrasi.cohort);
  newErrors.nip = validateNIP(dataRegistrasi.nip);
  
  newErrors.birthdate = validateDateVariable(null, new Date(dataRegistrasi.birthdate), 'Tanggal Lahir');
  newErrors.graduation_month_year = validateDateVariable(dataRegistrasi.birthdate ? new Date(dataRegistrasi.birthdate) : new Date(), dataRegistrasi.graduation_month_year, 'Tanggal Lahir');
  newErrors.start_working_month_year = validateDateVariable(dataRegistrasi.graduation_month_year, dataRegistrasi.start_working_month_year, 'Bulan Lulus dari AIS/STIS/Polstat STIS');
  newErrors.stop_working_month_year = validateStopWorking(dataRegistrasi.start_working_month_year, dataRegistrasi.stop_working_month_year, 'Bulan Mulai Bekerja Pekerjaan Terakhir');

  setErrors(newErrors);

  // If there are errors, prevent submission
  if (Object.values(newErrors).some(error => error)) {
    return
  }
  
  const dataSubmit = {
    fullname: dataRegistrasi.fullname,
    email: dataRegistrasi.email,
    password: dataRegistrasi.password,
    nickname: dataRegistrasi.nickname,
    sex: parseInt(dataRegistrasi.sex),
    phone: dataRegistrasi.phone,
    birthplace: dataRegistrasi.birthplace,
    birthdate: dataRegistrasi.birthdate,
    country_id: dataRegistrasi.country_id,
    province_id: dataRegistrasi.province_id,
    city_id: dataRegistrasi.city_id,
    address: dataRegistrasi.address,
    university_id: dataRegistrasi.university_id,
    graduation_month: dataRegistrasi.graduation_month_year ? dataRegistrasi.graduation_month_year.getMonth() + 1 : 0,
    graduation_year: dataRegistrasi.graduation_month_year ? dataRegistrasi.graduation_month_year.getFullYear() : 0,
    cohort: parseInt(dataRegistrasi.cohort),
    major_id: dataRegistrasi.major_id,
    office_category_id: dataRegistrasi.office_category_id,
    bps_region_id: dataRegistrasi.bps_city_id ? dataRegistrasi.bps_city_id : dataRegistrasi.bps_province_id? dataRegistrasi.bps_province_id:'8f43971c-41b5-11ef-b8c8-acde48001122',
    other_office_name: dataRegistrasi.other_office_name,
    office_province_id: dataRegistrasi.office_province_id,
    office_city_id: dataRegistrasi.office_city_id,
    org_unit: dataRegistrasi.org_unit,
    nip: dataRegistrasi.nip,
    is_activated: parseInt(dataRegistrasi.is_activated),
    alumni_id: dataRegistrasi.alumni_id,
    start_working_month: dataRegistrasi.start_working_month_year ? dataRegistrasi.start_working_month_year.getMonth() + 1 : null,
    start_working_year: dataRegistrasi.start_working_month_year ? dataRegistrasi.start_working_month_year.getFullYear() : null,
    is_working: parseInt(dataRegistrasi.is_working),
    stop_working_month: dataRegistrasi.stop_working_month_year ? dataRegistrasi.stop_working_month_year.getMonth() + 1 : null,
    stop_working_year: dataRegistrasi.stop_working_month_year ? dataRegistrasi.stop_working_month_year.getFullYear() : null,
  };

  handleSubmitRegistration(dataSubmit);
};
  const handleReset = () => {
    setDataRegistrasi(defaultDataRegClient)
    setActiveStep(0)
  };

  return (
    <>
      <Container size={1200} my={30}>
        <RegisterInformation />
      </Container>
      <FormUser
        dataRegistrasi={dataRegistrasi}
        handleChange={handleChange}
        active={activeStep}
        setActive={setActiveStep}
        onComplete={handleCompletion}
        errors={errors}
        setErrors={setErrors}
        type='register'
      />
      <Container size={1200} my="lg">
        <Group justify="flex-end" my="lg">
          <ResetButton onClick={handleReset}/>
          {isCompleted && <SubmitButton onClick={handleSubmit} />}
        </Group>
      </Container>
    </>
  )
}

export default RegisterPage