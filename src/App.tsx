import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { AddHarvest } from './components/AddHarvest';
import { ProductDetail } from './components/ProductDetail';
import { Reminders } from './components/Reminders';

export type Product = {
  id: string;
  name: string;
  plantType: string;
  harvestDate: string;
  shelfLifeDays: number;
  storageMethod: string;
  temperature: string;
  humidity: string;
  ventilation: string;
  isHarvested: boolean; // Status apakah sudah diambil/dijual
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'dashboard' | 'addHarvest' | 'productDetail' | 'reminders'>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Tomat Merah',
      plantType: 'Tomat',
      harvestDate: '2025-11-27',
      shelfLifeDays: 7,
      storageMethod: 'Ruang dingin dengan kelembaban terkontrol',
      temperature: '10-12°C',
      humidity: '85-90%',
      ventilation: 'Sedang',
      isHarvested: false
    },
    {
      id: '2',
      name: 'Wortel Organik',
      plantType: 'Wortel',
      harvestDate: '2025-11-25',
      shelfLifeDays: 14,
      storageMethod: 'Gudang dingin dengan ventilasi baik',
      temperature: '0-2°C',
      humidity: '95-98%',
      ventilation: 'Tinggi',
      isHarvested: false
    },
    {
      id: '3',
      name: 'Padi Kering',
      plantType: 'Padi',
      harvestDate: '2025-11-20',
      shelfLifeDays: 90,
      storageMethod: 'Gudang kering dengan sirkulasi udara',
      temperature: '25-30°C',
      humidity: '12-14%',
      ventilation: 'Tinggi',
      isHarvested: false
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would validate credentials
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
    setCurrentScreen('dashboard');
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setCurrentScreen('dashboard');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setCurrentScreen('dashboard');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('productDetail');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-y-auto" style={{ minHeight: '667px', maxHeight: '844px' }}>
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {currentScreen === 'dashboard' && (
          <Dashboard
            products={products}
            onAddHarvest={() => setCurrentScreen('addHarvest')}
            onViewProduct={handleViewProduct}
            onViewReminders={() => setCurrentScreen('reminders')}
          />
        )}
        {currentScreen === 'addHarvest' && (
          <AddHarvest
            onSave={handleAddProduct}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'productDetail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}
        {currentScreen === 'reminders' && (
          <Reminders
            products={products}
            onBack={() => setCurrentScreen('dashboard')}
            onViewProduct={handleViewProduct}
          />
        )}
      </div>
    </div>
  );
}