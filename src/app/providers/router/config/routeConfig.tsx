import { createBrowserRouter, Outlet } from 'react-router-dom';

import Books from '@/shared/assets/icons/books.svg';
import Collection from '@/shared/assets/icons/collection.svg';
import Companies from '@/shared/assets/icons/Companies.svg';
import Crown from '@/shared/assets/icons/crown.svg';
import CursorSquare from '@/shared/assets/icons/cursorSquare.svg';
import EducationIcon from '@/shared/assets/icons/education.svg';
import Home from '@/shared/assets/icons/home.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import QuestionsIcon from '@/shared/assets/icons/questions.svg';
import SettingsIcon from '@/shared/assets/icons/settings.svg';
import SkillsIcon from '@/shared/assets/icons/skillsIcon.svg';
import SpecializationIcon from '@/shared/assets/icons/specialization.svg';
import User from '@/shared/assets/icons/user.svg';
import WikiIcon from '@/shared/assets/icons/wiki.svg';
import ResourcesIcon from '@/shared/assets/icons/wikiResources.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';

import { listAdminRoles, RoleName } from '@/entities/auth';

import { CollectionBlock } from '@/widgets/Landing/CollectionBlock';
import { MenuItem } from '@/widgets/Sidebar';

import { CollectionCreatePage } from '@/pages/admin/CollectionCreatePage';
import { CollectionEditPage } from '@/pages/admin/CollectionEditPage';
import { CollectionPage as AdminCollectionPage } from '@/pages/admin/CollectionPage';
import { CollectionsPage as AdminCollectionsPage } from '@/pages/admin/CollectionsPage';
import { CompaniesTablePage } from '@/pages/admin/CompaniesTablePage';
import { CompanyCreatePage } from '@/pages/admin/CompanyCreatePage';
import { CompanyDetailPage } from '@/pages/admin/CompanyDetailPage';
import { CompanyEditPage } from '@/pages/admin/CompanyEditPage';
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
import { UserDetailPage } from '@/pages/admin/UserDetailPage';
import { UserEditPage } from '@/pages/admin/UserEditPage';
import { UsersTablePage } from '@/pages/admin/UserTablePage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { PasswordRecoveryPage } from '@/pages/auth/PasswordRecoveryPage';
import { RegistrationPage } from '@/pages/auth/RegistrationPage';
import { Error404Page } from '@/pages/Error404Page';
import { CollectionPage as InterviewCollectionPage } from '@/pages/interview/CollectionPage';
import { CollectionsPage as InterviewCollectionsPage } from '@/pages/interview/CollectionsPage';
import { CreateQuizPage } from '@/pages/interview/CreateQuizPage';
import { InterviewHistoryPage } from '@/pages/interview/InterviewHistoryPage';
import { InterviewMockQuizResultPage } from '@/pages/interview/InterviewMockQuizResultPage';
import { InterviewPage } from '@/pages/interview/InterviewPage';
import { InterviewQuizPage } from '@/pages/interview/InterviewQuizPage';
import { InterviewQuizResultPage } from '@/pages/interview/InterviewQuizResultPage';
import { InterviewStatisticsPage } from '@/pages/interview/InterviewStatisticsPage';
import { MainPage } from '@/pages/interview/MainPage';
import { QuestionPage as InterviewQuestionPage } from '@/pages/interview/QuestionPage';
import { QuestionsPage } from '@/pages/interview/QuestionsPage';
import { CreatePublicQuizPage } from '@/pages/landing/CreatePublicQuizPage';
import { DocsPage } from '@/pages/landing/DocsPage';
import { LandingPage } from '@/pages/landing/LandingPage';
import { MediaPage } from '@/pages/landing/MediaPage';
import { PageTemporary as LandingPageTemporary } from '@/pages/landing/PageTemporary';
import { PublicCollectionPage } from '@/pages/landing/PublicCollectionPage';
import { PublicCollectionsPage } from '@/pages/landing/PublicCollectionsPage';
import { PublicMarketplacePage } from '@/pages/landing/PublicMarketplacePage';
import { PublicMarketplaceRequestPage } from '@/pages/landing/PublicMarketplaceRequestPage';
import { PublicQuestionPage } from '@/pages/landing/PublicQuestionPage';
import { PublicQuestionsPage } from '@/pages/landing/PublicQuestionsPage';
import { PublicQuizPage } from '@/pages/landing/PublicQuizPage';
import { PublicQuizResultPage } from '@/pages/landing/PublicQuizResultPage';
import { EditProfilePage } from '@/pages/profile/EditProfilePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { SettingsProfilePage } from '@/pages/profile/SettingsProfilePage';
import { UserProfilePage } from '@/pages/profile/UserProfilePage';
import { ResourcesPage } from '@/pages/wiki/ResourcesPage';

import { AuthLayout } from '@/app/layouts/AuthLayout';
import { LandingLayout } from '@/app/layouts/LandingLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { PremiumRoute } from '@/app/providers/router/ui/PremiumRoute';

import { AuthRoute } from '../ui/AuthRoute';
import { InterviewRoute } from '../ui/InterviewRoute';
import { UnAuthRoute } from '../ui/UnAuthRoute';
import { VerifiedEmailRoute } from '../ui/VerifiedEmailRoute';

import '../../../styles/App.css';
import { ResourcesTablePage } from '@/pages/admin/ResourcesTablePage';
import { ResourceCreatePage } from '@/pages/admin/ResourceCreatePage';
import { ResourceEditPage } from '@/pages/admin/ResourceEditPage';

import { ResourceRequestsPage } from '../../../../pages/admin/ResourceRequestsPage';

export const allRoles: RoleName[] = [
	'guest',
	'candidate',
	'member',
	'admin',
	'HR',
	'candidate-free',
	'candidate-premium',
	'author',
];

const mainLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_ADMIN),
		icon: Crown,
		roles: listAdminRoles,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: MainIcon,
		roles: allRoles,
	},
	{
		type: 'single',
		route: ROUTES.profile.route,
		title: i18n.t(Translation.PROFILE),
		icon: ProfileIcon,
		roles: allRoles,
	},
	{
		type: 'single',
		route: ROUTES.settings.route,
		title: i18n.t(Translation.HEADER_MENU_SETTINGS),
		icon: SettingsIcon,
		roles: allRoles,
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
		roles: allRoles,
	},
	{
		type: 'category',
		title: i18n.t(Translation.SIDEBAR_MENU_WIKI_TITLE),
		icon: WikiIcon,
		elements: [
			{
				route: ROUTES.wiki.resources.route,
				title: i18n.t(Translation.SIDEBAR_MENU_WIKI_RESOURCES_TITLE),
				icon: ResourcesIcon,
			},
		],
		roles: allRoles,
	},
];

const adminLayoutMenuItems: MenuItem[] = [
	{
		type: 'single',
		route: ROUTES.platformRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_PLATFORM),
		icon: CursorSquare,
		roles: listAdminRoles,
		isAdmin: true,
	},
	{
		type: 'single',
		route: ROUTES.adminRoute,
		title: i18n.t(Translation.SIDEBAR_MENU_MAIN),
		icon: Home,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.questions.route,
		title: i18n.t(Translation.SIDEBAR_MENU_QUESTIONS),
		icon: QuestionsIcon,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.specializations.route,
		title: i18n.t(Translation.SIDEBAR_MENU_SPECIALIZATIONS),
		icon: SpecializationIcon,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.skills.route,
		title: i18n.t(Translation.SIDEBAR_MENU_SKILLS),
		icon: SkillsIcon,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.users.route,
		title: i18n.t(Translation.SIDEBAR_MENU_USERS),
		icon: User,
		roles: ['admin'],
	},
	{
		type: 'single',
		route: ROUTES.admin.collections.route,
		title: i18n.t(Translation.SIDEBAR_MENU_COLLECTIONS),
		icon: Collection,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.companies.route,
		title: i18n.t(Translation.SIDEBAR_MENU_COMPANIES),
		icon: Companies,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.resources.route,
		title: i18n.t(Translation.SIDEBAR_MENU_RESOURCES),
		icon: Books,
		roles: listAdminRoles,
	},
];

export const router = createBrowserRouter([
	{
		path: 'landingQuestions',
		element: <LandingPageTemporary />,
	},
	{
		path: ROUTES.appRoute,
		element: <LandingLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: '*',
				element: <Error404Page />,
			},
			{
				path: 'test',
				element: <CollectionBlock />,
			},
			{
				path: ROUTES.marketplace.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <PublicMarketplacePage />,
					},
					{
						path: ROUTES.marketplace.request.route,
						element: <PublicMarketplaceRequestPage />,
					},
				],
			},
			{
				path: ROUTES.docs.page,
				element: <DocsPage />,
			},
			{
				path: ROUTES.media.page,
				element: <MediaPage />,
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
			{
				path: ROUTES.quiz.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <CreatePublicQuizPage />,
					},
					{
						path: ROUTES.quiz.new.route,
						element: <PublicQuizPage />,
					},
					{
						path: ROUTES.quiz.result.route,
						element: <PublicQuizResultPage />,
					},
				],
			},
			{
				path: ROUTES.collections.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <PublicCollectionsPage />,
					},
					{
						path: ROUTES.collections.detail.route,
						element: <PublicCollectionPage />,
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
				path: ROUTES.admin.resources.page,
				element: <ResourcesTablePage />,
			},
			{
				path: ROUTES.admin.resources.create.page,
				element: <ResourceCreatePage />,
			},
			{
				path: ROUTES.admin.resources.edit.page,
				element: <ResourceEditPage />,
			},
			{
				path: ROUTES.admin.resources.requests.page,
				element: <ResourceRequestsPage />,
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
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <UsersTablePage />,
					},
					{
						path: ROUTES.admin.users.detail.route,
						element: <UserDetailPage />,
					},
					{
						path: ROUTES.admin.users.edit.route,
						element: <UserEditPage />,
					},
				],
			},
			{
				path: ROUTES.admin.collections.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <AdminCollectionsPage />,
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
						element: <AdminCollectionPage />,
					},
				],
			},
			{
				path: ROUTES.admin.companies.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <CompaniesTablePage />,
					},
					{
						path: ROUTES.admin.companies.create.route,
						element: <CompanyCreatePage />,
					},
					{
						path: ROUTES.admin.companies.edit.route,
						element: <CompanyEditPage />,
					},
					{
						path: ROUTES.admin.companies.details.route,
						element: <CompanyDetailPage />,
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
						path: 'new/result',
						element: <InterviewMockQuizResultPage />,
					},
					{
						path: ROUTES.interview.history.route,
						element: (
							<VerifiedEmailRoute>
								<PremiumRoute>
									<Outlet />
								</PremiumRoute>
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
								<PremiumRoute>
									<InterviewStatisticsPage />
								</PremiumRoute>
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
						path: ROUTES.interview.collections.route,
						element: <Outlet />,
						handle: {
							crumb: Translation.CRUMBS_COLLECTIONS_LIST,
						},
						children: [
							{
								index: true,
								element: <InterviewCollectionsPage />,
							},
							{
								path: ROUTES.interview.collections.detail.route,
								element: <InterviewCollectionPage />,
								handle: {
									crumb: Translation.CRUMBS_COLLECTIONS_DETAIL,
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
				element: <Outlet />,
				handle: {
					crumb: Translation.CRUMBS_WIKI,
				},
				children: [
					{
						path: ROUTES.wiki.resources.route,
						element: <ResourcesPage />,
						handle: {
							crumb: Translation.CRUMBS_RESOURCES,
						},
					},
				],
			},
			{
				path: ROUTES.users.route,
				element: <UserProfilePage />,
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
]);
