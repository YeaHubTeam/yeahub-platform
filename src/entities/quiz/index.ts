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
} from './api/quizApi';

export type {
	Answers,
	ExtraArgument,
	Interview,
	InterviewQuestion,
	InterviewQuestionBtn,
	ActiveQuizState,
} from './model/types/quiz';

export {
	QUIZ_QUESTIONS,
	INTERVIEW_QUESTIONS,
	MOCK_QUIZ,
	INTERVIEW_BTNS_DATA,
} from './model/data/interviewQuestions';

export type {
	QuestionModeType,
	QuizQuestionAnswerType,
	QuizHistoryParams,
	QuizHistoryResponse,
} from './model/types/quiz';

export { getActiveQuizQuestions, getQuizStartDate } from './model/selectors/quizSelectors';

export { activeQuizSlice, setActiveQuizQuestions } from './model/slices/activeQuizSlice';

export { LS_ACTIVE_QUIZ_KEY, LS_START_DATE_QUIZ_KEY } from './model/constants/quizConstants';
