import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpiner from '../components/shared/LoadingSpiner/LoadingSpiner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {

    const { user, loading } = useAuth();

    const { role, isLoading } = useRole();

    if(loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if(user && role === 'admin') return children;

    return <Navigate to='/' replace='true' />
};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;