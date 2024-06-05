import { createBrowserRouter } from 'react-router-dom';

import { EditProfilePage } from '@/pages/EditProfilePage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';

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
			{
				path: 'edit',
				element: <EditProfilePage />,
			},
		],
	},
]);
