interface LoanInputServer {
    Nama_Lengkap:string;
    Email:string;
    Status_Pernikahan: number; // 1 for married, 0 for not married
    Jumlah_Tanggungan: number; // string of dependents
    Pendidikan: number; // Education level
    Bekerja_Mandiri: number; // Self-employment status
    Jumlah_Pinjaman: number; // Loan amount
    Jangka_Waktu_Pinjaman: number; // Loan term in years
    Riwayat_Kredit: number; // Credit history
    Total_Pendapatan: number; // Total income
    Gender_Perempuan: number; // 1 for female, 0 for male
    PA_Perkotaan: number; // Urban area indicator
    PA_Pinggiran_Kota: number; // Suburban area indicator
}
interface LoanOutput {
    loan_status:string;
}