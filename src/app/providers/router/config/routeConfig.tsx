import { createBrowserRouter, Outlet } from 'react-router-dom';

import Collection from '@/shared/assets/icons/collection.svg';
import Crown from '@/shared/assets/icons/crown.svg';
import CursorSquare from '@/shared/assets/icons/cursorSquare.svg';
import EducationIcon from '@/shared/assets/icons/education.svg';
import Home from '@/shared/assets/icons/home.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import QuestionsIcon from '@/shared/assets/icons/questions.svg';
import SettingsIcon from '@/shared/assets/icons/Settings.svg';
import SkillsIcon from '@/shared/assets/icons/skillsIcon.svg';
import SpecializationIcon from '@/shared/assets/icons/specialization.svg';
import User from '@/shared/assets/icons/user.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { MenuItem } from '@/widgets/Sidebar';

import { CollectionCreatePage } from '@/pages/admin/CollectionCreatePage';
import { CollectionEditPage } from '@/pages/admin/CollectionEditPage';
import { CollectionPage } from '@/pages/admin/CollectionPage';
import { CollectionsPage } from '@/pages/admin/CollectionsPage';
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
import { UsersTablePage } from '@/pages/admin/UserTablePage';
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
import { DocsPage } from '@/pages/landing/DocsPage';
import { MainPage as LandingMainPage } from '@/pages/landing/MainPage';
import { PublicQuestionPage } from '@/pages/landing/PublicQuestionPage';
import { PublicQuestionsPage } from '@/pages/landing/PublicQuestionsPage';
import { EditProfilePage } from '@/pages/profile/EditProfilePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { SettingsProfilePage } from '@/pages/profile/SettingsProfilePage';

import { App } from '@/app/App';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { LandingLayout } from '@/app/layouts/LandingLayout';
import { MainLayout } from '@/app/layouts/MainLayout';

import { AuthRoute } from '../ui/AuthRoute';
import { InterviewRoute } from '../ui/InterviewRoute';
import { UnAuthRoute } from '../ui/UnAuthRoute';
import { VerifiedEmailRoute } from '../ui/VerifiedEmailRoute';

const mainLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_ADMIN),
		icon: Crown,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: MainIcon,
	},
	{
		type: 'single',
		route: ROUTES.profile.route,
		title: i18n.t(Translation.SIDEBAR_MENU_PROFILE),
		icon: ProfileIcon,
	},
	{
		type: 'single',
		route: ROUTES.settings.page,
		title: i18n.t(Translation.SIDEBAR_MENU_SETTINGS),
		icon: SettingsIcon,
	},
	{
		type: 'category',
		title: i18n.t(Translation.SIDEBAR_MENU_EDUCATION_TITLE),
		icon: EducationIcon,
		elements: [
			{
				route: ROUTES.interview.route,
				title: i18n.t(Translation.SIDEBAR_MENU_EDUCATION_INTERVIEW),
				icon: InterviewIcon,
			},
		],
	},
];

const adminLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_PLATFORM),
		icon: CursorSquare,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: Home,
	},
	{
		type: 'single',
		route: ROUTES.admin.questions.route,
		title: i18n.t(Translation.SIDEBAR_MENU_QUESTIONS),
		icon: QuestionsIcon,
	},
	{
		type: 'single',
		route: ROUTES.admin.specializations.route,
		title: i18n.t(Translation.SIDEBAR_MENU_SPECIALIZATIONS),
		icon: SpecializationIcon,
	},
	{
		type: 'single',
		route: ROUTES.admin.skills.route,
		title: i18n.t(Translation.SIDEBAR_MENU_SKILLS),
		icon: SkillsIcon,
	},
	{
		type: 'single',
		route: ROUTES.admin.users.route,
		title: i18n.t(Translation.SIDEBAR_MENU_USERS),
		icon: User,
	},
	{
		type: 'single',
		route: ROUTES.admin.collections.route,
		title: i18n.t(Translation.SIDEBAR_MENU_COLLECTIONS),
		icon: Collection,
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
					{
						path: '*',
						element: <Error404Page />,
					},
					{
						path: ROUTES.docs.page,
						element: <DocsPage />,
					},
					{
						path: ROUTES.questions.route,
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <PublicQuestionsPage />,
							},
							{
								path: ROUTES.questions.detail.route,
								element: <PublicQuestionPage />,
							},
						],
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
					{
						path: ROUTES.admin.users.route,
						element: <UsersTablePage />,
					},
					{
						path: ROUTES.admin.collections.route,
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <CollectionsPage />,
							},
							{
								path: ROUTES.admin.collections.create.route,
								element: <CollectionCreatePage />,
							},
							{
								path: ROUTES.admin.collections.edit.route,
								element: <CollectionEditPage />,
							},
							{
								path: ROUTES.admin.collections.details.route,
								element: <CollectionPage />,
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
						element: (
							<InterviewRoute>
								<Outlet />
							</InterviewRoute>
						),
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
								element: (
									<VerifiedEmailRoute>
										<Outlet />
									</VerifiedEmailRoute>
								),
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
								element: (
									<VerifiedEmailRoute>
										<InterviewStatisticsPage />
									</VerifiedEmailRoute>
								),
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
								element: (
									<VerifiedEmailRoute>
										<Outlet />
									</VerifiedEmailRoute>
								),
								handle: { crumb: Translation.CRUMBS_INTERVIEW_CREATION },
								children: [{ index: true, element: <CreateQuizPage /> }],
							},
							{
								path: ROUTES.interview.new.route,
								element: (
									<VerifiedEmailRoute>
										<InterviewQuizPage />
									</VerifiedEmailRoute>
								),
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
