import { createBrowserRouter, Outlet } from 'react-router-dom';

import { CreateQuizPage } from '@/pages/CreateQuizPage';
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
import { RegistrationPage } from '@/pages/RegistrationPage';

import { App } from '@/app/App';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { MainLayout } from '@/app/layouts/MainLayout';

import { AuthRoute } from '../ui/AuthRoute';
import { UnAuthRoute } from '../ui/UnAuthRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: (
					<AuthRoute>
						<MainLayout />
					</AuthRoute>
				),
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
								path: 'quiz',
								element: <Outlet />,
								handle: { crumb: 'Собеседование' },
								children: [
									{ index: true, element: <CreateQuizPage /> },
									{
										path: 'interviewQuiz',
										element: <InterviewQuizPage />,
										handle: {
											crumb: 'Викторина',
										},
									},
									{
										path: ':quizId',
										element: <InterviewQuizResultPage />,
										handle: {
											crumb: 'Результат викторины',
										},
									},
								],
							},
							{
								path: 'interview-statistics',
								element: <InterviewStatisticsPage />,
								handle: {
									crumb: 'Статистика собеседований',
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
						path: 'interviewHistory',
						element: <InterviewHistoryPage />,
					},
					{
						path: '*',
						element: <Error404Page />,
					},
				],
			},
			{
				path: '/auth',
				element: (
					<UnAuthRoute>
						<AuthLayout />
					</UnAuthRoute>
				),
				children: [
					{
						path: 'login',
						element: <LoginPage />,
					},
					{
						path: 'registration',
						element: <RegistrationPage />,
					},
				],
			},
		],
	},
]);
