import { createBrowserRouter } from 'react-router-dom';

import { Error404Page } from '@/pages/Error404Page';
import { InterviewPage } from '@/pages/InterviewPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { QuestionPage } from '@/pages/QuestionPage';
import { QuestionsPage } from '@/pages/QuestionsPage';

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
				path: 'questions',
				element: <QuestionsPage />,
			},
			{ path: 'question', element: <QuestionPage /> },
			{
				path: '*',
				element: <Error404Page />,
			},
		],
	},
]);
