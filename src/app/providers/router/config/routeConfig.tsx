import { createBrowserRouter, Outlet } from 'react-router-dom';

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
				index: true,
				element: <MainPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'interview',
				element: <Outlet />,
				handle: {
					crumb: 'Обучение',
				},
				children: [
					{
						index: true,
						element: <InterviewPage />,
					},
					{
						path: 'interview-statistics',
						element: <InterviewStatisticsPage />,
						handle: {
							crumb: 'Статистика собеседований',
						},
					},
					{
						path: 'interviewQuiz',
						element: <InterviewQuizPage />,
						handle: {
							crumb: 'Викторина',
						},
					},
					{
						path: 'interviewQuizResult',
						element: <InterviewQuizResultPage />,
						handle: {
							crumb: 'Результат викторины',
						},
					},
					{
						path: 'questions',
						element: <Outlet />,
						handle: {
							crumb: 'Список вопросов',
						},
						children: [
							{
								index: true,
								element: <QuestionsPage />,
							},
							{
								path: 'questions/:questionId',
								element: <QuestionPage />,
								handle: {
									crumb: 'Подробнее',
								},
							},
						],
					},
				],
			},
			{
				path: 'login',
				element: <LoginPage />,
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
