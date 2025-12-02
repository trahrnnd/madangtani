import { useState } from 'react';
import { Sprout, Mail, Lock } from 'lucide-react';

type LoginScreenProps = {
  onLogin: (email: string, password: string) => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="h-full min-h-[667px] bg-gradient-to-b from-[#E8F3E8] to-white flex flex-col px-8 py-12">
      {/* Illustration */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="flex gap-2 items-end">
            <Sprout className="w-12 h-12 text-[#4C7B46]" />
            <Sprout className="w-16 h-16 text-[#6B8E6B]" />
            <Sprout className="w-10 h-10 text-[#4C7B46]" />
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#D4A574] rounded-full opacity-40"></div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-[#4C7B46] mb-2">Selamat Datang!</h2>
        <p className="text-[#6B8E6B]">Masuk ke akun MadangTani Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          {/* Email Input */}
          <div>
            <label className="block text-[#4C7B46] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B8E6B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-12 pr-4 py-3 bg-[#F8F6F0] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#4C7B46] transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[#4C7B46] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B8E6B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-[#F8F6F0] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#4C7B46] transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#4C7B46] text-white rounded-2xl hover:bg-[#3D6237] transition-colors shadow-lg mb-4"
        >
          Masuk
        </button>

        {/* Register Link */}
        <p className="text-center text-[#6B8E6B]">
          Belum punya akun?{' '}
          <button type="button" className="text-[#4C7B46] hover:underline">
            Daftar di sini
          </button>
        </p>
      </form>
    </div>
  );
}
