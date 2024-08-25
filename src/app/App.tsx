import { Outlet } from 'react-router-dom';

import { Loader } from '@/shared/ui/Loader';

import { useProfileQuery } from '@/entities/auth';

import './styles/App.css';
import './styles/normalize.css';

export const App = () => {
	const { isLoading } = useProfileQuery();

	return <>{isLoading ? <Loader /> : <Outlet />}</>;
};
