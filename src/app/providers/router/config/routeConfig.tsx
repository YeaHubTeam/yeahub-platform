import { createBrowserRouter } from 'react-router-dom';

import { EditProfilePage } from '@/pages/EditProfilePage';
import { Error404Page } from '@/pages/Error404Page';
import { InterviewPage } from '@/pages/InterviewPage';
import { InterviewQuizPage } from '@/pages/InterviewQuizPage';
import { InterviewQuizResultPage } from '@/pages/InterviewQuizResultPage';
import { InterviewStatisticsPage } from '@/pages/InterviewStatisticsPage';
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
				path: 'interview-statistics',
				element: <InterviewStatisticsPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'questions',
				element: <QuestionsPage />,
			},
			{
				path: 'questions/:questionId',
				element: <QuestionPage />,
			},
			{
				path: 'interviewQuiz',
				element: <InterviewQuizPage />,
			},
			{
				path: 'interviewQuizResult',
				element: <InterviewQuizResultPage />,
			},
			{
				path: 'edit',
				element: <EditProfilePage />,
			},
			{
				path: '*',
				element: <Error404Page />,
			},
		],
	},
]);
