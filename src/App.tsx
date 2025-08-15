
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { AuthProvider } from './components/context/AuthContext';
import { Toaster } from 'react-hot-toast';
function App() {
  
  return (
     <AuthProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <RouterProvider router={router} />
     </AuthProvider>
        

  );
}

export default App;
