import { createBrowserRouter } from 'react-router-dom';

// import { EditProfilePage } from '@/pages/EditProfilePage';
import { Error404Page } from '@/pages/Error404Page';
import { InterviewPage } from '@/pages/InterviewPage';
import { LoginPage } from '@/pages/LoginPage';
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
				path: 'interview',
				element: <InterviewPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: '*',
				element: <Error404Page />,
			},
			// {
			// 	path: 'edit',
			// 	element: <EditProfilePage />,
			// },
		],
	},
]);
