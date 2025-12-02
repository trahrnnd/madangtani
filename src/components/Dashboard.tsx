import { AlertCircle, Plus, Bell, Package, Calendar, Timer, CheckCircle } from 'lucide-react';
import type { Product } from '../App';

type DashboardProps = {
  products: Product[];
  onAddHarvest: () => void;
  onViewProduct: (product: Product) => void;
  onViewReminders: () => void;
};

export function Dashboard({ products, onAddHarvest, onViewProduct, onViewReminders }: DashboardProps) {
  const calculateDaysRemaining = (harvestDate: string, shelfLifeDays: number) => {
    const harvest = new Date(harvestDate);
    const expiryDate = new Date(harvest.getTime() + shelfLifeDays * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const urgentProducts = products.filter(p => calculateDaysRemaining(p.harvestDate, p.shelfLifeDays) <= 3);

  return (
    <div className="h-full min-h-[667px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4C7B46] to-[#6B8E6B] px-6 py-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-white mb-1">Dashboard</h1>
            <p className="text-white/80">Kelola stok hasil panen Anda</p>
          </div>
          <button
            onClick={onViewReminders}
            className="relative bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Bell className="w-5 h-5 text-white" />
            {urgentProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {urgentProducts.length}
              </span>
            )}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3">
            <Package className="w-5 h-5 text-white mb-1" />
            <div className="text-white">{products.length}</div>
            <p className="text-white/80 text-xs">Total Produk</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3">
            <AlertCircle className="w-5 h-5 text-white mb-1" />
            <div className="text-white">{urgentProducts.length}</div>
            <p className="text-white/80 text-xs">Butuh Perhatian</p>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      {urgentProducts.length > 0 && (
        <div className="mx-6 mt-4 bg-[#FFF3E0] border-2 border-[#FFB74D] rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#FF9800] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[#E65100]">
              {urgentProducts.length} produk akan segera kadaluarsa!
            </p>
            <button
              onClick={onViewReminders}
              className="text-[#FF9800] text-sm hover:underline mt-1"
            >
              Lihat detail →
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#4C7B46]">Stok Produk</h3>
        </div>

        <div className="space-y-3">
          {products.map((product) => {
            const daysRemaining = calculateDaysRemaining(product.harvestDate, product.shelfLifeDays);
            const isUrgent = daysRemaining <= 3;
            const isExpired = daysRemaining < 0;

            return (
              <div
                key={product.id}
                className={`bg-[#F8F6F0] rounded-2xl p-4 transition-all ${
                  product.isHarvested ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => onViewProduct(product)}
                  className="w-full hover:bg-[#E8F3E8] rounded-xl p-2 -m-2 transition-colors text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {product.isHarvested && (
                          <CheckCircle className="w-4 h-4 text-[#4C7B46]" />
                        )}
                        <h4 className={product.isHarvested ? 'text-[#4C7B46] line-through' : 'text-[#4C7B46]'}>
                          {product.name}
                        </h4>
                      </div>
                      <p className="text-[#6B8E6B] text-sm">{product.plantType}</p>
                    </div>
                    {!product.isHarvested && (
                      <>
                        {isExpired ? (
                          <span className="bg-[#FF6B6B] text-white text-xs px-3 py-1 rounded-full">
                            Kadaluarsa
                          </span>
                        ) : isUrgent ? (
                          <span className="bg-[#FFB74D] text-white text-xs px-3 py-1 rounded-full">
                            Segera
                          </span>
                        ) : (
                          <span className="bg-[#81C784] text-white text-xs px-3 py-1 rounded-full">
                            Aman
                          </span>
                        )}
                      </>
                    )}
                    {product.isHarvested && (
                      <span className="bg-[#4C7B46] text-white text-xs px-3 py-1 rounded-full">
                        Diambil
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6B8E6B]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(product.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    {!product.isHarvested && (
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        <span>
                          {isExpired ? 'Lewat' : `${daysRemaining} hari lagi`}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-[#D4A574] mx-auto mb-4 opacity-40" />
            <p className="text-[#6B8E6B] mb-2">Belum ada produk tersimpan</p>
            <p className="text-[#6B8E6B] text-sm">Tambahkan hasil panen pertama Anda</p>
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="px-6 py-4 bg-white border-t border-[#E8F3E8]">
        <button
          onClick={onAddHarvest}
          className="w-full bg-[#4C7B46] hover:bg-[#3D6237] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Tambah Panen Baru
        </button>
      </div>
    </div>
  );
}