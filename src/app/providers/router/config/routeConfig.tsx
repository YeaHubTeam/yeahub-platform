import { createBrowserRouter, Outlet } from 'react-router-dom';

import Crown from '@/shared/assets/icons/crown.svg';
import CursorSquare from '@/shared/assets/icons/cursorSquare.svg';
import EducationIcon from '@/shared/assets/icons/education.svg';
import Home from '@/shared/assets/icons/home.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import QuestionsIcon from '@/shared/assets/icons/questions.svg';
import SkillsIcon from '@/shared/assets/icons/skillsIcon.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { MenuItem } from '@/widgets/Sidebar';

import { MainPage as AdminMainPage } from '@/pages/admin/MainPage';
import { QuestionsTablePage } from '@/pages/admin/QuestionsTablePage';
import { SkillsPage } from '@/pages/admin/SkillsPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegistrationPage } from '@/pages/auth/RegistrationPage';
import { Error404Page } from '@/pages/Error404Page';
import { CreateQuizPage } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryPage } from '@/pages/interview/InterviewHistoryPage';
import { InterviewPage } from '@/pages/interview/InterviewPage';
import { InterviewQuizPage } from '@/pages/interview/InterviewQuizPage';
import { InterviewQuizResultPage } from '@/pages/interview/InterviewQuizResultPage';
import { InterviewStatisticsPage } from '@/pages/interview/InterviewStatisticsPage';
import { MainPage } from '@/pages/interview/MainPage';
import { QuestionPage } from '@/pages/interview/QuestionPage';
import { QuestionsPage } from '@/pages/interview/QuestionsPage';
import { EditProfilePage } from '@/pages/profile/EditProfilePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';

import { App } from '@/app/App';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { MainLayout } from '@/app/layouts/MainLayout';

import { AuthRoute } from '../ui/AuthRoute';
import { UnAuthRoute } from '../ui/UnAuthRoute';

const mainLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: 'tabs.admin',
		icon: Crown,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.appRoute,
		title: 'tabs.main',
		icon: MainIcon,
	},
	{
		type: 'single',
		route: ROUTES.profile.route,
		title: 'tabs.profile',
		icon: ProfileIcon,
	},
	{
		type: 'category',
		title: 'tabs.education.title',
		icon: EducationIcon,
		elements: [
			{
				route: ROUTES.interview.route,
				title: 'tabs.education.interview',
				icon: InterviewIcon,
			},
		],
	},
];

const adminLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.appRoute,
		title: 'tabs.platform',
		icon: CursorSquare,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: 'tabs.main',
		icon: Home,
	},
	{
		type: 'single',
		route: ROUTES.admin.questions.route,
		title: 'tabs.questions',
		icon: QuestionsIcon,
	},
	{
		type: 'single',
		route: ROUTES.admin.skills.route,
		title: 'tabs.skills',
		icon: SkillsIcon,
	},
];

export const router = createBrowserRouter([
	{
		path: ROUTES.appRoute,
		element: <App />,
		children: [
			{
				path: ROUTES.adminRoute,
				element: (
					<AuthRoute>
						<MainLayout sidebarItems={adminLayoutMenuItems} onlyAdmin />
					</AuthRoute>
				),
				children: [
					{
						index: true,
						element: <AdminMainPage />,
					},
					{
						path: ROUTES.admin.questions.route,
						element: <QuestionsTablePage />,
					},
					{
						path: ROUTES.admin.skills.route,
						element: <SkillsPage />,
					},
				],
			},
			{
				path: ROUTES.appRoute,
				element: (
					<AuthRoute>
						<MainLayout sidebarItems={mainLayoutMenuItems} />
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
