import { createBrowserRouter } from 'react-router-dom';

import { Error404Page } from '@/pages/Error404Page';
import { InterviewPage } from '@/pages/InterviewPage';
import { InterviewQuizPage } from '@/pages/InterviewQuizPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { QuestionPage } from '@/pages/QuestionPage';

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
				path: 'question',
				element: <QuestionPage />,
			},
			{
				path: 'interviewQuiz',
				element: <InterviewQuizPage />,
			},
			{
				path: '*',
				element: <Error404Page />,
			},
		],
	},
]);
