import { createBrowserRouter } from 'react-router-dom';
import { MainRoutes,AuthRoutes } from './mainroutes';


const router = createBrowserRouter([
  MainRoutes,
  AuthRoutes
]);


export default router;