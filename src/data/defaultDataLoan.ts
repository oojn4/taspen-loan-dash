const defaultDataLoan: LoanInputClient = {
    Nama_Lengkap:'',
    Email:'',
    Status_Pernikahan: '', // '' for not married, 1 for married
    Jumlah_Tanggungan: '', // Number of dependents
    Pendidikan: '', // Education level
    Bekerja_Mandiri: '', // Self-employment status
    Jumlah_Pinjaman: 0, // Loan amount
    Jangka_Waktu_Pinjaman: '', // Loan term in years
    Riwayat_Kredit: '', // Credit history
    Total_Pendapatan: 0, // Total income
    Gender_Perempuan: '', // '' for male, 1 for female
    PA_Perkotaan: '', // Urban area indicator
    PA_Pinggiran_Kota: '' // Suburban area indicator
};

export default defaultDataLoan;
