import { Sprout, Warehouse } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-full min-h-[667px] bg-gradient-to-b from-[#E8F3E8] to-[#F8F6F0] flex flex-col items-center justify-center px-8 animate-fadeIn">
      <div className="relative mb-8">
        {/* Decorative leaves */}
        <div className="absolute -top-4 -left-6 text-[#4C7B46] opacity-30">
          <Sprout className="w-12 h-12 rotate-[-20deg]" />
        </div>
        <div className="absolute -top-6 -right-4 text-[#4C7B46] opacity-30">
          <Sprout className="w-10 h-10 rotate-[30deg]" />
        </div>
        
        {/* Main logo */}
        <div className="bg-white rounded-full p-8 shadow-lg">
          <Warehouse className="w-24 h-24 text-[#4C7B46]" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="text-[#4C7B46] mb-2 text-center">MadangTani</h1>
      <p className="text-[#6B8E6B] text-center max-w-xs">
        "Fresh yang Terjaga, dari Gudang ke Meja"
      </p>

      {/* Illustration elements */}
      <div className="mt-12 flex gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md transform rotate-[-5deg]">
          <div className="w-16 h-16 bg-[#FFE5E5] rounded-xl flex items-center justify-center">
            <div className="w-10 h-10 bg-[#FF6B6B] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md transform rotate-[5deg]">
          <div className="w-16 h-16 bg-[#FFE8D6] rounded-xl flex items-center justify-center">
            <div className="w-10 h-10 bg-[#FF9F5A] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md transform rotate-[-3deg]">
          <div className="w-16 h-16 bg-[#E8F3E8] rounded-xl flex items-center justify-center">
            <div className="w-10 h-10 bg-[#4C7B46] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 bg-[#4C7B46] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-[#4C7B46] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-[#4C7B46] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}
