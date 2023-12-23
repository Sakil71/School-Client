import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Loading from '../../Pages/Components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin/UseAdmin';

const AdminRoutes = ({ children }) => {
    const {user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if(user?.uid && isAdmin){
        return children;
    }
    return <Navigate to='/' state={{from : location}} replace></Navigate>
};

export default AdminRoutes;