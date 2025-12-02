import { useState } from 'react';
import { ArrowLeft, Package, Sprout, Calendar, Info } from 'lucide-react';
import type { Product } from '../App';

type AddHarvestProps = {
  onSave: (product: Omit<Product, 'id'>) => void;
  onBack: () => void;
};

// Database simulasi untuk informasi penyimpanan berdasarkan tipe tanaman
const storageDatabase: Record<string, { 
  shelfLifeDays: number; 
  storageMethod: string;
  temperature: string;
  humidity: string;
  ventilation: string;
}> = {
  'Tomat': {
    shelfLifeDays: 7,
    storageMethod: 'Ruang dingin dengan kelembaban terkontrol',
    temperature: '10-12°C',
    humidity: '85-90%',
    ventilation: 'Sedang'
  },
  'Wortel': {
    shelfLifeDays: 14,
    storageMethod: 'Gudang dingin dengan ventilasi baik',
    temperature: '0-2°C',
    humidity: '95-98%',
    ventilation: 'Tinggi'
  },
  'Padi': {
    shelfLifeDays: 90,
    storageMethod: 'Gudang kering dengan sirkulasi udara',
    temperature: '25-30°C',
    humidity: '12-14%',
    ventilation: 'Tinggi'
  },
  'Kentang': {
    shelfLifeDays: 30,
    storageMethod: 'Ruang gelap dan sejuk dengan ventilasi',
    temperature: '7-10°C',
    humidity: '85-90%',
    ventilation: 'Sedang'
  },
  'Cabai': {
    shelfLifeDays: 10,
    storageMethod: 'Ruang dingin dengan kelembaban rendah',
    temperature: '7-10°C',
    humidity: '60-70%',
    ventilation: 'Tinggi'
  },
  'Bawang': {
    shelfLifeDays: 60,
    storageMethod: 'Gudang kering dengan ventilasi baik',
    temperature: '20-25°C',
    humidity: '65-70%',
    ventilation: 'Tinggi'
  },
  'Selada': {
    shelfLifeDays: 5,
    storageMethod: 'Ruang dingin dengan kelembaban tinggi',
    temperature: '0-2°C',
    humidity: '95-98%',
    ventilation: 'Rendah'
  },
  'Jagung': {
    shelfLifeDays: 21,
    storageMethod: 'Gudang kering dengan suhu terkontrol',
    temperature: '15-20°C',
    humidity: '13-15%',
    ventilation: 'Tinggi'
  }
};

const plantTypes = Object.keys(storageDatabase);

export function AddHarvest({ onSave, onBack }: AddHarvestProps) {
  const [name, setName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [showStorageInfo, setShowStorageInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storageInfo = storageDatabase[plantType] || storageDatabase['Tomat'];
    
    onSave({
      name,
      plantType,
      harvestDate,
      ...storageInfo,
      isHarvested: false
    });
  };

  const selectedStorage = plantType ? storageDatabase[plantType] : null;

  return (
    <div className="h-full min-h-[667px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4C7B46] to-[#6B8E6B] px-6 py-6 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            type="button"
            className="text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-white text-[#4C7B46] px-6 py-2 rounded-full hover:bg-white/90 transition-colors shadow-lg"
          >
            Simpan
          </button>
        </div>
        <h2 className="text-white mb-1">Tambah Panen Baru</h2>
        <p className="text-white/80">Sistem akan menentukan penyimpanan optimal</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-5">
          {/* Nama Produk */}
          <div>
            <label className="flex items-center gap-2 text-[#4C7B46] mb-2">
              <Package className="w-4 h-4" />
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Tomat Merah"
              className="w-full px-4 py-3 bg-[#F8F6F0] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#4C7B46] transition-colors"
              required
            />
          </div>

          {/* Tipe Tumbuhan */}
          <div>
            <label className="flex items-center gap-2 text-[#4C7B46] mb-2">
              <Sprout className="w-4 h-4" />
              Tipe Tumbuhan
            </label>
            <select
              value={plantType}
              onChange={(e) => {
                setPlantType(e.target.value);
                setShowStorageInfo(true);
              }}
              className="w-full px-4 py-3 bg-[#F8F6F0] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#4C7B46] transition-colors appearance-none cursor-pointer"
              required
            >
              <option value="">Pilih tipe tumbuhan</option>
              {plantTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Tanggal Panen */}
          <div>
            <label className="flex items-center gap-2 text-[#4C7B46] mb-2">
              <Calendar className="w-4 h-4" />
              Tanggal Panen
            </label>
            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-[#F8F6F0] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#4C7B46] transition-colors"
              required
            />
          </div>

          {/* Storage Info dari Database */}
          {selectedStorage && showStorageInfo && (
            <div className="bg-[#E8F3E8] border-2 border-[#4C7B46]/20 rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <Info className="w-5 h-5 text-[#4C7B46] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#4C7B46] mb-1">Informasi Penyimpanan Optimal</h4>
                  <p className="text-[#6B8E6B] text-sm">
                    Sistem telah menentukan kondisi terbaik untuk {plantType}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pl-8">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-[#6B8E6B] text-sm mb-1">Masa Simpan</p>
                  <p className="text-[#4C7B46]">{selectedStorage.shelfLifeDays} hari</p>
                </div>

                <div className="bg-white rounded-xl p-3">
                  <p className="text-[#6B8E6B] text-sm mb-1">Metode Penyimpanan</p>
                  <p className="text-[#4C7B46]">{selectedStorage.storageMethod}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-[#6B8E6B] text-xs mb-1">Suhu</p>
                    <p className="text-[#4C7B46] text-sm">{selectedStorage.temperature}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-[#6B8E6B] text-xs mb-1">Kelembaban</p>
                    <p className="text-[#4C7B46] text-sm">{selectedStorage.humidity}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-[#6B8E6B] text-xs mb-1">Ventilasi</p>
                    <p className="text-[#4C7B46] text-sm">{selectedStorage.ventilation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}