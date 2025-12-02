import { ArrowLeft, Edit2, Trash2, Package, Calendar, Timer, Thermometer, Droplets, Wind, Info, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../App';

type ProductDetailProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
};

export function ProductDetail({ product, onEdit, onDelete, onBack }: ProductDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedPlantType, setEditedPlantType] = useState(product.plantType);
  const [editedHarvestDate, setEditedHarvestDate] = useState(product.harvestDate);

  const calculateDaysRemaining = (harvestDate: string, shelfLifeDays: number) => {
    const harvest = new Date(harvestDate);
    const expiryDate = new Date(harvest.getTime() + shelfLifeDays * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(product.harvestDate, product.shelfLifeDays);
  const isUrgent = daysRemaining <= 3;
  const isExpired = daysRemaining < 0;
  const harvestDateObj = new Date(product.harvestDate);
  const expiryDate = new Date(harvestDateObj.getTime() + product.shelfLifeDays * 24 * 60 * 60 * 1000);

  const handleSaveEdit = () => {
    onEdit({ ...product, name: editedName, plantType: editedPlantType, harvestDate: editedHarvestDate });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="h-full min-h-[667px] bg-white flex flex-col">
      {/* Header */}
      <div className={`px-6 py-6 rounded-b-3xl shadow-md ${
        isExpired 
          ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8A80]'
          : isUrgent 
          ? 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726]'
          : 'bg-gradient-to-r from-[#4C7B46] to-[#6B8E6B]'
      }`}>
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border-2 border-white/50 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white"
            />
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-white text-[#4C7B46] rounded-xl hover:bg-white/90 transition-colors"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedName(product.name);
                setEditedPlantType(product.plantType);
                setEditedHarvestDate(product.harvestDate);
              }}
              className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
            >
              Batal
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-white mb-1">{product.name}</h2>
            <p className="text-white/80">{product.plantType}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {/* Toggle Harvested Status */}
        <button
          onClick={() => onEdit({ ...product, isHarvested: !product.isHarvested })}
          className={`w-full rounded-2xl p-4 flex items-center gap-3 transition-all ${
            product.isHarvested
              ? 'bg-[#E8F3E8] border-2 border-[#4C7B46]'
              : 'bg-[#F8F6F0] border-2 border-transparent hover:border-[#4C7B46]/30'
          }`}
        >
          {product.isHarvested ? (
            <CheckCircle className="w-6 h-6 text-[#4C7B46] flex-shrink-0" />
          ) : (
            <Circle className="w-6 h-6 text-[#6B8E6B] flex-shrink-0" />
          )}
          <div className="flex-1 text-left">
            <h4 className={product.isHarvested ? 'text-[#4C7B46]' : 'text-[#6B8E6B]'}>
              {product.isHarvested ? 'Sudah Diambil dari Gudang' : 'Tandai Sudah Diambil'}
            </h4>
            <p className={`text-sm ${product.isHarvested ? 'text-[#4C7B46]' : 'text-[#6B8E6B]'}`}>
              {product.isHarvested ? 'Produk sudah dipanen/dijual' : 'Klik untuk menandai produk sudah diambil'}
            </p>
          </div>
        </button>

        {/* Status Card */}
        <div className={`rounded-2xl p-5 ${
          isExpired
            ? 'bg-[#FFEBEE] border-2 border-[#FF6B6B]'
            : isUrgent
            ? 'bg-[#FFF3E0] border-2 border-[#FFB74D]'
            : 'bg-[#E8F3E8] border-2 border-[#81C784]'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <Timer className={`w-6 h-6 ${
              isExpired ? 'text-[#FF6B6B]' : isUrgent ? 'text-[#FFB74D]' : 'text-[#4C7B46]'
            }`} />
            <div>
              <h3 className={
                isExpired ? 'text-[#FF6B6B]' : isUrgent ? 'text-[#E65100]' : 'text-[#4C7B46]'
              }>
                {isExpired ? 'Produk Kadaluarsa' : isUrgent ? 'Perhatian Segera!' : 'Kondisi Baik'}
              </h3>
              <p className={`text-sm ${
                isExpired ? 'text-[#C62828]' : isUrgent ? 'text-[#E65100]' : 'text-[#6B8E6B]'
              }`}>
                {isExpired 
                  ? `Melewati batas ${Math.abs(daysRemaining)} hari`
                  : `Sisa ${daysRemaining} hari lagi`
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3">
              <p className="text-[#6B8E6B] text-sm mb-1">Tanggal Panen</p>
              <p className="text-[#4C7B46]">
                {harvestDateObj.toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-[#6B8E6B] text-sm mb-1">Tanggal Kadaluarsa</p>
              <p className={isExpired ? 'text-[#FF6B6B]' : 'text-[#4C7B46]'}>
                {expiryDate.toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Storage Information */}
        <div className="bg-[#F8F6F0] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[#4C7B46]" />
            <h3 className="text-[#4C7B46]">Informasi Penyimpanan</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4">
              <p className="text-[#6B8E6B] text-sm mb-2">Metode Penyimpanan</p>
              <p className="text-[#4C7B46]">{product.storageMethod}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3">
                <Thermometer className="w-5 h-5 text-[#FF6B6B] mb-2" />
                <p className="text-[#6B8E6B] text-xs mb-1">Suhu Ideal</p>
                <p className="text-[#4C7B46] text-sm">{product.temperature}</p>
              </div>

              <div className="bg-white rounded-xl p-3">
                <Droplets className="w-5 h-5 text-[#4FC3F7] mb-2" />
                <p className="text-[#6B8E6B] text-xs mb-1">Kelembaban</p>
                <p className="text-[#4C7B46] text-sm">{product.humidity}</p>
              </div>

              <div className="bg-white rounded-xl p-3">
                <Wind className="w-5 h-5 text-[#81C784] mb-2" />
                <p className="text-[#6B8E6B] text-xs mb-1">Ventilasi</p>
                <p className="text-[#4C7B46] text-sm">{product.ventilation}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="text-[#6B8E6B] text-sm mb-2">Masa Simpan Standar</p>
              <p className="text-[#4C7B46]">{product.shelfLifeDays} hari</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#E8F3E8] rounded-2xl p-4">
          <p className="text-[#4C7B46] mb-2">💡 Tips Penyimpanan</p>
          <ul className="text-[#6B8E6B] text-sm space-y-1 pl-4">
            <li>• Pastikan suhu dan kelembaban sesuai rekomendasi</li>
            <li>• Periksa kondisi produk secara berkala</li>
            <li>• Jaga kebersihan area penyimpanan</li>
            <li>• Pisahkan produk berdasarkan jenisnya</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-white border-t border-[#E8F3E8] space-y-3">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-[#4C7B46] hover:bg-[#3D6237] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <Edit2 className="w-5 h-5" />
          Edit Produk
        </button>
        
        <button
          onClick={handleDelete}
          className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          Hapus Produk
        </button>
      </div>
    </div>
  );
}