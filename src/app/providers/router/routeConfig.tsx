import { createBrowserRouter, Outlet } from 'react-router-dom';

import Books from '@/shared/assets/icons/books.svg';
import Cards from '@/shared/assets/icons/cards.svg';
import Collection from '@/shared/assets/icons/collection.svg';
import Companies from '@/shared/assets/icons/companies.svg';
import Crown from '@/shared/assets/icons/crown.svg';
import CursorSquare from '@/shared/assets/icons/cursorSquare.svg';
import EducationIcon from '@/shared/assets/icons/education.svg';
import Home from '@/shared/assets/icons/home.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import TasksIcon from '@/shared/assets/icons/lifeBuoy.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import AnalyticsIcon from '@/shared/assets/icons/pieChart.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import QuestionsIcon from '@/shared/assets/icons/questions.svg';
import SettingsIcon from '@/shared/assets/icons/settings.svg';
import SkillsIcon from '@/shared/assets/icons/skillsIcon.svg';
import SpecializationIcon from '@/shared/assets/icons/specialization.svg';
import User from '@/shared/assets/icons/user.svg';
import WikiIcon from '@/shared/assets/icons/wiki.svg';
import ResourcesIcon from '@/shared/assets/icons/wikiResources.svg';
import { i18n, ROUTES, Translation } from '@/shared/config';

import { listAdminRoles, RoleName } from '@/entities/auth';

import { CollectionBlock } from '@/widgets/Landing/CollectionBlock';
import { MenuItem } from '@/widgets/Sidebar';

import { CollectionCreatePage } from '@/pages/admin/collection/collectionCreate';
import { CollectionPage as AdminCollectionPage } from '@/pages/admin/collection/collectionDetail';
import { CollectionEditPage } from '@/pages/admin/collection/collectionEdit';
import { CollectionsPage as AdminCollectionsPage } from '@/pages/admin/collection/collections';
import { CompaniesTablePage } from '@/pages/admin/company/companies';
import { CompanyCreatePage } from '@/pages/admin/company/companyCreate';
import { CompanyDetailPage } from '@/pages/admin/company/companyDetail';
import { CompanyEditPage } from '@/pages/admin/company/companyEdit';
import { MainPage as AdminMainPage } from '@/pages/admin/main';
import { QuestionCreatePage } from '@/pages/admin/question/questionCreate';
import { QuestionPage as AdminQuestionPage } from '@/pages/admin/question/questionDetail';
import { QuestionEditPage } from '@/pages/admin/question/questionEdit';
import { QuestionsTablePage } from '@/pages/admin/question/questions';
import { ResourceCreatePage } from '@/pages/admin/resource/resourceCreate';
import { ResourcePage } from '@/pages/admin/resource/resourceDetail';
import { ResourceEditPage } from '@/pages/admin/resource/resourceEdit';
import { ResourceRequestViewPage } from '@/pages/admin/resource/resourceRequestDetail';
import { ResourceRequestEditPage } from '@/pages/admin/resource/resourceRequestEdit';
import { ResourcesPage as AdminResourcesPage } from '@/pages/admin/resource/resources';
import { SkillCreatePage } from '@/pages/admin/skill/skillCreate';
import { SkillDetailPage } from '@/pages/admin/skill/skillDetail';
import { SkillEditPage } from '@/pages/admin/skill/skillEdit';
import { SkillsPage } from '@/pages/admin/skill/skills';
import { SpecializationCreatePage } from '@/pages/admin/specialization/specializationCreate';
import { SpecializationDetailPage } from '@/pages/admin/specialization/specializationDetail';
import { SpecializationEditPage } from '@/pages/admin/specialization/specializationEdit';
import { SpecializationsPage } from '@/pages/admin/specialization/specializations';
import { TaskCreatePage } from '@/pages/admin/task/taskCreate';
import { TaskPage as AdminTaskPage } from '@/pages/admin/task/taskDetail';
import { TaskEditPage } from '@/pages/admin/task/taskEdit';
import { TasksTablePage } from '@/pages/admin/task/tasks';
import { TopicCreatePage } from '@/pages/admin/topic/topicCreate';
import { TopicDetailPage } from '@/pages/admin/topic/topicDetail';
import { TopicEditPage } from '@/pages/admin/topic/topicEdit';
import { TopicsPage } from '@/pages/admin/topic/topics';
import { UserDetailPage } from '@/pages/admin/user/userDetail';
import { UserEditPage } from '@/pages/admin/user/userEdit';
import { UsersTablePage } from '@/pages/admin/user/users';
import { AnalyticsPage } from '@/pages/analytics/analytics';
import { DifficultQuestionsPage } from '@/pages/analytics/difficultQuestions';
import { PopularQuestionsPage } from '@/pages/analytics/popularQuestions';
import { PopularSkillsPage } from '@/pages/analytics/popularSkills';
import { ProgressSpecializationsPage } from '@/pages/analytics/progressSpecializations';
import { SkillsProficiencyPage } from '@/pages/analytics/skillsProficiency';
import { ForgotPasswordPage } from '@/pages/auth/forgotPassword';
import { LoginPage } from '@/pages/auth/login';
import { PasswordRecoveryPage } from '@/pages/auth/passwordRecovery';
import { RegistrationPage } from '@/pages/auth/registration';
import { Error404Page } from '@/pages/error404';
import { CreateQuizPage } from '@/pages/interview/createQuiz';
import { InterviewPage } from '@/pages/interview/interview';
import { InterviewHistoryPage } from '@/pages/interview/interviewHistory';
import { InterviewMockQuizResultPage } from '@/pages/interview/interviewMockQuizResult';
import { InterviewQuizPage } from '@/pages/interview/interviewQuiz';
import { InterviewQuizResultPage } from '@/pages/interview/interviewQuizResult';
import { InterviewStatisticsPage } from '@/pages/interview/interviewStatistics';
import { MainPage } from '@/pages/interview/main';
import { AvosPage } from '@/pages/landing/avos';
import { CreatePublicQuizPage } from '@/pages/landing/createPublicQuiz';
import { DocsPage } from '@/pages/landing/docs';
import { HhAnalyticsPage } from '@/pages/landing/hhAnalytics';
import { LandingPage } from '@/pages/landing/landing';
import { LearningPage } from '@/pages/landing/learning';
import { MediaPage } from '@/pages/landing/media';
import { PublicCollectionPage } from '@/pages/landing/publicCollection';
import { PublicCollectionsPage } from '@/pages/landing/publicCollections';
import { PublicQuestionPage } from '@/pages/landing/publicQuestion';
import { PublicQuestionsPage } from '@/pages/landing/publicQuestions';
import { PublicQuizPage } from '@/pages/landing/publicQuiz';
import { PublicQuizResultPage } from '@/pages/landing/publicQuizResult';
import { PublicResourcesPage } from '@/pages/landing/publicResources';
import { EditProfilePage } from '@/pages/profile/editProfile';
import { ProfilePage } from '@/pages/profile/profileInfo';
import { SettingsProfilePage } from '@/pages/profile/settings';
import { UserProfilePage } from '@/pages/profile/userProfile';
import { TaskPage } from '@/pages/tasks/task';
import { TasksPage } from '@/pages/tasks/tasks';
import { CollectionPage as InterviewCollectionPage } from '@/pages/wiki/collection/collectionDetail';
import { CollectionsPage as InterviewCollectionsPage } from '@/pages/wiki/collection/collections';
import { QuestionPage as InterviewQuestionPage } from '@/pages/wiki/question/questionDetail';
import { QuestionsPage } from '@/pages/wiki/question/questions';
import { MyResourcesPage } from '@/pages/wiki/resource/myResources';
import { RequestResourceCreatePage } from '@/pages/wiki/resource/requestResourceCreate';
import { RequestResourceEditPage } from '@/pages/wiki/resource/requestResourceEdit';
import { RequestInfoPage } from '@/pages/wiki/resource/resourceRequestDetail';
import { ResourcesPage } from '@/pages/wiki/resource/resources';

import { AuthLayout } from '@/app/layouts/AuthLayout';
import { LandingLayout } from '@/app/layouts/LandingLayout';
import { MainLayout } from '@/app/layouts/MainLayout';
import { PremiumRoute } from '@/app/providers/router/PremiumRoute';

import { AuthRoute } from './AuthRoute';
import { InterviewRoute } from './InterviewRoute';
import { UnAuthRoute } from './UnAuthRoute';
import { VerifiedEmailRoute } from './VerifiedEmailRoute';

import '../../styles/App.css';

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
			// {
			// 	route: ROUTES.tasks.route,
			// 	title: i18n.t(Translation.SIDEBAR_MENU_TASKS_TITLE),
			// 	icon: CursorSquare, // TODO: добавить иконку
			// },
		],
		roles: allRoles,
	},
	{
		type: 'category',
		title: i18n.t(Translation.SIDEBAR_MENU_WIKI_TITLE),
		icon: WikiIcon,
		elements: [
			{
				route: `${ROUTES.wiki.route}/${ROUTES.wiki.resources.route}`,
				title: i18n.t(Translation.SIDEBAR_MENU_WIKI_RESOURCES_TITLE),
				icon: ResourcesIcon,
			},
			{
				route: `${ROUTES.wiki.route}/${ROUTES.wiki.questions.route}`,
				title: i18n.t(Translation.SIDEBAR_MENU_QUESTIONS),
				icon: QuestionsIcon,
			},
			{
				route: `${ROUTES.wiki.route}/${ROUTES.wiki.collections.route}`,
				title: i18n.t(Translation.SIDEBAR_MENU_COLLECTIONS),
				icon: Collection,
			},
		],
		roles: allRoles,
	},
	{
		type: 'single',
		route: ROUTES.analytics.route,
		title: i18n.t(Translation.SIDEBAR_MENU_ANALYTICS),
		icon: AnalyticsIcon,
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
	{
		type: 'single',
		route: ROUTES.admin.topics.route,
		title: i18n.t(Translation.SIDEBAR_MENU_TOPICS),
		icon: Cards,
		roles: listAdminRoles,
	},
	{
		type: 'single',
		route: ROUTES.admin.tasks.route,
		title: i18n.t(Translation.SIDEBAR_MENU_TASKS),
		icon: TasksIcon,
		roles: listAdminRoles,
	},
];

export const router = createBrowserRouter([
	{
		path: ROUTES.appRoute,
		element: <LandingLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: '/learning',
				element: <LearningPage />,
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
				path: ROUTES.resources.route,
				element: <PublicResourcesPage />,
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
			{
				path: ROUTES.avos.route,
				element: <AvosPage />,
			},
			{
				path: ROUTES.hhAnalytics.route,
				element: <HhAnalyticsPage />,
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
				element: <AdminResourcesPage />,
			},
			{
				path: ROUTES.admin.resources.details.page,
				element: <ResourcePage />,
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
				path: ROUTES.admin.resources.requests.view.page,
				element: <ResourceRequestViewPage />,
			},
			{
				path: ROUTES.admin.resources.requests.edit.page,
				element: <ResourceRequestEditPage />,
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
				path: ROUTES.admin.topics.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <TopicsPage />,
					},
					{
						path: ROUTES.admin.topics.create.route,
						element: <TopicCreatePage />,
					},
					{
						path: ROUTES.admin.topics.details.route,
						element: <TopicDetailPage />,
					},
					{
						path: ROUTES.admin.topics.edit.route,
						element: <TopicEditPage />,
					},
				],
			},
			{
				path: ROUTES.admin.tasks.route,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <TasksTablePage />,
					},
					{
						path: ROUTES.admin.tasks.create.route,
						element: <TaskCreatePage />,
					},
					{
						path: ROUTES.admin.tasks.edit.route,
						element: <TaskEditPage />,
					},
					{
						path: ROUTES.admin.tasks.details.route,
						element: <AdminTaskPage />,
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
				path: ROUTES.analytics.route,
				element: <Outlet />,
				handle: {
					crumb: Translation.CRUMBS_ANALYTICS,
				},
				children: [
					{
						index: true,
						element: <AnalyticsPage />,
					},
					{
						path: ROUTES.analytics.progressSpecializations.route,
						element: <ProgressSpecializationsPage />,
						handle: {
							crumb: Translation.CRUMBS_PROGRESS_SPECIALIZATIONS,
						},
					},
					{
						path: ROUTES.analytics['popular-skills'].route,
						element: <PopularSkillsPage />,
						handle: {
							crumb: Translation.CRUMBS_POPULAR_SKILLS,
						},
					},
					{
						path: ROUTES.analytics['skills-proficiency'].route,
						element: <SkillsProficiencyPage />,
						handle: {
							crumb: Translation.CRUMBS_ANALYTICS_SKILLSPROFICIENCY,
						},
					},
					{
						path: ROUTES.analytics['difficult-questions'].route,
						element: <DifficultQuestionsPage />,
						handle: {
							crumb: Translation.CRUMBS_ANALYTICS_DIFFICULTQUESTIONS,
						},
					},
					{
						path: ROUTES.analytics['popular-questions'].route,
						element: <PopularQuestionsPage />,
						handle: {
							crumb: Translation.CRUMBS_ANALYTICS_POPULAR_QUESTIONS,
						},
					},
				],
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
				path: ROUTES.wiki.route,
				element: <Outlet />,
				handle: {
					crumb: Translation.CRUMBS_WIKI,
				},
				children: [
					{
						path: ROUTES.wiki.resources.route,
						element: <Outlet />,
						handle: {
							crumb: Translation.CRUMBS_RESOURCES,
						},
						children: [
							{
								index: true,
								element: <ResourcesPage />,
							},
							{
								path: ROUTES.wiki.resources.my.route,
								element: <Outlet />,
								handle: {
									crumb: Translation.CRUMBS_RESOURCES_MY,
								},
								children: [
									{
										index: true,
										element: <MyResourcesPage />,
									},
									{
										path: ROUTES.wiki.resources.my.create.route,
										element: <RequestResourceCreatePage />,
										handle: {
											crumb: Translation.CRUMBS_CREATE_REQUEST,
										},
									},
									{
										path: ROUTES.wiki.resources.my.request.route,
										element: <RequestInfoPage />,
										handle: {
											crumb: Translation.CRUMBS_RESOURCES_MY_REQUEST,
										},
									},
									{
										path: ROUTES.wiki.resources.my.edit.route,
										element: <RequestResourceEditPage />,
										handle: {
											crumb: Translation.CRUMBS_EDIT_REQUEST,
										},
									},
								],
							},
						],
					},
					{
						path: ROUTES.wiki.questions.route,
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
								path: ROUTES.wiki.questions.detail.route,
								element: <InterviewQuestionPage />,
								handle: {
									crumb: Translation.CRUMBS_QUESTION_DETAIL,
								},
							},
						],
					},
					{
						path: ROUTES.wiki.collections.route,
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
								path: ROUTES.wiki.collections.detail.route,
								element: <InterviewCollectionPage />,
								handle: {
									crumb: Translation.CRUMBS_COLLECTIONS_DETAIL,
								},
							},
						],
					},
				],
			},
			{
				path: ROUTES.liveCoding.route,
				element: <Outlet />,
				handle: {
					crumb: Translation.CRUMBS_LIVE_CODING,
				},
				children: [
					{
						path: ROUTES.liveCoding.tasks.route,
						element: <Outlet />,
						handle: {
							crumb: Translation.CRUMBS_TASKS,
						},
						children: [
							{
								index: true,
								element: <TasksPage />,
							},
							{
								path: ROUTES.liveCoding.tasks.detail.route,
								element: <TaskPage />,
								handle: {
									crumb: Translation.CRUMBS_TASK,
								},
							},
						],
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
