import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
	const isAuth: boolean = true;
	const location = useLocation();
	return isAuth ? (
		<Outlet />
	) : (
		<Navigate to='edelgram/login' state={{ from: location }} />
	);
};

export default ProtectedRoutes;
