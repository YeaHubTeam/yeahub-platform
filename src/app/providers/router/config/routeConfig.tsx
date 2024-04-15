import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/Main';
import { ProfilePage } from '@/pages/Profile';

import { App } from '@/app/App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
		],
	},
]);
