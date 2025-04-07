export { QuizQuestionMode } from './ui/QuizQuestionMode/QuizQuestionMode';
export { QuestionNavPanel } from './ui/QuestionNavPanel/QuestionNavPanel';
export { ResponseButtons } from './ui/ResponseButtons/ResponseButtons';
export { useSlideSwitcher } from '../quiz/hooks/useSlideSwitcher';
export { InterviewSlider } from './ui/InterviewSlider/InterviewSlider';

export {
	useLazyCreateNewQuizQuery,
	useLazyCreateNewMockQuizQuery,
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useSaveQuizResultMutation,
	useGetQuizByProfileIdQuery,
	useGetProfileQuizStatsQuery,
	useLazyCloneQuizQuery,
	useInterruptQuizMutation,
} from './api/quizApi';

export type {
	Answers,
	ActiveQuizState,
	GetProfileQuizStatsResponse,
	ProgressByCategoriesData,
	QuestionModeType,
	QuizQuestionAnswerType,
	Quiz,
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

export { activeQuizSlice, setActiveQuizQuestions } from './model/slices/activeQuizSlice';

export { LS_ACTIVE_QUIZ_KEY, LS_ACTIVE_MOCK_QUIZ_KEY } from './model/constants/quizConstants';

export { interviewHandlers } from './api/__mocks__/index';
