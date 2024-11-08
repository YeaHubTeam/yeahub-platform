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
import SpecializationIcon from '@/shared/assets/icons/specialization.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { MenuItem } from '@/widgets/Sidebar';

import { MainPage as AdminMainPage } from '@/pages/admin/MainPage';
import { QuestionCreatePage } from '@/pages/admin/QuestionCreatePage';
import { QuestionEditPage } from '@/pages/admin/QuestionEditPage';
import { QuestionPage as AdminQuestionPage } from '@/pages/admin/QuestionPage';
import { QuestionsTablePage } from '@/pages/admin/QuestionsTablePage';
import { SkillCreatePage } from '@/pages/admin/SkillCreatePage';
import { SkillDetailPage } from '@/pages/admin/SkillDetailPage';
import { SkillEditPage } from '@/pages/admin/SkillEditPage';
import { SkillsPage } from '@/pages/admin/SkillsPage';
import { SpecializationCreatePage } from '@/pages/admin/SpecializationCreatePage';
import { SpecializationDetailPage } from '@/pages/admin/SpecializationDetailPage';
import { SpecializationEditPage } from '@/pages/admin/SpecializationEditPage';
import { SpecializationsPage } from '@/pages/admin/SpecializationsPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { PasswordRecoveryPage } from '@/pages/auth/PasswordRecoveryPage';
import { RegistrationPage } from '@/pages/auth/RegistrationPage';
import { Error404Page } from '@/pages/Error404Page';
import { CreateQuizPage } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryPage } from '@/pages/interview/InterviewHistoryPage';
import { InterviewPage } from '@/pages/interview/InterviewPage';
import { InterviewQuizPage } from '@/pages/interview/InterviewQuizPage';
import { InterviewQuizResultPage } from '@/pages/interview/InterviewQuizResultPage';
import { InterviewStatisticsPage } from '@/pages/interview/InterviewStatisticsPage';
import { MainPage } from '@/pages/interview/MainPage';
import { QuestionPage as InterviewQuestionPage } from '@/pages/interview/QuestionPage';
import { QuestionsPage } from '@/pages/interview/QuestionsPage';
import { MainPage as LandingMainPage } from '@/pages/landing/MainPage';
import { EditProfilePage } from '@/pages/profile/EditProfilePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { SettingsProfilePage } from '@/pages/profile/SettingsProfilePage';

import { App } from '@/app/App';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { LandingLayout } from '@/app/layouts/LandingLayout';
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
		route: ROUTES.platformRoute,
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
		route: ROUTES.platformRoute,
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
		route: ROUTES.admin.specializations.route,
		title: 'tabs.specialization',
		icon: SpecializationIcon,
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
				element: <LandingLayout />,
				children: [
					{
						index: true,
						element: <LandingMainPage />,
					},
				],
			},
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
						path: ROUTES.admin.questions.details.page,
						element: <AdminQuestionPage />,
					},
					{
						path: ROUTES.admin.questions.create.page,
						element: <QuestionCreatePage />,
					},
					{
						path: ROUTES.admin.questions.edit.page,
						element: <QuestionEditPage />,
					},
					{
						path: ROUTES.admin.specializations.page,
						element: <SpecializationsPage />,
					},
					{
						path: ROUTES.admin.specializations.edit.page,
						element: <SpecializationEditPage />,
					},
					{
						path: ROUTES.admin.specializations.create.page,
						element: <SpecializationCreatePage />,
					},
					{
						path: ROUTES.admin.specializations.details.page,
						element: <SpecializationDetailPage />,
					},
					{
						path: ROUTES.admin.skills.route,
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <SkillsPage />,
							},
							{
								path: ROUTES.admin.skills.create.route,
								element: <SkillCreatePage />,
							},
							{
								path: ROUTES.admin.skills.edit.route,
								element: <SkillEditPage />,
							},
							{
								path: ROUTES.admin.skills.detail.route,
								element: <SkillDetailPage />,
							},
						],
					},
				],
			},
			{
				path: ROUTES.platformRoute,
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
						path: ROUTES.settings.route,
						element: <SettingsProfilePage />,
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
										element: <InterviewQuestionPage />,
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
									crumb: Translation.CRUMBS_QUIZ,
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
					{
						path: ROUTES.auth['forgot-password'].route,
						element: <ForgotPasswordPage />,
					},
				],
			},
			{
				path: ROUTES.auth['password-recovery'].page,
				element: <PasswordRecoveryPage />,
			},
		],
	},
]);
