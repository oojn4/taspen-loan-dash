import { Paper, Text, Title } from '@mantine/core';
import classes from './FormUser.module.css';

const RegisterInformation = () => {
  return (
    <Paper className={classes.headerForm}>
      <Title className={classes.title} ta="left">
        Formulir Registrasi Anggota HAISSTIS
      </Title>
      <Text fz="sm" ta="left">
        Formulir ini digunakan untuk mendaftarkan Anda ke dalam organisasi HAISSTIS. <br />
        Data yang disimpan tidak akan digunakan untuk kepentingan di luar HAISSTIS. <br />
        Dengan mendaftarkan diri Anda, Anda menyetujui syarat dan ketentuan yang berlaku di HAISSTIS.
      </Text>
    </Paper>
  )
}

export default RegisterInformation