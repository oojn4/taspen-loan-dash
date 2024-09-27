interface LoanInputClient {
    Nama_Lengkap:string;
    Email:string;
    Status_Pernikahan: string; // 1 for married, 0 for not married
    Jumlah_Tanggungan: string; // string of dependents
    Pendidikan: string; // Education level
    Bekerja_Mandiri: string; // Self-employment status
    Jumlah_Pinjaman: number; // Loan amount
    Jangka_Waktu_Pinjaman: string; // Loan term in years
    Riwayat_Kredit: string; // Credit history
    Total_Pendapatan: number; // Total income
    Gender_Perempuan: string; // 1 for female, 0 for male
    PA_Perkotaan: string; // Urban area indicator
    PA_Pinggiran_Kota: string; // Suburban area indicator
}
