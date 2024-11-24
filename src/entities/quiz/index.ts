export { QuizQuestionMode } from './ui/QuizQuestionMode/QuizQuestionMode';
export { InterviewResults } from './ui/InterviewResults/InterviewResults';
export { QuestionProgressBar } from './ui/QuestionProgressBar/QuestionProgressBar';
export { QuestionNavPanel } from './ui/QuestionNavPanel/QuestionNavPanel';
export { ResponseButtons } from './ui/ResponseButtons/ResponseButtons';
export { useSlideSwitcher } from '../quiz/hooks/useSlideSwitcher';
export { InterviewSlider } from './ui/InterviewSlider/InterviewSlider';
export { QuestionCategories } from './ui/QuestionCategores/QuestionCategories';

export {
	useLazyCreateNewQuizQuery,
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useSaveQuizResultMutation,
	useGetQuizByProfileIdQuery,
	useGetProfileQuizStatsQuery,
} from './api/quizApi';

export type {
	Answers,
	ExtraArgument,
	ActiveQuizState,
	GetProfileQuizStatsResponse,
	ProgressByCategoriesData,
	QuestionModeType,
	QuizQuestionAnswerType,
	Quiz,
	QuizWithoutQuestions,
	GetQuizHistoryParamsRequest,
} from './model/types/quiz';

export { getActiveQuizQuestions, getIsAllQuestionsAnswered } from './model/selectors/quizSelectors';

export { activeQuizSlice, setActiveQuizQuestions } from './model/slices/activeQuizSlice';

export { LS_ACTIVE_QUIZ_KEY } from './model/constants/quizConstants';

export { interviewHandlers } from './api/__mocks__/index';
