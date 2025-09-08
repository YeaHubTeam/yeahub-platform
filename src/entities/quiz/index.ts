export { QuizQuestionMode } from './ui/QuizQuestionMode/QuizQuestionMode';
export { QuestionNavPanel } from './ui/QuestionNavPanel/QuestionNavPanel';
export { ResponseButtons } from './ui/ResponseButtons/ResponseButtons';
export { useSlideSwitcher } from '../quiz/hooks/useSlideSwitcher';

export {
	useLazyCreateNewQuizQuery,
	useLazyCreateNewMockPublicQuizQuery,
	useLazyCreateNewMockQuizQuery,
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useSaveQuizResultMutation,
	useGetQuizByProfileIdQuery,
	useGetProfileQuizStatsQuery,
} from './api/quizApi';

export type {
	Answers,
	ActiveQuizState,
	GetProfileQuizStatsResponse,
	ProgressByCategoriesData,
	QuestionModeType,
	QuizQuestionAnswerType,
	Quiz,
	ActiveQuiz,
	QuizWithoutQuestions,
	GetQuizHistoryParamsRequest,
	ProfileSkillsStat,
	ProfileQuizzesStat,
	ProfileQuestionsStat,
} from './model/types/quiz';

export {
	getActiveQuizQuestions,
	getIsAllQuestionsAnswered,
	getLastActiveQuizInfo,
} from './model/selectors/quizSelectors';

export {
	activeQuizSlice,
	setActiveQuizQuestions,
	clearActiveQuizState,
	clearActiveMockQuizState,
} from './model/slices/activeQuizSlice';

export {
	LS_ACTIVE_QUIZZES_KEY,
	LS_ACTIVE_MOCK_QUIZ_KEY,
	LS_ACTIVE_MOCK_PUBLIC_QUIZ_KEY,
} from './model/constants/quizConstants';

export { getValidActiveMockQuizFromLS } from './model/helpers/getValidActiveMockQuizFromLS';

export { interviewHandlers } from './api/__mocks__/index';
