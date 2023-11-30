import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

const ProtectRoutes = () => {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet/> : <Navigate to='/login' exact />
};

export default ProtectRoutes