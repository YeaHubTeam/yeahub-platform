import { createBrowserRouter } from 'react-router-dom';

// import { usersApi } from '@/entities/users';

import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';

import { App } from '@/app/App';

// import { store } from '../../store';

// export const profileLoader: LoaderFunction = async ({ params }) => {
// 	console.log(params);
// 	const response = store.dispatch(usersApi.endpoints.getUsers.initiate(null));
// 	const data = await response.unwrap();

// 	return data;
// };

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
				// loader: profileLoader,
			},
			{
				path: 'user/:id',
				element: <ProfilePage />,
				// loader: profileLoader,
			},
		],
	},
]);
