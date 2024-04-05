import { createBrowserRouter } from 'react-router-dom';

import { Main } from '@/pages/Main';
import { Profile } from '@/pages/Profile';

import { App } from '@/app/App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
]);
