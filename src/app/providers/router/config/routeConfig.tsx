import { createBrowserRouter, Outlet } from 'react-router-dom';

import { EditProfilePage } from '@/pages/EditProfilePage';
import { Error404Page } from '@/pages/Error404Page';
import { InterviewHistoryPage } from '@/pages/InterviewHistoryPage';
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
				element: <Outlet />,
				handle: {
					crumb: 'Профиль',
				},
				children: [
					{
						index: true,
						element: <ProfilePage />,
					},
					{
						path: 'edit',
						element: <EditProfilePage />,
						handle: {
							crumb: 'Редактирование профиля',
						},
					},
				],
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
						element: <Outlet />,
						handle: {
							crumb: 'Викторина',
						},
						children: [
							{
								index: true,
								element: <InterviewQuizPage />,
							},
							{
								path: 'interviewQuizResult',
								element: <InterviewQuizResultPage />,
								handle: {
									crumb: 'Результат викторины',
								},
							},
						],
					},
					{
						path: 'interviewHistory',
						element: <Outlet />,
						handle: {
							crumb: 'История собеседований',
						},
						children: [
							{
								index: true,
								element: <InterviewHistoryPage />,
							},
							{
								path: 'interviewQuizResult',
								element: <InterviewQuizResultPage />,
								handle: {
									crumb: 'Результат викторины',
								},
							},
						],
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
								path: ':questionId',
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
				path: '*',
				element: <Error404Page />,
			},
		],
	},
]);
