export default function VerifiedBy() {
    return (
        <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 p-4 rounded-xl my-6">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center shrink-0 text-2xl">
                👨‍💻
            </div>
            <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">
                    Diverifikasi Oleh
                </p>
                <p className="text-gray-900 font-semibold text-sm leading-tight">
                    Tim Riset BantuPilih
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                    Konten ini telah melalui proses riset independen & validasi data.
                </p>
            </div>
        </div>
    );
}
