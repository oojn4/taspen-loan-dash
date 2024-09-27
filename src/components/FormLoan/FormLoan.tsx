import {
    Button,
    Container,
    Grid,
    GridCol,
    Group,
    Paper,
    Select,
    Stepper,
    TextInput,
    Title
} from '@mantine/core';
import { useEffect } from 'react';
import { showErrorNotification } from '../../utils/notifications';
import classes from './FormLoan.module.css';
  
  type Props = {
    dataLoan: LoanInputClient;
    handleChange:Function;
    onComplete: (completed: boolean) => void;
    errors:{ [key: string]: string };
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    active:any;
    setActive: React.Dispatch<React.SetStateAction<any>>;
    loanStatus:string|null;
  }
  
  export function FormLoan({ dataLoan, handleChange, active,setActive, onComplete,errors,setErrors,loanStatus}: Props) {

  
    const prevStep = () => {
      setActive((current:any) => (current > 0 ? current - 1 : current))
      setErrors({});
    };
   
    const validateStep = (step: number): boolean => {
      let valid = true;
      switch (step) {
        case 0:
          valid = !!dataLoan.Email && 
                  !!dataLoan.Nama_Lengkap && 
                  !!dataLoan.Status_Pernikahan && 
                  !!dataLoan.Jumlah_Tanggungan && 
                  !!dataLoan.Pendidikan && 
                  !!dataLoan.Bekerja_Mandiri && 
                  !!dataLoan.Gender_Perempuan && 
                  !!dataLoan.Riwayat_Kredit && 
                  !!dataLoan.Total_Pendapatan;
          break;
        case 1:
          valid = !!dataLoan.Jumlah_Pinjaman && 
                  !!dataLoan.Jangka_Waktu_Pinjaman && 
                  !!dataLoan.PA_Perkotaan && 
                  !!dataLoan.PA_Pinggiran_Kota;
          break;
        default:
          break;
      }
      return valid;
    };
  
    const handleNextStep = () => {
        console.log(dataLoan)
      if (validateStep(active) && validateForm()) {
        setActive((prev:any) => (prev < 2 ? prev + 1 : prev));
      } else {
        showErrorNotification('validation-error', 'Terdapat kesalahan dalam pengisian formulir. Silakan periksa dan coba lagi.', 5000);
      }
    };

  
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
      if (active === 2) {
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
            <Stepper.Step label="Profil Peminjam" description="">
            <Paper withBorder shadow="md" p={10}>
            <Title className={classes.subTitle} ta="left">
              Profil Peminjam
            </Title>
            <Grid>
              <GridCol span={{ base: 12, md: 6, lg: 6}}>
                <TextInput label="Nama Lengkap" name="Nama_Lengkap" value={dataLoan.Nama_Lengkap} onChange={(e)=>{handleChange('Nama_Lengkap',e.target.value)}} required placeholder='Contoh: Fauzan Faldy Anggita' error={errors.Nama_Lengkap}/>
                <TextInput label="Email" name="Email" value={dataLoan.Email} onChange={(e)=>{handleChange('Email',e.target.value)}}  required placeholder='Contoh: fauzan@gmail.com'  error={errors.Email}/>
                <Select
                  label="Jenis Kelamin"
                  value={dataLoan.Gender_Perempuan}
                  onChange={(value) => {
                    handleChange('Gender_Perempuan',value)
                  }}
                  placeholder="Pilih Jenis Kelamin"
                  data={[{label:'Laki-laki', value:'0'}, {label:'Perempuan', value:'1'}]}
                  required
                  error={errors.Gender_Perempuan}
                  allowDeselect={false}
                />
                <Select
                  label="Status Pernikahan"
                  value={dataLoan.Status_Pernikahan}
                  onChange={(value) => {
                    handleChange('Status_Pernikahan',value)
                  }}
                  placeholder="Pilih Status Pernikahan"
                  data={[{label:'Menikah', value:'1'}, {label:'Tidak Menikah', value:'2'}]}
                  required
                  error={errors.Status_Pernikahan}
                  allowDeselect={false}
                />
                <Select
                    label="Jumlah Tanggungan"
                    value={dataLoan.Jumlah_Tanggungan}
                    onChange={(value) => {
                        handleChange('Jumlah_Tanggungan',value)
                    }}
                    placeholder="Pilih Jumlah Tanggungan"
                    data={[{label:'0', value:'0'}, {label:'1', value:'1'}, {label:'2', value:'2'}, {label:'>2', value:'3'}]}
                    required
                    error={errors.Jumlah_Tanggungan}
                    allowDeselect={false}
                    />
              </GridCol>
              <GridCol span={{ base: 12, md: 6, lg: 6}}>
                <Select
                    label="Pendidikan"
                    value={dataLoan.Pendidikan}
                    onChange={(value) => {
                        handleChange('Pendidikan',value)
                    }}
                    placeholder="Pilih Pendidikan"
                    data={[{label:'Tamat Pendidikan Tinggi', value:'1'}, {label:'Tidak Tamat Pendidikan Tinggi', value:'2'}]}
                    required
                    error={errors.Pendidikan}
                    allowDeselect={false}
                    />
                <Select
                    label="Status Pekerjaan"
                    value={dataLoan.Bekerja_Mandiri}
                    onChange={(value) => {
                        handleChange('Bekerja_Mandiri',value)
                    }}
                    placeholder="Pilih Status Pekerjaan"
                    data={[{label:'Wirausaha', value:'1'}, {label:'Non-Wirausaha', value:'2'}]}
                    required
                    error={errors.Bekerja_Mandiri}
                    allowDeselect={false}
                    />
                <TextInput 
                    label="Total Pendapatan" name="Total_Pendapatan"  type="number" required value={dataLoan.Total_Pendapatan} onChange={(e)=>{handleChange('Total_Pendapatan',e.target.value)}} placeholder='Contoh: 10000000'  error={errors.Jumlah_Pinjaman}
                />
                <Select
                    label="Pernah Melakukan Kredit"
                    value={dataLoan.Riwayat_Kredit}
                    onChange={(value) => {
                        handleChange('Riwayat_Kredit',value)
                    }}
                    placeholder="Riwayat Kredit"
                    data={[{label:'Pernah Melakukan Kredit', value:'1'}, {label:'Belum Pernah Melakukan Kredit', value:'2'}]}
                    required
                    error={errors.Riwayat_Kredit}
                    allowDeselect={false}
                    />
              </GridCol>
            </Grid>
            </Paper>
            </Stepper.Step>
            <Stepper.Step label="Detail Pinjaman" description="">
              <Paper withBorder shadow="md" p={10}>
                <Title className={classes.subTitle} ta="left">
                Detail Pinjaman
                </Title>
                <Grid>
                <GridCol span={{ base: 12, md: 6, lg: 6}}>
                <TextInput 
                    label="Jumlah Pinjaman" name="Jumlah_Pinjaman"  type="number" required value={dataLoan.Jumlah_Pinjaman} onChange={(e)=>{handleChange('Jumlah_Pinjaman',e.target.value)}} placeholder='Contoh: 10000000'  error={errors.Jumlah_Pinjaman}
                />
                <TextInput 
                    label="Jangka Waktu (Bulan)" name="Jangka_Waktu_Pinjaman"  type="number" required value={dataLoan.Jangka_Waktu_Pinjaman} onChange={(e)=>{handleChange('Jangka_Waktu_Pinjaman',e.target.value)}} placeholder='Contoh: 5'  error={errors.Jangka_Waktu_Pinjaman}
                />
                
                    </GridCol>
                  <GridCol span={{ base: 12, md: 6, lg: 6}}>
                  <Select
                    label="Lokasi Properti di Pusat Kota"
                    value={dataLoan.PA_Perkotaan}
                    onChange={(value) => {
                        handleChange('PA_Perkotaan',value)
                    }}
                    placeholder="Lokasi Properti"
                    data={[{label:'Ya', value:'1'}, {label:'Tidak', value:'0'}]}
                    required
                    error={errors.PA_Perkotaan}
                    allowDeselect={false}
                    />
                <Select
                    label="Lokasi Properti di Pinggiran Kota"
                    value={dataLoan.PA_Pinggiran_Kota}
                    onChange={(value) => {
                        handleChange('PA_Pinggiran_Kota',value)
                    }}
                    placeholder="Lokasi Properti"
                    data={[{label:'Ya', value:'1'}, {label:'Tidak', value:'0'}]}
                    required
                    error={errors.PA_Pinggiran_Kota}
                    allowDeselect={false}
                    />
                  </GridCol>
                  </Grid>
              </Paper>  
            </Stepper.Step>
            <Stepper.Completed>
            {(loanStatus === null)&& (
              <Paper>
                Selesai, silahkan klik Submit
              </Paper>
            
            )}
              {(loanStatus !== null)&& (
                <>
                <Title>Keputusan: {loanStatus}</Title>
                <p>*Submit Ulang jika merubah data</p>
                </>
                
              )}

              
            </Stepper.Completed>
          </Stepper>
          </GridCol>
        </Grid>
        <Group justify="center" mt="xl">
          {active > 0 && <Button variant="default" onClick={prevStep}>Kembali</Button>}
          {active < 2 && <Button onClick={handleNextStep}>Selanjutnya</Button>}
        </Group>
        </form>
      </Container>
    );
  }
  