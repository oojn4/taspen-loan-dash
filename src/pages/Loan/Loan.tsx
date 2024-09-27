import { Container, Group } from '@mantine/core';
import { useState } from "react";
import { FormLoan } from '../../components/FormLoan/FormLoan';
import LoanInformation from '../../components/LoanInformation/LoanInformation';
import ResetButton from '../../components/RegisterButton/ResetButton';
import SubmitButton from '../../components/RegisterButton/SubmitButton';
import defaultDataLoan from '../../data/defaultDataLoan';
import { LoanService } from '../../lib/services/LOAN.service';
import { showErrorFetching } from '../../utils/errorFetching';

const LoanPage = () => {
  const [dataLoan, setDataLoan] = useState<LoanInputClient>(defaultDataLoan);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loanStatus, setLoanStatus] = useState<string | null>(null); 

  const handleSubmitRegistration = async (data: LoanInputServer) => {
    try {
      const response = await LoanService.sendLoanData(data);
      if (response) {
        console.log(response);
        setLoanStatus(response.loan_status); // Set loan status (approved/rejected)
      }
    } catch (error) {
      return showErrorFetching(error);
    }
  };

  const handleChange = (name: string, value: any) => {
    setDataLoan({
      ...dataLoan,
      [name]: value,
    });

    let error: string | null = null;

    switch (name) {
      case 'Nama_Lengkap':
      case 'Status_Pernikahan':
      case 'Jumlah_Tanggungan':
      case 'Pendidikan':
      case 'Bekerja_Mandiri':
      case 'Jumlah_Pinjaman':
      case 'Jangka_Waktu_Pinjaman':
      case 'Riwayat_Kredit':
      case 'Total_Pendapatan':
      case 'Gender_Perempuan':
      case 'PA_Perkotaan':
      case 'PA_Pinggiran_Kota':
        error = validateRequired(value);
        break;
      case 'Email':
        error = validateEmail(value);
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
  };

  const validateRequired = (value: any) => {
    return (!value) ? 'Isian tidak boleh kosong' : '';
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: any | null } = {};

    newErrors.Nama_Lengkap = validateRequired(dataLoan.Nama_Lengkap);
    newErrors.Status_Pernikahan = validateRequired(dataLoan.Status_Pernikahan);
    newErrors.Email = validateEmail(dataLoan.Email);
    newErrors.Jumlah_Tanggungan = validateRequired(dataLoan.Jumlah_Tanggungan);
    newErrors.Pendidikan = validateRequired(dataLoan.Pendidikan);
    newErrors.Bekerja_Mandiri = validateRequired(dataLoan.Bekerja_Mandiri);
    newErrors.Jumlah_Pinjaman = validateRequired(dataLoan.Jumlah_Pinjaman);
    newErrors.Jangka_Waktu_Pinjaman = validateRequired(dataLoan.Jangka_Waktu_Pinjaman);
    newErrors.Riwayat_Kredit = validateRequired(dataLoan.Riwayat_Kredit);
    newErrors.Total_Pendapatan = validateRequired(dataLoan.Total_Pendapatan);
    newErrors.Gender_Perempuan = validateRequired(dataLoan.Gender_Perempuan);
    newErrors.PA_Perkotaan = validateRequired(dataLoan.PA_Perkotaan);
    newErrors.PA_Pinggiran_Kota = validateRequired(dataLoan.PA_Pinggiran_Kota);

    setErrors(newErrors);

    // If there are errors, prevent submission
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    const dataSubmit = {
      Nama_Lengkap: dataLoan.Nama_Lengkap,
      Email: dataLoan.Email,
      Status_Pernikahan: parseInt(dataLoan.Status_Pernikahan),
      Jumlah_Tanggungan: parseInt(dataLoan.Jumlah_Tanggungan),
      Pendidikan: parseInt(dataLoan.Pendidikan),
      Bekerja_Mandiri: parseInt(dataLoan.Bekerja_Mandiri),
      Jumlah_Pinjaman: dataLoan.Jumlah_Pinjaman,
      Jangka_Waktu_Pinjaman: parseInt(dataLoan.Jangka_Waktu_Pinjaman),
      Riwayat_Kredit: parseInt(dataLoan.Riwayat_Kredit),
      Total_Pendapatan: dataLoan.Total_Pendapatan,
      Gender_Perempuan: parseInt(dataLoan.Gender_Perempuan),
      PA_Perkotaan: parseInt(dataLoan.PA_Perkotaan),
      PA_Pinggiran_Kota: parseInt(dataLoan.PA_Pinggiran_Kota),
    };

    handleSubmitRegistration(dataSubmit);
  };

  const handleReset = () => {
    setDataLoan(defaultDataLoan);
    setActiveStep(0);
    setLoanStatus(null); // Reset loan status on reset
  };

  return (
    <>
      <Container size={1200} my={30}>
        <LoanInformation /> {/* Pass loanStatus to LoanInformation */}
      </Container>
      <FormLoan
        dataLoan={dataLoan}
        handleChange={handleChange}
        active={activeStep}
        setActive={setActiveStep}
        onComplete={handleCompletion}
        errors={errors}
        setErrors={setErrors}
        loanStatus={loanStatus}
      />
      <Container size={1200} my="lg">
        <Group justify="flex-end" my="lg">
          <ResetButton onClick={handleReset} />
          {isCompleted && <SubmitButton onClick={handleSubmit} />}
        </Group>
      </Container>
    </>
  );
};

export default LoanPage;
