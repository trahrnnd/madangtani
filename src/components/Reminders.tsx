import { ArrowLeft, AlertCircle, Calendar, Timer, Package } from 'lucide-react';
import type { Product } from '../App';

type RemindersProps = {
  products: Product[];
  onBack: () => void;
  onViewProduct: (product: Product) => void;
};

export function Reminders({ products, onBack, onViewProduct }: RemindersProps) {
  const calculateDaysRemaining = (harvestDate: string, shelfLifeDays: number) => {
    const harvest = new Date(harvestDate);
    const expiryDate = new Date(harvest.getTime() + shelfLifeDays * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Kategorikan produk berdasarkan urgency
  const expiredProducts = products.filter(p => calculateDaysRemaining(p.harvestDate, p.shelfLifeDays) < 0);
  const urgentProducts = products.filter(p => {
    const days = calculateDaysRemaining(p.harvestDate, p.shelfLifeDays);
    return days >= 0 && days <= 3;
  });
  const soonProducts = products.filter(p => {
    const days = calculateDaysRemaining(p.harvestDate, p.shelfLifeDays);
    return days > 3 && days <= 7;
  });

  return (
    <div className="h-full min-h-[667px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFB74D] to-[#FFA726] px-6 py-6 rounded-b-3xl shadow-md">
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-white flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-white mb-1">Reminder & Notifikasi</h2>
            <p className="text-white/80">Pantau produk yang memerlukan perhatian</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Expired Products */}
        {expiredProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div>
              <h3 className="text-[#FF6B6B]">Kadaluarsa ({expiredProducts.length})</h3>
            </div>
            <div className="space-y-3">
              {expiredProducts.map(product => {
                const daysOver = Math.abs(calculateDaysRemaining(product.harvestDate, product.shelfLifeDays));
                return (
                  <button
                    key={product.id}
                    onClick={() => onViewProduct(product)}
                    className="w-full bg-[#FFEBEE] hover:bg-[#FFCDD2] border-2 border-[#FF6B6B] rounded-2xl p-4 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-[#FF6B6B] mb-1">{product.name}</h4>
                        <p className="text-[#C62828] text-sm mb-2">
                          Melewati batas {daysOver} hari yang lalu
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#C62828]">
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span>{product.plantType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Panen: {new Date(product.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Urgent Products (0-3 days) */}
        {urgentProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FFB74D] rounded-full"></div>
              <h3 className="text-[#FFB74D]">Segera ({urgentProducts.length})</h3>
            </div>
            <div className="space-y-3">
              {urgentProducts.map(product => {
                const daysRemaining = calculateDaysRemaining(product.harvestDate, product.shelfLifeDays);
                return (
                  <button
                    key={product.id}
                    onClick={() => onViewProduct(product)}
                    className="w-full bg-[#FFF3E0] hover:bg-[#FFE0B2] border-2 border-[#FFB74D] rounded-2xl p-4 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <Timer className="w-5 h-5 text-[#FFB74D] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-[#E65100] mb-1">{product.name}</h4>
                        <p className="text-[#E65100] text-sm mb-2">
                          Akan kadaluarsa dalam {daysRemaining} hari
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#E65100]">
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span>{product.plantType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Panen: {new Date(product.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Soon Products (4-7 days) */}
        {soonProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FFD54F] rounded-full"></div>
              <h3 className="text-[#F9A825]">Perhatikan ({soonProducts.length})</h3>
            </div>
            <div className="space-y-3">
              {soonProducts.map(product => {
                const daysRemaining = calculateDaysRemaining(product.harvestDate, product.shelfLifeDays);
                return (
                  <button
                    key={product.id}
                    onClick={() => onViewProduct(product)}
                    className="w-full bg-[#FFFDE7] hover:bg-[#FFF9C4] border-2 border-[#FFD54F] rounded-2xl p-4 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <Timer className="w-5 h-5 text-[#F9A825] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-[#F57F17] mb-1">{product.name}</h4>
                        <p className="text-[#F57F17] text-sm mb-2">
                          Sisa {daysRemaining} hari lagi
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#F57F17]">
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span>{product.plantType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Panen: {new Date(product.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* No reminders */}
        {expiredProducts.length === 0 && urgentProducts.length === 0 && soonProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[#E8F3E8] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-[#4C7B46]" />
            </div>
            <h3 className="text-[#4C7B46] mb-2">Semua Produk Aman!</h3>
            <p className="text-[#6B8E6B]">Tidak ada produk yang memerlukan perhatian khusus</p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-[#E8F3E8] rounded-2xl p-4">
          <p className="text-[#4C7B46] mb-2">ℹ️ Tentang Reminder</p>
          <ul className="text-[#6B8E6B] text-sm space-y-1">
            <li>• <span className="text-[#FF6B6B]">Kadaluarsa</span>: Produk melewati masa simpan</li>
            <li>• <span className="text-[#FFB74D]">Segera</span>: Sisa 0-3 hari</li>
            <li>• <span className="text-[#F9A825]">Perhatikan</span>: Sisa 4-7 hari</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
