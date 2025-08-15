import React, { useState,useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [Cpassword, setCpassword] = useState('');
const { login,user } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
     if(user){
      navigate('/');
     }
    }, [user])
    

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const url = isLogin ? '/login/' : '/register/';
    const response = await axiosInstance.post<ApiResponse<any>>(url, {fullname:name, email, passwordhash:password, confirm_password: Cpassword });
    if(response.data.data.token && response.data.data.user){
login(response.data.data.token, response.data.data.user);
 navigate('/')
      setEmail('');
      setPassword('');
      setName('');
    }
    
    if(!isLogin){
      setIsLogin(true)
    }else{
      navigate('/')
      setEmail('');
      setPassword('');
      setName('');
    }
     toast.success(isLogin ?'Logged in successfully' : 'Registered successfully');
  
  } catch (error: any) {
   if (
  error.response?.data?.error &&
  Array.isArray(error.response.data.error.passwordhash) &&
  error.response.data.error.passwordhash.length > 0
) {
  toast.error(error.response.data.error.passwordhash[0]);
}
else if(error.response?.data?.error &&
  Array.isArray(error.response.data.error.confirm_password) &&
  error.response.data.error.confirm_password.length > 0){
  toast.error(error.response.data.error.confirm_password[0]);
}else{
  toast.error(error.response.data.error.error || 'invalid credentials');
}

}
finally{
    setIsSubmitting(false)
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Left side - Auth Form */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back!' : 'Create an account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Get started with your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
             {!isLogin && (
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={Cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.687-6.735-2.687-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.668-0.068-1.325-0.182-1.961h-9.818z" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>

              
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Promotional Content */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex flex-col justify-center text-white">
  <div className="max-w-md mx-auto w-full">
    {/* Promo Banner */}
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
      <h2 className="text-2xl font-bold mb-2">Unlock $500 off*</h2>
      <p className="text-lg mb-4">on LIVE events & shows</p>
      <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition">
        Apply Now
      </button>
      <p className="text-xs mt-2 opacity-80">*Terms and conditions apply</p>
    </div>

    {/* Events Showcase */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Trending Events</h3>
      
      <div className="space-y-4">
        {/* Event Card 1 */}
        <div className="bg-white/5 p-4 rounded-lg flex items-start">
          <img  className="w-16 h-16 bg-white/20 rounded-md mr-4 flex-shrink-0" src={'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VGh1LCAyMSBBdWcgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00452000-xmyavkqrej-portrait.jpg'} alt="" />
          <div>
            <h4 className="font-medium">Sunburn Arena</h4>
            <p className="text-sm opacity-80 mt-1">EDM Festival • Bangalore</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-300">★ 4.8</span>
              <span className="mx-2">•</span>
              <span>12K+ booked</span>
            </div>
            <p className="text-sm font-medium mt-2">From ₹999</p>
          </div>
        </div>
        
        {/* Event Card 2 */}
        <div className="bg-white/5 p-4 rounded-lg flex items-start">
          <img  className="w-16 h-16 bg-white/20 rounded-md mr-4 flex-shrink-0" src={'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VGh1LCAyMSBBdWcgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00452000-xmyavkqrej-portrait.jpg'} alt="" />
          <div>
            <h4 className="font-medium">Standup Comedy</h4>
            <p className="text-sm opacity-80 mt-1">Zakir Khan • Delhi</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-300">★ 4.9</span>
              <span className="mx-2">•</span>
              <span>8K+ booked</span>
            </div>
            <p className="text-sm font-medium mt-2">From ₹499</p>
          </div>
        </div>
        
        {/* Event Card 3 */}
        <div className="bg-white/5 p-4 rounded-lg flex items-start">
         
           <img  className="w-16 h-16 bg-white/20 rounded-md mr-4 flex-shrink-0" src={'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-VGh1LCAyMSBBdWcgb253YXJkcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00452000-xmyavkqrej-portrait.jpg'} alt="" />
          <div>
            <h4 className="font-medium">Broadway Musical</h4>
            <p className="text-sm opacity-80 mt-1">The Lion King • Mumbai</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-300">★ 4.7</span>
              <span className="mx-2">•</span>
              <span>15K+ booked</span>
            </div>
            <p className="text-sm font-medium mt-2">From ₹1499</p>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</div>
    </div>
  );
};

export default AuthPage;