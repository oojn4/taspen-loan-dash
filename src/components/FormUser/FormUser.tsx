import {
  Button,
  Container,
  Grid,
  GridCol,
  Group,
  Paper,
  PasswordInput,
  Select,
  Stepper,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { DateInput, MonthPickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { MasterService } from "../../lib/services/master.service";
import { showErrorFetching } from '../../utils/errorFetching';
import { showErrorNotification } from '../../utils/notifications';
import classes from './FormUser.module.css';

type Props = {
  dataRegistrasi: ClientInputRegistrationData;
  handleChange:Function;
  onComplete: (completed: boolean) => void;
  errors:{ [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  active:any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  type:string;
}

export function FormUser({ dataRegistrasi, handleChange, active,setActive, onComplete,errors,setErrors,type}: Props) {
  const [countries, setCountries] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [officeCategories, setOfficeCategories] = useState<any[]>([]);
  const birthdateObject = dataRegistrasi.birthdate ? new Date(dataRegistrasi.birthdate) : null;
  const [filteredDomisiliCities, setFilteredDomisiliCities] = useState<any[]>([]);
  const [filteredOfficeCities, setFilteredOfficeCities] = useState<any[]>([]);
  const [filteredBPSCities, setFilteredBPSCities] = useState<any[]>([]);

  const prevStep = () => {
    setActive((current:any) => (current > 0 ? current - 1 : current))
    setErrors({});
  };

  // const validateStepRegistrasi = (step: number): boolean => {
  //   let valid = true;
  //   switch (step) {
  //     case 0:
  //       valid = !!dataRegistrasi.fullname && 
  //               !!dataRegistrasi.nickname && 
  //               !!dataRegistrasi.email && 
  //               !!dataRegistrasi.password &&
  //               !!dataRegistrasi.repeat_password && 
  //               !!dataRegistrasi.sex && 
  //               !!dataRegistrasi.phone && 
  //               !!dataRegistrasi.birthdate && 
  //               !!dataRegistrasi.birthplace && 
  //               !!dataRegistrasi.address && 
  //               !!dataRegistrasi.status;
  //       break;
  //     case 1:
  //       valid = !!dataRegistrasi.university_id && 
  //               !!dataRegistrasi.graduation_month_year && 
  //               !!dataRegistrasi.cohort && 
  //               !!dataRegistrasi.major_id;
  //       break;
  //     case 2:
  //       valid = !!dataRegistrasi.office_category_id && 
  //               !!dataRegistrasi.org_unit && 
  //               !!dataRegistrasi.start_working_month_year && 
  //               !!dataRegistrasi.is_working;
  //       if (dataRegistrasi.status === 'PNS') {
  //                 valid = valid && !!dataRegistrasi.nip;
  //               }  
  //       break;
  //     case 3:
  //       valid = !!dataRegistrasi.is_activated 
  //       break;
  //     default:
  //       break;
  //   }
  //   return valid;
  // };

  const validateStep = (step: number): boolean => {
    let valid = true;
    switch (step) {
      case 0:
        valid = !!dataRegistrasi.fullname && 
                !!dataRegistrasi.nickname && 
                !!dataRegistrasi.email && 
                !!dataRegistrasi.sex && 
                !!dataRegistrasi.phone && 
                !!dataRegistrasi.birthdate && 
                !!dataRegistrasi.birthplace && 
                !!dataRegistrasi.address && 
                !!dataRegistrasi.status;
        if (dataRegistrasi.country_id === '8d0bdfb8-41b5-11ef-b8c8-acde48001122') {
          valid = valid && !!dataRegistrasi.province_id && !!dataRegistrasi.city_id;
        }
        if (type === 'register'){
          valid = valid && !!dataRegistrasi.password && !! dataRegistrasi.repeat_password
        }
        break;
      case 1:
        valid = !!dataRegistrasi.university_id && 
                !!dataRegistrasi.graduation_month_year && 
                !!dataRegistrasi.cohort && 
                !!dataRegistrasi.major_id;
        break;
      case 2:
        valid = !!dataRegistrasi.office_category_id && 
                !!dataRegistrasi.org_unit && 
                !!dataRegistrasi.start_working_month_year && 
                !!dataRegistrasi.is_working;
        if (dataRegistrasi.status === 'PNS') {
          valid = valid && !!dataRegistrasi.nip;
        } 
        if ((dataRegistrasi.status === 'PNS') && (dataRegistrasi.office_category_id === '8dc87344-41b5-11ef-b8c8-acde48001122')) {
          valid = valid && !!dataRegistrasi.nip && !!dataRegistrasi.bps_province_id;
        } 
        if ((dataRegistrasi.status === 'PNS') && (dataRegistrasi.office_category_id === '8dc87358-41b5-11ef-b8c8-acde48001122')) {
          valid = valid && !!dataRegistrasi.nip && !!dataRegistrasi.bps_province_id && !!dataRegistrasi.bps_city_id;
        }
        if ((dataRegistrasi.status === 'PNS') && (dataRegistrasi.office_category_id === '8dc87376-41b5-11ef-b8c8-acde48001122')) {
          valid = valid && !!dataRegistrasi.nip && !!dataRegistrasi.other_office_name && !!dataRegistrasi.office_province_id && !!dataRegistrasi.office_city_id;
        }
        if ((dataRegistrasi.status === 'Non-PNS') && (dataRegistrasi.office_category_id === '958901bc-0de4-46d6-a77d-0ccc2a3b3b69')) {
          valid = valid && !!dataRegistrasi.other_office_name && !!dataRegistrasi.office_province_id && !!dataRegistrasi.office_city_id;
        }
        if (dataRegistrasi.is_working === '2') {
          valid = valid && !!dataRegistrasi.stop_working_month_year;
        }
        break;
      case 3:
        valid = !!dataRegistrasi.is_activated 
        if (dataRegistrasi.is_activated === '1') {
          valid = valid && !!dataRegistrasi.alumni_id;
        }
        break;
      default:
        break;
    }
    return valid;
  };

  const handleNextStep = () => {
    if (validateStep(active) && validateForm()) {
      setActive((prev:any) => (prev < 4 ? prev + 1 : prev));
    } else {
      showErrorNotification('validation-error', 'Terdapat kesalahan dalam pengisian formulir. Silakan periksa dan coba lagi.', 5000);
    }
  };

  const handleFetchCountries = async () => {
    try {
      let arrayCountries: any[] = [];
      const response = await MasterService.fetchCountries();
      response.data.map((dt: any) => {
        arrayCountries.push({ ...dt, value: dt.id,label: dt.country_code + '-' + dt.name});
      });
      setCountries(arrayCountries);
    } catch (error) {
      return showErrorFetching(error);
    }
  };
  
  const handleFetchProvinces = async () => {
    try {
      let arrayProvinces: any[] = [];
      const repsonse = await MasterService.fetchProvinces();
      repsonse.data.map((dt: any) => {
        arrayProvinces.push({ ...dt, value: dt.id, label: dt.province_code + '-' + dt.name});
      });
      setProvinces(arrayProvinces);
    } catch (error) {
      return showErrorFetching(error);
    }
  };
  
  const handleFetchCities = async () => {
    try {
      let arrayCites: any[] = [];
      const response = await MasterService.fetchCities(dataRegistrasi.province_id);
      response.data.map((dt: any) => {
        arrayCites.push({ ...dt, value: dt.id, label: dt.province_code + dt.city_code + '-' + dt.name });
      });
      setCities(arrayCites);
    } catch (error) {
      return showErrorFetching(error);
    }
  };

  const handleFetchUniversities = async () => {
    try {
      let arrayUniversities: any[] = [];
      const response = await MasterService.fetchUniversities();
      response.data.map((dt: any) => {
        arrayUniversities.push({ ...dt, value: dt.id, label: dt.abbr + '-' + dt.name });
      });
      setUniversities(arrayUniversities);
    } catch (error) {
      return showErrorFetching(error);
    }
  };

  const handleFetchMajors = async () => {
    try {
      let arrayMajors: any[] = [];
      const response = await MasterService.fetchMajors();
      response.data.map((dt: any) => {
        arrayMajors.push({ ...dt, value: dt.id, label: dt.name });
      });
      setMajors(arrayMajors);
    } catch (error) {
      return showErrorFetching(error);
    }
  };
  const handleFetchOfficeCategories = async () => {
    try {
      let arrayOfficeCategories: any[] = [];
      const response = await MasterService.fetchOfficeCategories();
      response.data.map((dt: any) => {
        arrayOfficeCategories.push({ ...dt, value: dt.id, label: dt.name });
      });
      setOfficeCategories(arrayOfficeCategories);
    } catch (error) {
      return showErrorFetching(error);
    }
  };
  
  useEffect(() => { 
    handleFetchCountries()
    handleFetchProvinces()
    handleFetchCities()
    handleFetchUniversities()
    handleFetchMajors()
    handleFetchOfficeCategories()
   }, []);

   useEffect(() => {
    const selectedDomisiliProvinceCode = provinces.filter(province => province.id === dataRegistrasi.province_id)
    if (dataRegistrasi.province_id) {
      const filtered = cities.filter(city => city.province_code === selectedDomisiliProvinceCode[0].province_code);
      setFilteredDomisiliCities(filtered);
    } else {
      setFilteredDomisiliCities([]);
    }
  }, [dataRegistrasi.province_id, cities]);

  useEffect(() => {
    // const selectedOfficeProvinceCode = provinces.filter(province => province.id === dataRegistrasi.office_province_id)
    if (dataRegistrasi.office_province_id) {
      // blm dilakuin sesuatu
    } else {
      setFilteredOfficeCities([]);
    }
  }, [dataRegistrasi.office_province_id, cities]);

  useEffect(() => {
    const selectedBPSProvinceCode = provinces.filter(province => province.id === dataRegistrasi.bps_province_id)
    if (dataRegistrasi.bps_province_id) {
      const filtered = cities.filter(city => city.province_code === selectedBPSProvinceCode[0].province_code);
      setFilteredBPSCities(filtered);
    } else {
      setFilteredBPSCities([]);
    }
  }, [dataRegistrasi.bps_province_id, cities]);
  
  const validateForm = (): boolean => {
    // Cek apakah ada message error di parent component errors
    for (const key in errors) {
      if (errors[key]) { // jika nilai bukan string kosong
        return false; // ada error
      }
    }
    return true; // tidak ada error
  };

  useEffect(() => {
    if (active === 4) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  }, [active, onComplete]);

  return (
    <Container size={1200} my={10}>
      <form>
      <Grid>
        <GridCol span={{ base: 12 }}>
        <Stepper active={active} onStepClick={setActive}  allowNextStepsSelect={true}>
          <Stepper.Step label="Data Pribadi" description="">
          <Paper withBorder shadow="md" p={10}>
          <Title className={classes.subTitle} ta="left">
            Data Pribadi
          </Title>
          <Grid>
            <GridCol span={{ base: 12, md: 6, lg: 6}}>
              <TextInput label="Nama Lengkap" name="fullname" value={dataRegistrasi.fullname} onChange={(e)=>{handleChange('fullname',e.target.value)}} required placeholder='Contoh: Fauzan Faldy Anggita' error={errors.fullname}/>
              <TextInput label="Nama Panggilan" name="nickname" value={dataRegistrasi.nickname} onChange={(e)=>{handleChange('nickname',e.target.value)}}  required placeholder='Contoh: Ojan'  error={errors.nickname}/>
              <TextInput label="Email" name="email" value={dataRegistrasi.email} onChange={(e)=>{handleChange('email',e.target.value)}}  required placeholder='Contoh: fauzan@gmail.com'  error={errors.email}/>
              {(type === 'edit')&& (
                <>
                  <PasswordInput label="Buat Password" name="password" value={dataRegistrasi.password} onChange={(e)=>{handleChange('password',e.target.value)}}  required  error={errors.password} variant="filled" disabled={true}/>
                  <PasswordInput label="Ulangi Password" name="repeat_password" value={dataRegistrasi.repeat_password} onChange={(e)=>{handleChange('repeat_password',e.target.value)}}  required error={errors.repeat_password} variant="filled"disabled={true}/>
                </>
              )}
              {(type === 'register')&& (
                <>
                  <PasswordInput label="Buat Password" name="password" value={dataRegistrasi.password} onChange={(e)=>{handleChange('password',e.target.value)}}  required  error={errors.password}/>
                  <PasswordInput label="Ulangi Password" name="repeat_password" value={dataRegistrasi.repeat_password} onChange={(e)=>{handleChange('repeat_password',e.target.value)}}  required error={errors.repeat_password}/>
                </>
              )}
              <Select
                label="Jenis Kelamin"
                value={dataRegistrasi.sex}
                onChange={(value) => {
                  handleChange('sex',value)
                }}
                placeholder="Pilih Jenis Kelamin"
                data={[{label:'Laki-laki', value:'1'}, {label:'Perempuan', value:'2'}]}
                required
                error={errors.sex}
                allowDeselect={false}
              />
              <TextInput label="No Handphone/Whatsapp" name="phone" type="number" value={dataRegistrasi.phone} onChange={(e)=>{handleChange('phone',e.target.value)}} required placeholder='Contoh: 6281209929222' error={errors.phone}/>
            </GridCol>
            <GridCol span={{ base: 12, md: 6, lg: 6}}>
              <TextInput label="Tempat Lahir" name="birthplace" required value={dataRegistrasi.birthplace} onChange={(e)=>{handleChange('birthplace',e.target.value)}} placeholder='Contoh: Jakarta'  error={errors.birthplace}/>
              <DateInput 
                label="Tanggal Lahir" 
                name="birthdate" 
                value={birthdateObject} 
                onChange={(value: any) => {
                  handleChange('birthdate',value)
                }} 
                valueFormat="YYYY-MM-DD" 
                placeholder="Pilih Tanggal Lahir"
                error={errors.birthdate}
                required 
              />
              <Select 
                label="Negara Domisili" 
                name="country_id" 
                value={dataRegistrasi.country_id} 
                onChange={(value) => {
                  handleChange('country_id',value)
                }} 
                placeholder="Pilih Negara Domisili"
                data={countries}
                defaultValue='' 
                required
                error={errors.country_id}
                allowDeselect
                searchable
                />
              {(dataRegistrasi.country_id === '8d0bdfb8-41b5-11ef-b8c8-acde48001122')&& (
                <>
                  <Select 
                    label="Provinsi Domisili" 
                    name="province_id" 
                    value={dataRegistrasi.province_id} 
                    onChange={(value) => {
                      handleChange('province_id',value)
                    }} 
                    placeholder="Pilih Provinsi Domisili" 
                    data={provinces.filter(province => province.id !== '8f43971c-41b5-11ef-b8c8-acde48001122')} 
                    required 
                    defaultValue=''
                    error={errors.province_id}
                    allowDeselect
                    searchable
                  />
                  <Select 
                    label="Kab/Kota Domisili" 
                    name="city_id" 
                    value={dataRegistrasi.city_id} 
                    onChange={(value) => {
                      handleChange('city_id',value)
                    }} 
                    placeholder="Pilih Kab/Kota Domisili" 
                    data={filteredDomisiliCities} 
                    defaultValue=''
                    required 
                    error={errors.city_id}
                    allowDeselect
                    searchable
                  />
              </>
              )}
              <Textarea label="Alamat Domisili" name="address" value={dataRegistrasi.address} onChange={(e)=>{handleChange('address',e.target.value)}} error={errors.address} required/>
              <Select 
                label="Status Pekerjaan" 
                name="status" 
                value={dataRegistrasi.status} 
                onChange={(value) => {
                  handleChange('status',value)
                }} 
                placeholder="Pilih Status Pekerjaan" 
                data={['PNS', 'Non-PNS']} 
                defaultValue=''
                required 
                error={errors.status}
                allowDeselect
                searchable
              />
            </GridCol>
          </Grid>
          </Paper>
          </Stepper.Step>
          <Stepper.Step label="Riwayat Perguruan Tinggi" description="">
            <Paper withBorder shadow="md" p={10}>
              <Title className={classes.subTitle} ta="left">
                Riwayat Perguruan Tinggi
              </Title>
              <Grid>
              <GridCol span={{ base: 12, md: 6, lg: 6}}>
              <Select 
                    label="Nama Perguruan Tinggi" 
                    name="university_id" 
                    value={dataRegistrasi.university_id} 
                    onChange={(value) => {
                      handleChange('university_id',value)
                    }} 
                    placeholder="Pilih Nama Perguruan Tinggi" 
                    data={universities} 
                    required
                    defaultValue='' 
                    error={errors.university_id}
                    allowDeselect
                    searchable
                  />
                  <MonthPickerInput 
                    label="Bulan Lulus" 
                    name="graduation_month_year" 
                    value={dataRegistrasi.graduation_month_year} 
                    onChange={(value: any) => {
                      handleChange('graduation_month_year',value)
                    }} 
                    valueFormat="MMM-YYYY" 
                    placeholder="Pilih Bulan Lulus" 
                    required 
                    error={errors.graduation_month_year}
                  />
                  </GridCol>
                <GridCol span={{ base: 12, md: 6, lg: 6}}>
                  <TextInput label="Angkatan" name="cohort" value={dataRegistrasi.cohort} onChange={(e)=>{handleChange('cohort',e.target.value)}} type="number" inputMode="numeric"  required placeholder='Masukan 3 digit, Contoh: "051"' error={errors.cohort}/>
                  <Select 
                    label="Program Studi" 
                    name="major_id" 
                    value={dataRegistrasi.major_id} 
                    onChange={(value) => {
                      handleChange('major_id',value)
                    }} 
                    placeholder="Pilih Nama Program Studi" 
                    data={majors} 
                    required
                    defaultValue='' 
                    error={errors.major_id}
                  />
                </GridCol>
                </Grid>
            </Paper>  
          </Stepper.Step>
          <Stepper.Step label="Pekerjaan Terakhir" description="">
            <Paper withBorder shadow="md" p={10}>
                <Title className={classes.subTitle} ta="left">
                  Pekerjaan Terakhir
                </Title>
                <Grid>
                  <GridCol span={{ base: 12, md: 6, lg: 6}}>
                  {(dataRegistrasi.status === 'Non-PNS') && (
                    <>
                    <Select 
                      label="Jenis Kantor" 
                      name="office_category_id" 
                      value={dataRegistrasi.office_category_id} 
                      onChange={(value) => {
                        handleChange('office_category_id',value)
                      }} 
                      placeholder="Pilih Jenis Kantor" 
                      data={officeCategories.filter(office=>office.id === '958901bc-0de4-46d6-a77d-0ccc2a3b3b69')}
                      required
                      allowDeselect={false} 
                    />
                    </>
                    )}
                  {(dataRegistrasi.status === 'PNS') && (
                    <>
                    <Select 
                      label="Jenis Kantor" 
                      name="office_category_id" 
                      value={dataRegistrasi.office_category_id} 
                      onChange={(value) => {
                        handleChange('office_category_id',value)
                      }} 
                      placeholder="Pilih Jenis Kantor" 
                      data={officeCategories.filter(office=>office.id !== '958901bc-0de4-46d6-a77d-0ccc2a3b3b69')}
                      required
                      error = {errors.office_category_id}
                    />
                    </>
                    )}
                    {/* jika bps */}
                    {(dataRegistrasi.status === 'PNS') && ((dataRegistrasi.office_category_id === '8dc8727c-41b5-11ef-b8c8-acde48001122') ||
                    (dataRegistrasi.office_category_id === '8dc87308-41b5-11ef-b8c8-acde48001122') ||
                    (dataRegistrasi.office_category_id === '8dc87326-41b5-11ef-b8c8-acde48001122')  ||
                    (dataRegistrasi.office_category_id === '8dc87344-41b5-11ef-b8c8-acde48001122')  ||
                    (dataRegistrasi.office_category_id === '8dc87358-41b5-11ef-b8c8-acde48001122') ||
                    (dataRegistrasi.office_category_id === '8dc87376-41b5-11ef-b8c8-acde48001122')) && (
                      <>
                        <TextInput label="NIP" name="nip" value={dataRegistrasi.nip} onChange={(e)=>{handleChange('nip',e.target.value)}} type="number" inputMode="numeric"  required error = {errors.nip}/>
                        {((dataRegistrasi.office_category_id === '8dc87344-41b5-11ef-b8c8-acde48001122')||(dataRegistrasi.office_category_id === '8dc87358-41b5-11ef-b8c8-acde48001122')) && (
                          <>
                            <Select 
                              label="BPS Provinsi" 
                              name="bps_province_id" 
                              value={dataRegistrasi.bps_province_id} 
                              onChange={(value) => {
                                handleChange('bps_province_id',value)
                              }} 
                              placeholder="Pilih BPS Provinsi" 
                              data={provinces.filter(province => province.id !== '8f43971c-41b5-11ef-b8c8-acde48001122')}
                              required
                              defaultValue='' 
                            />
                            {(dataRegistrasi.office_category_id === '8dc87358-41b5-11ef-b8c8-acde48001122') && (
                              <>
                            <Select 
                              label="BPS Kab/Kota" 
                              name="bps_city_id" 
                              value={dataRegistrasi.bps_city_id} 
                              onChange={(value) => {
                                handleChange('bps_city_id',value)
                              }} 
                              placeholder="Pilih BPS Kab/Kota" 
                              data={filteredBPSCities} 
                              defaultValue=''
                              required 
                            />
                            </>
                          )}
                            </>
                        )}
                          </>
                    )}
                    {/* jika non bps */}
                    {((dataRegistrasi.office_category_id === '8dc87376-41b5-11ef-b8c8-acde48001122')||(dataRegistrasi.office_category_id === '958901bc-0de4-46d6-a77d-0ccc2a3b3b69'))&& (
                      <>
                        <TextInput label="Nama Kantor" name="other_office_name" placeholder='Contoh: PT. Telkom Tbk.' value={dataRegistrasi.other_office_name} onChange={(e)=>{handleChange('other_office_name',e.target.value)}} required />
                        <Select 
                              label="Kantor Provinsi" 
                              name="office_province_id" 
                              value={dataRegistrasi.office_province_id} 
                              onChange={(value) => {
                                handleChange('office_province_id',value)
                              }} 
                              placeholder="Pilih Kantor Provinsi" 
                              data={provinces}
                              error={errors.office_province_id}
                              required
                              defaultValue='' 
                              allowDeselect
                              searchable
                            />
                        <Select 
                              label="Kantor Kabupaten/Kota" 
                              name="office_city_id" 
                              value={dataRegistrasi.office_city_id} 
                              onChange={(value) => {
                                handleChange('office_city_id',value)
                              }} 
                              placeholder="Pilih Kantor Kab/Kota" 
                              data={filteredOfficeCities} 
                              error={errors.office_city_id}
                              allowDeselect
                              searchable
                        />
                      </>
                    )}
                    <TextInput label="Nama Unit Kerja" name="org_unit" placeholder='Contoh: Tim IPDS' value={dataRegistrasi.org_unit} onChange={(e)=>{handleChange('org_unit',e.target.value)}} required />
                        
                    </GridCol>
                  <GridCol span={{ base: 12, md: 6, lg: 6}}>
                    {dataRegistrasi.office_category_id !== '' && (
                      <>
                      <MonthPickerInput 
                      label="Mulai Bekerja" 
                      name="start_working_month_year" 
                      value={dataRegistrasi.start_working_month_year} 
                      onChange={(value: any) => {
                        handleChange('start_working_month_year',value)
                      }}
                      valueFormat="MMM-YYYY" 
                      placeholder="Pilih Bulan Mulai Bekerja" 
                      required 
                      error={errors.start_working_month_year}
                    />
                    <Select
                      label="Status Pekerjaan Terakhir"
                      value={dataRegistrasi.is_working}
                      onChange={(value) => {
                        handleChange('is_working',value)
                      }}
                      placeholder="Pilih Status Pekerjaan Terakhir"
                      data={[{label:'Aktif',value:'1'}, {label:'Tidak Aktif',value:'2'}]}
                      required
                    />
                    {dataRegistrasi.is_working === '2' && (
                      <>
                        <MonthPickerInput 
                        label="Mulai Berhenti Bekerja" 
                        name="stop_working_month_year" 
                        value={dataRegistrasi.stop_working_month_year} 
                        onChange={(value) => {
                          handleChange('stop_working_month_year',value)
                        }}
                        valueFormat="MMM-YYYY" 
                        placeholder="Pilih Bulan Mulai Berhenti Bekerja" 
                        required 
                        error={errors.stop_working_month_year}
                        />
                      </>
                    )}
                      </>
                    )}
                    </GridCol>
                </Grid>
            </Paper>
          </Stepper.Step>
          <Stepper.Step label="Aktivasi HAISSTIS" description="">
            <Paper withBorder shadow="md" p={10}>
              <Title className={classes.subTitle} ta="left">
                Aktivasi HAISSTIS
              </Title>
              <Grid>
                <GridCol span={{ base: 12, md: 6, lg: 6}}>
                <Select 
                    label="Apakah sudah aktivasi keanggotaan HAISSTIS?"
                    description=''  
                    name="is_activated" 
                    value={dataRegistrasi.is_activated} 
                    onChange={(value) => {
                      handleChange('is_activated',value)
                    }}
                    placeholder="" 
                    data={[{label:'Sudah',value:'1'}, {label:'Belum',value:'2'}]} 
                    required 
                    defaultValue=''
                  />
                </GridCol>
                <GridCol span={{ base: 12, md: 6, lg: 6}}>
                {dataRegistrasi.is_activated === '1' && (
                    <>
                      <TextInput 
                        label="ID Alumni"
                        name="alumni_id" 
                        value={dataRegistrasi.alumni_id}
                        onChange={(e) => {
                          handleChange('alumni_id',e.target.value)
                        }} 
                        placeholder='Contoh: 051.003' 
                        required 
                      />
                    </>
                  )}
                  {dataRegistrasi.is_activated === '2' && (
                    <>
                      <Text fz="sm" ta="left">
                        <p>
                        Formulir aktivasi dapat diakses pada link berikut <br /><a href="https://bit.ly/aktivasi_haisstis">https://bit.ly/aktivasi_haisstis</a>
                        </p>
                      </Text>
                    </>
                  )}
                </GridCol>
              </Grid>
            </Paper>
          </Stepper.Step>
          <Stepper.Completed>
            <Paper>
              Selesai, silahkan klik {type === 'edit' ? 'Edit' : 'Submit'}!
            </Paper>
          </Stepper.Completed>
        </Stepper>
        </GridCol>
      </Grid>
      <Group justify="center" mt="xl">
        {active > 0 && <Button variant="default" onClick={prevStep}>Kembali</Button>}
        {active < 4 && <Button onClick={handleNextStep}>Selanjutnya</Button>}
      </Group>
      </form>
    </Container>
  );
}
