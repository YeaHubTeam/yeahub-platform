import { createBrowserRouter, Outlet } from 'react-router-dom';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

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
		path: ROUTES.appRoute,
		element: <App />,
		children: [
			{
				path: ROUTES.appRoute,
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
						path: ROUTES.profile.route,
						element: <Outlet />,
						handle: {
							crumb: Translation.CRUMBS_PROFILE,
						},
						children: [
							{
								index: true,
								element: <ProfilePage />,
							},
							{
								path: ROUTES.profile.edit.route,
								element: <EditProfilePage />,
								handle: {
									crumb: Translation.CRUMBS_PROFILE_EDITING,
								},
							},
						],
					},
					{
						path: ROUTES.interview.route,
						element: <Outlet />,
						handle: {
							crumb: Translation.CRUMBS_INTERVIEW,
						},

						children: [
							{
								index: true,
								element: <InterviewPage />,
							},
							{
								path: ROUTES.interview.history.route,
								element: <Outlet />,
								handle: {
									crumb: i18n.t(Translation.CRUMBS_INTERVIEW_HISTORY),
								},
								children: [
									{
										index: true,
										element: <InterviewHistoryPage />,
									},
									{
										path: ROUTES.interview.history.result.route,
										element: <InterviewQuizResultPage />,
										handle: {
											crumb: Translation.CRUMBS_INTERVIEW_RESULT,
										},
									},
								],
							},
							{
								path: ROUTES.interview.statistic.route,
								element: <InterviewStatisticsPage />,
								handle: {
									crumb: Translation.CRUMBS_INTERVIEW_STATISTIC,
								},
							},
							{
								path: ROUTES.interview.questions.route,
								element: <Outlet />,
								handle: {
									crumb: Translation.CRUMBS_QUESTIONS_LIST,
								},
								children: [
									{
										index: true,
										element: <QuestionsPage />,
									},
									{
										path: ROUTES.interview.questions.detail.route,
										element: <QuestionPage />,
										handle: {
											crumb: Translation.CRUMBS_QUESTION_DETAIL,
										},
									},
								],
							},
							{
								path: ROUTES.interview.quiz.route,
								element: <Outlet />,
								handle: { crumb: Translation.CRUMBS_INTERVIEWCREATION },
								children: [{ index: true, element: <CreateQuizPage /> }],
							},
							{
								path: ROUTES.interview.new.route,
								element: <InterviewQuizPage />,
								handle: {
									crumb: Translation.CRUMBS_INTERVIEW,
								},
							},
						],
					},
					{
						path: '*',
						element: <Error404Page />,
					},
				],
			},
			{
				path: ROUTES.auth.route,
				element: (
					<UnAuthRoute>
						<AuthLayout />
					</UnAuthRoute>
				),
				children: [
					{
						path: ROUTES.auth.login.route,
						element: <LoginPage />,
					},
					{
						path: ROUTES.auth.register.route,
						element: <RegistrationPage />,
					},
				],
			},
		],
	},
]);
