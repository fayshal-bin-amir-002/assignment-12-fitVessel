import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpiner from '../components/shared/LoadingSpiner/LoadingSpiner';

const PrivetRoute = ({children}) => {

    const { user, loading } = useAuth();

    const location = useLocation();

    if(loading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if(!user) return <Navigate to="/login" state={location?.pathname}></Navigate>

    return children;
};

PrivetRoute.propTypes = {
    children: PropTypes.node
};

export default PrivetRoute;